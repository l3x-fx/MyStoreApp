import { Component } from '@angular/core';
import { selectIsLoading, selectPastOrders } from '../../store/user.reducer';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { OrderItemComponent } from '../order-item/order-item.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Order } from 'src/app/shared/models/Order.interface';
import { MatButtonModule } from '@angular/material/button';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';

@Component({
  selector: 'app-orderlist',
  standalone: true,
  imports: [
    CommonModule,
    OrderItemComponent,
    MatExpansionModule,
    MatButtonModule,
    LoadingComponent,
  ],
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css'],
})
export class OrderlistComponent {
  pastOrders: Order[] = [];
  isLoading: boolean = true;
  constructor(private _store: Store) {}
  ngOnInit() {
    this._store
      .select(selectPastOrders)
      .subscribe((orders) => (this.pastOrders = orders));
    this._store
      .select(selectIsLoading)
      .subscribe((load) => (this.isLoading = load));
  }
}
