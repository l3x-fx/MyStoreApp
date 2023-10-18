import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../shared/models/Product';
import { Observable, map, of, switchMap, take } from 'rxjs';
import { productsActions } from '../products/store/products.actions';
import { PersistanceService } from '../shared/services/persistance.service';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { selectCart } from '../products/store/products.reducer';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  item: Product[] = [];
  newcart: Product[] = [];
  cartKey: string = 'mystore-cart';
  IDKey: string = 'mystore-id';

  constructor(
    private _store: Store,
    private _persistanceService: PersistanceService,
    private _http: HttpClient,
  ) {}

  initCart(): void {
    const items: string | null = this._persistanceService.get('mystore-cart');
    const itemsJson = typeof items === 'string' ? JSON.parse(items) : [];
    this._store.dispatch(productsActions.initCart({ cart: itemsJson }));
  }

  addToCart(product: Product): void {
    const subscribtion = this._store
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
            this._store.dispatch(productsActions.addToCart({ cart: newCart }));
            this._persistanceService.set(this.cartKey, JSON.stringify(newCart));
          }
        }),
      )
      .subscribe();
    subscribtion.unsubscribe();
  }

  removeFromCart(id: number) {
    const cartSubscribtion = this._store
      .select(selectCart)
      .pipe(
        take(1),
        map((cart: Product[]) =>
          cart.filter((item: Product) => item.id !== id),
        ),
      )
      .subscribe((newCart) => {
        if (newCart.length >= 1) {
          this._store.dispatch(productsActions.updateCart({ cart: newCart }));
          this._persistanceService.set(this.cartKey, JSON.stringify(newCart));
        } else {
          this._store.dispatch(productsActions.updateCart({ cart: [] }));
          this._persistanceService.remove(this.cartKey);
        }
      });

    cartSubscribtion.unsubscribe();
  }

  changeQuantity(id: number, quantity: number) {
    const itemSubscribtion = this._store
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
        this._store.dispatch(productsActions.updateCart({ cart: newCart }));
        this._persistanceService.set(this.cartKey, JSON.stringify(newCart));
      });

    itemSubscribtion.unsubscribe();
  }

  resetCart() {
    this._store.dispatch(productsActions.updateCart({ cart: [] }));
    this._persistanceService.remove(this.cartKey);
  }

  submitOrder(data: Product[]): Observable<number> {
    const id = this._persistanceService.get(this.IDKey);
    const url = environment.apiUrl + '/orders/' + id;
    return this._http.post<number>(url, data).pipe(map((response) => response));
  }
}
