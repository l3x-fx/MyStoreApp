import { Component } from '@angular/core';
import { selectPastOrders } from '../../store/user.reducer';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { OrderItemComponent } from '../order-item/order-item.component';

@Component({
  selector: 'app-orderlist',
  standalone: true,
  imports: [CommonModule, OrderItemComponent],
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css'],
})
export class OrderlistComponent {
  pastOrders$ = this._store.select(selectPastOrders);
  constructor(private _store: Store) {}
}
