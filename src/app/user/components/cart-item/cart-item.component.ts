import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/shared/models/Product.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatFormFieldModule,
    FlexLayoutModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
  ],
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent implements OnInit {
  @Input()
  cartitem!: Product;

  @Output() delete: EventEmitter<number> = new EventEmitter<number>();
  @Output() changeQuantity: EventEmitter<{ id: number; quantity: number }> =
    new EventEmitter<{ id: number; quantity: number }>();

  quantity: number = 0;
  durationInSec = 3;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.quantity = this.cartitem.quantity;
  }

  onDelete(): void {
    this.delete.emit(this.cartitem.id);
    this.openSnackBar();
  }

  minusOne(): void {
    this.quantity--;

    const payload = { id: this.cartitem.id, quantity: this.quantity };
    this.changeQuantity.emit(payload);
  }
  plusOne(): void {
    this.quantity++;

    const payload = { id: this.cartitem.id, quantity: this.quantity };
    this.changeQuantity.emit(payload);
  }

  openSnackBar() {
    this._snackBar.open(
      `Item removed from your cart: ${this.cartitem.name}`,
      'OK',
      {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: this.durationInSec * 1000,
      },
    );
  }
}
