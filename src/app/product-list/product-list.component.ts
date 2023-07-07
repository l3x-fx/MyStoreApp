import { Component, OnInit } from '@angular/core';
import { Product } from '../models/Product';
import { ProductService } from '../services/product.service';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
    title:string = 'Exclusive Offers';
    products: Product[] = [];

    constructor(private productService:ProductService) {}

    ngOnInit():void {  
    this.productService.getAllProducts().subscribe(res => {
        this.products = res.map(product => {
        return { 
            id:product.id,
            title: product.name,
            description:product.description,
            imgurl: product.url,
            price: product.price,
            quantity: 1 };
        });
    });
    }
    
}



