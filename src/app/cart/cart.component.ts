import { Component, OnInit } from '@angular/core';
import { Product } from '../models/Product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  title:string = 'Shopping Cart';
  cart: Product[] = [];

  constructor() {}

    ngOnInit():void {
      this.cart= [
        {
        id:1,
        title: 'Coffee',
        description: 'wake up!',
        imgurl: '../../assets/coffee.jpg',
        price: 1,
        quantity:1,
      },
      {
        id:2,
        title: 'Whiskey',
        description: 'cool down...',
        imgurl: '../../assets/whiskey.jpg',
        price: 1,
        quantity:1,
      }
    ]
    }
    
}
