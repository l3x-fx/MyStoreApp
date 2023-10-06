import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  ],
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.css'],
})
export class ProductListItemComponent {
  @Input() product: RawProduct;
  quantity: number = 1;
  constructor(private cartService: CartService) {
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
    this.cartService.addToCart(finishedProduct);
    alert('Product added to cart: \n' + finishedProduct.name);
  }
}
