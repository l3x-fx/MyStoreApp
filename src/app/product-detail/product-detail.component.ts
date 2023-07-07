import { Component  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/Product';
import { ProductService } from '../services/product.service';

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

    constructor(
        private productService:ProductService,
        private route: ActivatedRoute,
        ) {}

        ngOnInit(): void {
            const productId = Number(this.route.snapshot.params['id']);
            this.productService.getProductById(productId).subscribe(product => {
                this.product = {  
                    id:product.id,
                    title: product.name,
                    description:product.description,
                    imgurl: product.url,
                    price: product.price,
                    quantity: 1 
                };
            });
        }


}
