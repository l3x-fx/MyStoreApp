import { Component, Input } from '@angular/core';
import { Order } from 'src/app/shared/models/Order.interface';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Product } from 'src/app/shared/models/Product.interface';
import { ProductService } from 'src/app/products/services/product.service';
import { forkJoin, map, take } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-item',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, FlexLayoutModule, RouterLink],
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss'],
})
export class OrderItemComponent {
  @Input() order: Order;
  products: Product[] = [];
  constructor(private productService: ProductService) {
    this.order = {
      id: 0,
      status: '',
      date: '',
      user_id: '',
      products: [],
    };
  }

  ngOnInit() {
    const productObservables = this.order.products.map((item) => {
      return this.productService.getById(parseInt(item.product_id)).pipe(
        take(1),
        map((productDetails) => {
          return productDetails
            ? { ...productDetails, quantity: item.quantity }
            : null;
        }),
      );
    });

    forkJoin(productObservables).subscribe((products) => {
      this.products = products.filter(
        (product) => product !== null,
      ) as Product[];
    });
  }
}
