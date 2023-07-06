import { Component  } from '@angular/core';
import { Product } from '../models/Product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  product:Product = {        
    id:0,
    title: '',
    description: '',
    imgurl: '',
    price: 0,
    quantity:0
  };

  constructor() {}

    ngOnInit():void {
      this.product= 
        {
        id:1,
        title: 'Coffee',
        description: 'wake up!',
        imgurl: '../../assets/coffee.jpg',
        price: 1,
        quantity:1,
      }
    }


}
