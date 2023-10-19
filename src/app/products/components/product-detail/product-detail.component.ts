import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product, RawProduct } from 'src/app/shared/models/Product.interface';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/user/services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import {
  MatSnackBar,
  MatSnackBarModule,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

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
    MatSnackBarModule,
    MatButtonModule,
  ],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent {
  product$: Observable<RawProduct | null | undefined>;
  quantity: number = 1;
  durationInSec: number = 3;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private _productService: ProductService,
    public route: ActivatedRoute,
    public router: Router,
    private _cartService: CartService,
    private _snackBar: MatSnackBar,
  ) {
    const productId = Number(this.route.snapshot.params['id']);
    this.product$ = this._productService.getById(productId);
  }

  addToCart(product: RawProduct): void {
    const finishedProduct: Product = { ...product, quantity: this.quantity };
    this._cartService.addToCart(finishedProduct);
    console.log('NAME', product.name);
    this.openSnackBar(product);
    this.router.navigate(['/']);
  }

  openSnackBar(product: RawProduct) {
    this._snackBar.open(`Item added to your cart: ${product.name}`, 'OK', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSec * 1000,
    });
  }
}
