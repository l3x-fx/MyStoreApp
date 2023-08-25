import { Component, Input } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  name: string = '';
  address: string = '';
  cardnumber: string = '';

  @Input() amount: number;

  constructor(private router: Router, private cartService: CartService) {
    this.amount = 0;
  }

  ngOnInit(): void {}

  submitForm(): void {
    if (this.amount > 0) {
      this.cartService.resetCart();
      const extras: NavigationExtras = {
        queryParams: {
          name: this.name,
          amount: this.amount,
        },
      };
      this.router.navigate(['/confirm'], extras);
    } else {
      alert('Your Cart is empty!');
    }
  }
}
