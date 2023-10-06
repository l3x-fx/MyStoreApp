import { Injectable } from '@angular/core';
import { RawProduct } from '../shared/models/Product';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { selectProducts } from '../products/store/products.reducer';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private http: HttpClient,
    private store: Store,
  ) {}

  getAll(): Observable<RawProduct[]> {
    const url = environment.apiUrl + '/products';
    return this.http.get<RawProduct[]>(url).pipe(map((response) => response));
  }

  getTopThree(): Observable<RawProduct[]> {
    const url = environment.apiUrl + '/products/stats/topThree';
    return this.http.get<RawProduct[]>(url).pipe(map((response) => response));
  }

  getById(id: number): Observable<RawProduct | null | undefined> {
    return this.store
      .select(selectProducts)
      .pipe(
        map((products) =>
          products ? products.find((product) => product.id === id) : null,
        ),
      );
  }

  getByCategory(category: string): Observable<RawProduct | null | undefined> {
    return this.store
      .select(selectProducts)
      .pipe(
        map((products) =>
          products
            ? products.find((product) => product.category === category)
            : undefined,
        ),
      );
  }
}
