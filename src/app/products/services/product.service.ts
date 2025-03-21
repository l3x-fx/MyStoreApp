import { Injectable } from '@angular/core';
import { RawProduct } from '../../shared/models/Product.interface';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { selectProducts } from '../store/products.reducer';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private _http: HttpClient,
    private _store: Store,
  ) {}

  getAll(): Observable<RawProduct[]> {
    const url = environment.apiUrl + '/products';
    return this._http.get<RawProduct[]>(url).pipe(map((response) => response));
  }

  getById(id: number): Observable<RawProduct | null | undefined> {
    return this._store
      .select(selectProducts)
      .pipe(
        map((products) =>
          products ? products.find((product) => product.id === id) : null,
        ),
      );
  }
}
