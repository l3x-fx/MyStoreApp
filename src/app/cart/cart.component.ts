import { Component } from '@angular/core';
import { Product } from '../models/Product';
import { CartService } from '../services/cart.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent {
    title:string = 'Shopping Cart';
    cart: Product[] = [];
    amount: number = this.cart.reduce((acc, item) =>  acc + (item.price*item.quantity), 0);

    constructor(private cartService:CartService) {}

    ngOnInit():void {
        this.cartService.getCart().subscribe((newCart:Product[]) => this.cart = newCart)
    }

    removeItem(id: number): void {
        this.cart = this.cartService.deleteItem(id)
    }



}
