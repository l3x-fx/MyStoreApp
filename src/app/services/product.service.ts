import { Injectable } from '@angular/core';
import { Product, RawProduct } from '../shared/models/Product';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<RawProduct[]> {
    const rawproducts = this.http.get<RawProduct[]>(
      'http://localhost:8080/products'
    );
    return rawproducts;
  }
  getProductById(id: number): Observable<RawProduct> {
    return this.http.get<RawProduct>(`http://localhost:8080/products/${id}`);
  }
}
