import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/shared/models/Product';
import { CartService } from 'src/app/services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatFormFieldModule,
    FlexLayoutModule,
    MatButtonModule,
  ],
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
      name: '',
      description: '',
      img_url: '',
      price: 1,
      category: '',
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
