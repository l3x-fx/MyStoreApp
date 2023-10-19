import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { Order } from 'src/app/shared/models/Order.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private _store: Store,
    private _http: HttpClient,
  ) {}
  getPastOrders(): Observable<Order[]> {
    const userId = localStorage.getItem('mystore-id');
    const url = environment.apiUrl + '/orders/' + userId;
    return this._http.get<Order[]>(url).pipe(map((response) => response));
  }
}
