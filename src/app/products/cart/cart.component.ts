import {Component} from '@angular/core'
import {Product} from '../../shared/models/Product'
import {MatFormFieldModule} from '@angular/material/form-field'
import {CartService} from '../../services/cart.service'
import {CommonModule} from '@angular/common'
import {FormsModule} from '@angular/forms'
import {CartItemComponent} from '../cart-item/cart-item.component'
import {RouterLink} from '@angular/router'

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RouterLink,
        CartItemComponent,
        MatFormFieldModule,
    ],
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css'],
})
export class CartComponent {
    title: string = 'Shopping Cart'
    cart: Product[] = []
    amount: number = 0

    constructor(private cartService: CartService) {}

    ngOnInit(): void {
        this.cartService.getCart().subscribe((newCart: Product[]) => {
            this.cart = newCart
            this.calculateAmount()
        })
    }

    calculateAmount(): void {
        this.amount = this.cart.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0,
        )
    }

    removeItem(id: number): void {
        this.cart = this.cartService.deleteItem(id)
        this.calculateAmount()
        alert('Item Deleted!')
    }

    changeQuantity(payload: {id: number; quantity: number}): void {
        this.cart = this.cartService.changeQuantity(
            payload.id,
            payload.quantity,
        )
        this.calculateAmount()
    }
}
