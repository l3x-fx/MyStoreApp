import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../models/Product';
import { CartService } from '../services/cart.service'

@Component({
    selector: 'app-product-list-item',
    templateUrl: './product-list-item.component.html',
    styleUrls: ['./product-list-item.component.css']
    })

export class ProductListItemComponent {
    @Input() product: Product;

    constructor(private cartService:CartService) {
        this.product= {
        id:0,
        title: '',
        description: '',
        imgurl: '',
        price: 1,
        quantity:1,
        }
    }

    addToCart(product:Product): void {
        this.cartService.addItem(product)
        alert('Product added to cart: \n' + product.title);
    }
}
    

