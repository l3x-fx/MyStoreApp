import {Component, OnInit} from '@angular/core'
import {Product} from 'src/app/shared/models/Product'
import {ProductService} from 'src/app/services/product.service'
import {CommonModule} from '@angular/common'
import {FormsModule} from '@angular/forms'
import {MatFormFieldModule} from '@angular/material/form-field'
import {RouterLink} from '@angular/router'
import {ProductListItemComponent} from '../product-list-item/product-list-item.component'

@Component({
    selector: 'app-product-list',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RouterLink,
        MatFormFieldModule,
        ProductListItemComponent,
    ],
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
    title: string = 'Exclusive Offers'
    products: Product[] = []

    constructor(private productService: ProductService) {}

    ngOnInit(): void {
        this.productService.getAllProducts().subscribe((res) => {
            this.products = res.map((product) => {
                return {
                    id: product.id,
                    title: product.name,
                    description: product.description,
                    imgurl: product.url,
                    price: product.price,
                    quantity: 1,
                }
            })
        })
    }
}
