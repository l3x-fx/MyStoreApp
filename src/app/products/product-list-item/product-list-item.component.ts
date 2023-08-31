import {Component, Input, Output, EventEmitter} from '@angular/core'
import {Product} from 'src/app/shared/models/Product'
import {CartService} from 'src/app/services/cart.service'
import {CommonModule} from '@angular/common'
import {FormsModule} from '@angular/forms'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatCardModule} from '@angular/material/card'
import {RouterLink} from '@angular/router'

@Component({
    selector: 'app-product-list-item',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RouterLink,
        MatFormFieldModule,
        MatCardModule,
    ],
    templateUrl: './product-list-item.component.html',
    styleUrls: ['./product-list-item.component.css'],
})
export class ProductListItemComponent {
    @Input() product: Product

    constructor(private cartService: CartService) {
        this.product = {
            id: 0,
            title: '',
            description: '',
            imgurl: '',
            price: 1,
            quantity: 1,
        }
    }

    addToCart(product: Product): void {
        this.cartService.addItem(product)
        alert('Product added to cart: \n' + product.title)
    }
}
