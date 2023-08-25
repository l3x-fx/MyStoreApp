import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/shared/models/Product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent {
  @Input() cartitem: Product;
  @Output() delete: EventEmitter<number> = new EventEmitter<number>();
  @Output() changeQuantity: EventEmitter<{ id: number; quantity: number }> =
    new EventEmitter<{ id: number; quantity: number }>();

  constructor(private cartService: CartService) {
    this.cartitem = {
      id: 0,
      title: '',
      description: '',
      imgurl: '',
      price: 1,
      quantity: 1,
    };
  }

  onDelete(): void {
    this.delete.emit(this.cartitem.id);
  }

  onChangeQuantity(): void {
    const payload = { id: this.cartitem.id, quantity: this.cartitem.quantity };
    this.changeQuantity.emit(payload);
  }
}
