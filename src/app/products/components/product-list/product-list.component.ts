import { Component, EventEmitter, OnInit } from '@angular/core';
import { RawProduct } from 'src/app/shared/models/Product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { ProductListItemComponent } from '../product-list-item/product-list-item.component';
import { selectProducts } from '../../store/products.reducer';
import { Store } from '@ngrx/store';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';

import { Category } from '../../types/category.interface';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatFormFieldModule,
    FlexLayoutModule,
    ProductListItemComponent,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  title: string = 'Exclusive Offers';
  allProducts: RawProduct[] | null | undefined;
  products: RawProduct[] | null | undefined;

  categories: Category[] = [
    { value: '', viewValue: 'All' },
    { value: 'Food', viewValue: 'Food' },
    { value: 'Clothing', viewValue: 'Clothing' },
    { value: 'Accessories', viewValue: 'Accessories' },
  ];

  category: string | null = null;

  constructor(private store: Store) {
    this.store.select(selectProducts).subscribe((products) => {
      this.allProducts = products;
      this.products = this.allProducts;
    });
  }

  ngOnInit(): void {
    console.log('ALL', this.allProducts);
    this.products = this.allProducts;
  }
  onCategoryChange($eventValue: EventEmitter<MatSelectChange>) {
    this.products = $eventValue
      ? this.allProducts?.filter(
          (products) => products.category === this.category,
        )
      : this.allProducts;
  }
}
