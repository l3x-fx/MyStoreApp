import { Component, OnInit } from '@angular/core';
import { RawProduct } from 'src/app/shared/models/Product.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductListItemComponent } from '../product-list-item/product-list-item.component';
import {
  selectErrors,
  selectIsLoading,
  selectProducts,
} from '../../store/products.reducer';
import { Store } from '@ngrx/store';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';

import { filter, take } from 'rxjs';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { ErrorComponent } from 'src/app/shared/components/error/error.component';
import { productsActions } from '../../store/products.actions';

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
    MatDividerModule,
    LoadingComponent,
    ErrorComponent,
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  topThree: RawProduct[] | null | undefined;
  allProducts: RawProduct[] | null | undefined;
  products: RawProduct[] | null | undefined;
  category: string | null = null;
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private _store: Store,
    private _route: ActivatedRoute,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this._route.queryParams
      .pipe(filter((params) => params['category']))
      .subscribe((param) => {
        const cat = param['category'];
        this.category = cat.charAt(0).toUpperCase() + cat.slice(1);
        this.products = this.allProducts?.filter(
          (products) => products.category === this.category,
        );
      });

    this._route.queryParams
      .pipe(filter((params) => !params['category']))
      .subscribe(() => {
        this.products = this.allProducts;
      });

    this._store.select(selectProducts).subscribe((products) => {
      this.allProducts = products;
      this.products = this.allProducts;
    });

    this._store
      .select(selectIsLoading)
      .subscribe((loading) => (this.loading = loading));

    this._store.select(selectErrors).subscribe((err) => (this.error = err));
  }

  onCategoryChange($event: MatSelectChange) {
    $event.value
      ? this._router.navigate([], {
          relativeTo: this._route,
          queryParams: { category: $event.value },
        })
      : this._router.navigate([]);
  }
}
