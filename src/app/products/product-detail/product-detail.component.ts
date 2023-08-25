import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/shared/models/Product';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent {
  product: Product = {
    id: 0,
    title: '',
    description: '',
    imgurl: '',
    price: 0,
    quantity: 0,
  };

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.params['id']);
    this.productService.getProductById(productId).subscribe((product) => {
      this.product = {
        id: product.id,
        title: product.name,
        description: product.description,
        imgurl: product.url,
        price: product.price,
        quantity: 1,
      };
    });
  }

  addToCart(product: Product): void {
    this.cartService.addItem(product);
    this.router.navigate(['/']);
    alert('Product added to cart: \n' + product.title);
  }
}
