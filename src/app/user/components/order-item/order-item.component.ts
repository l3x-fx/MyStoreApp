import { Component, Input } from '@angular/core';
import { Order } from 'src/app/shared/models/Order.interface';

@Component({
  selector: 'app-order-item',
  standalone: true,
  imports: [],
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css'],
})
export class OrderItemComponent {
  @Input() order: Order;

  constructor() {
    this.order = {
      id: 0,
      status: '',
      date: '',
      user_id: '',
      products: [],
    };
  }
}
