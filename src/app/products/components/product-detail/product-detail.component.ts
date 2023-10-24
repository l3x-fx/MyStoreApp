import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product, RawProduct } from 'src/app/shared/models/Product.interface';
import { ProductService } from 'src/app/products/services/product.service';
import { CartService } from 'src/app/user/services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import {
  MatSnackBar,
  MatSnackBarModule,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { selectErrors, selectIsLoading } from '../../store/products.reducer';
import { Store } from '@ngrx/store';
import { ErrorComponent } from 'src/app/shared/components/error/error.component';

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
    LoadingComponent,
    ErrorComponent,
  ],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent {
  product: RawProduct | null | undefined = null;
  quantity: number = 1;
  durationInSec: number = 3;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private _productService: ProductService,
    private _store: Store,
    public route: ActivatedRoute,
    public router: Router,
    private _cartService: CartService,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    const productId = Number(this.route.snapshot.params['id']);
    this._productService
      .getById(productId)
      .subscribe((prod) => (this.product = prod));

    this._store
      .select(selectIsLoading)
      .subscribe((loading) => (this.loading = loading));

    this._store.select(selectErrors).subscribe((err) => {
      this.error = err;
    });
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
