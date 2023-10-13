import { Component, Input } from '@angular/core';
import { Product, RawProduct } from 'src/app/shared/models/Product';
import { CartService } from 'src/app/services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list-item',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    FlexLayoutModule,
    MatButtonModule,
    MatSnackBarModule,
    MatButtonModule,
  ],
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.css'],
})
export class ProductListItemComponent {
  @Input() product: RawProduct;
  quantity: number = 1;
  durationInSec: number = 3;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private _cartService: CartService,
    private _snackBar: MatSnackBar,
  ) {
    this.product = {
      id: 0,
      name: '',
      description: '',
      img_url: '',
      price: 1,
      category: '',
    };
  }

  addToCart(product: RawProduct): void {
    const finishedProduct: Product = { ...product, quantity: this.quantity };
    this._cartService.addToCart(finishedProduct);
    this.openSnackBar(product);
  }

  openSnackBar(product: RawProduct) {
    this._snackBar.open(`Item added to your cart: ${product.name}`, 'OK', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSec * 1000,
    });
  }
}
