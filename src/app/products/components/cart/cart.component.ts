import { Component } from '@angular/core';
import { Product } from '../../../shared/models/Product';
import { CartService } from '../../../services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { RouterLink } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { selectCart } from '../../store/products.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    CartItemComponent,
    FlexLayoutModule,
    MatButtonModule,
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  title: string = 'Shopping Cart';
  cart: Product[] = [];
  amount: number = 0;

  constructor(
    private cartService: CartService,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.store.select(selectCart).subscribe((newCart: Product[]) => {
      this.cart = newCart;
      this.calculateAmount();
    });
  }
  ngOnChanges() {
    this.calculateAmount();
  }

  calculateAmount(): void {
    this.amount = this.cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
  }

  removeItem(id: number): void {
    this.cartService.removeFromCart(id);
    alert('Item Deleted!');
  }

  changeQuantity(payload: { id: number; quantity: number }): void {
    this.cartService.changeQuantity(payload.id, payload.quantity);
  }
}
