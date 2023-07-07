import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../models/Product';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent {
  @Input() cartitem: Product;
  @Output() delete: EventEmitter<number> = new EventEmitter<number>();

  constructor(private cartService:CartService) {
    this.cartitem= {
      id:0,
      title: '',
      description: '',
      imgurl: '',
      price: 1,
      quantity:1,
    }
  }

  onDelete():void {
      this.delete.emit(this.cartitem.id);
  }

}
