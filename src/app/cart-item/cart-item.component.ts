import { Component, Input } from '@angular/core';
import { Product } from '../models/Product';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent {
  @Input() cartitem: Product;
  // @Output() hidePost: EventEmitter<Post> = new EventEmitter;
  constructor() {
    this.cartitem= {
      id:0,
      title: '',
      description: '',
      imgurl: '',
      price: 1,
      quantity:1,
    }
  }
}
