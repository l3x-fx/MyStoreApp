import { Component, OnInit } from '@angular/core';
import { Product } from '../models/Products';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
    title:string = 'Exclusive Offers';
    products: Product[] = [];

    constructor() {}

    ngOnInit():void {
      this.products= [
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



