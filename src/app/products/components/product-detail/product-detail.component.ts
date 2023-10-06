import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product, RawProduct } from 'src/app/shared/models/Product';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    MatButtonModule,
  ],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent {
  product$: Observable<RawProduct | null | undefined>;
  quantity: number = 1;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
  ) {
    const productId = Number(this.route.snapshot.params['id']);
    this.product$ = this.productService.getById(productId);
  }

  addToCart(product: RawProduct): void {
    const finishedProduct: Product = { ...product, quantity: this.quantity };
    this.cartService.addToCart(finishedProduct);
    this.router.navigate(['/']);
    alert('Product added to cart: \n' + product.name);
  }
}
