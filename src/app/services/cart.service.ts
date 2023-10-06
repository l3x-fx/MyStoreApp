import { Injectable } from '@angular/core';
import { Product } from '../shared/models/Product';
import { map, of, switchMap, take } from 'rxjs';
import { productsActions } from '../products/store/products.actions';
import { PersistanceService } from '../shared/services/persistance.service';
import { Store } from '@ngrx/store';
import { selectCart } from '../products/store/products.reducer';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  item: Product[] = [];
  newcart: Product[] = [];
  cartKey: string = 'mystore-cart';

  constructor(
    private store: Store,
    private persistanceService: PersistanceService,
  ) {}

  initCart(): void {
    const items: string | null = this.persistanceService.get('mystore-cart');
    const itemsJson = typeof items === 'string' ? JSON.parse(items) : [];
    this.store.dispatch(productsActions.initCart({ cart: itemsJson }));
  }

  addToCart(product: Product): void {
    const subscribtion = this.store
      .select(selectCart)
      .pipe(
        take(1),
        map((cart: Product[]) => {
          const existingItem = cart.find((item) => item.id === product.id);
          if (existingItem) {
            this.changeQuantity(
              product.id,
              product.quantity + existingItem.quantity,
            );
          } else {
            const newCart: Product[] = [...cart, product];
            this.store.dispatch(productsActions.addToCart({ cart: newCart }));
            this.persistanceService.set(this.cartKey, JSON.stringify(newCart));
          }
        }),
      )
      .subscribe();
    subscribtion.unsubscribe();
  }

  removeFromCart(id: number) {
    const cartSubscribtion = this.store
      .select(selectCart)
      .pipe(
        take(1),
        map((cart: Product[]) =>
          cart.filter((item: Product) => item.id !== id),
        ),
      )
      .subscribe((newCart) => {
        if (newCart.length >= 1) {
          this.store.dispatch(productsActions.updateCart({ cart: newCart }));
          this.persistanceService.set(this.cartKey, JSON.stringify(newCart));
        } else {
          this.store.dispatch(productsActions.updateCart({ cart: [] }));
          this.persistanceService.remove(this.cartKey);
        }
      });

    cartSubscribtion.unsubscribe();
  }

  changeQuantity(id: number, quantity: number) {
    const itemSubscribtion = this.store
      .select(selectCart)
      .pipe(
        take(1),
        switchMap((cart: Product[]) => {
          const updatedCart = cart.map((item: Product) => {
            if (item.id === id) {
              return { ...item, quantity };
            }
            return item;
          });
          return of(updatedCart);
        }),
      )
      .subscribe((newCart) => {
        this.store.dispatch(productsActions.updateCart({ cart: newCart }));
        this.persistanceService.set(this.cartKey, JSON.stringify(newCart));
      });

    itemSubscribtion.unsubscribe();
  }

  resetCart() {
    this.store.dispatch(productsActions.updateCart({ cart: [] }));
    this.persistanceService.remove(this.cartKey);
  }
}
