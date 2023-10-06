import { Component, OnInit } from '@angular/core';
import { Product, RawProduct } from 'src/app/shared/models/Product';
// import {ProductService} from 'src/app/services/product.service'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { ProductListItemComponent } from '../product-list-item/product-list-item.component';
import { productsActions } from '../../store/products.actions';
import { selectProducts } from '../../store/products.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';

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
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  title: string = 'Exclusive Offers';
  products$: Observable<RawProduct[] | null | undefined>;

  constructor(private store: Store) {
    this.products$ = this.store.select(selectProducts);
  }

  ngOnInit(): void {}
}
