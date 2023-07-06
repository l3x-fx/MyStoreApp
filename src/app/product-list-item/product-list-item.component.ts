import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../models/Products';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.css']
})
export class ProductListItemComponent {
  @Input() product: Product;
  // @Output() hidePost: EventEmitter<Post> = new EventEmitter;
  constructor() {
    this.product= {
      id:0,
      title: '',
      description: '',
      imgurl: '',
      price: 1,
      quantity:1,
    }
  }
}
