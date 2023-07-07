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

    deleteItem(id:number):Product[]{
        this.cart = this.cart.filter(product =>  product.id!=id)
        return this.cart
    }

    addItem(product:Product):Product[]{
        if(this.cart.some(cartitem => cartitem.id === product.id)) {
            this.cart = this.cart.map(item => {
                if(item.id === product.id) {
                    item.quantity += product.quantity
                }
                return item; 
            })
        } else {
            this.cart.push(product)
        }
        return this.cart
    }

    changeQuantity(id:number, quantity:number): Product[]{
        this.cart = this.cart.map(product => {
            if(product.id === id) {
                product.quantity = quantity
            }
            return product; 
        })
        return this.cart
    }

    resetCart():Product[]{
        this.cart = []
        return this.cart
    }
}
