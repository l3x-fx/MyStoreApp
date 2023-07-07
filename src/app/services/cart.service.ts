import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    cart:Product[] = [];
    constructor() { }

    getCart():Observable<Product[]>  {
        return of(this.cart);
    }

    deleteItem(id:number){
        this.cart = this.cart.filter(product =>  product.id!=id)
        return this.cart
    }

    addItem(product:Product){
        this.cart.push(product)
        return this.cart
    }

    changeQuantity(id:number, quantity:number){
        return this.cart.map(product => {
            if(product.id === id) {
                product.quantity = quantity
            }
        })
    }
}
