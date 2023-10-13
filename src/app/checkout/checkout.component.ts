import { Component } from '@angular/core';
import { Router, NavigationExtras, RouterLink } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Product } from 'src/app/shared/models/Product';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { CartItemComponent } from '../products/components/cart-item/cart-item.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Store } from '@ngrx/store';
import { selectCart } from '../products/store/products.reducer';
import { User } from '../shared/models/User.interface';
import { selectCurrentUser } from '../auth/store/auth.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    MatStepperModule,
    CartItemComponent,
    MatFormFieldModule,
    MatRadioModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule,
  ],
  templateUrl: './checkout.component.html',

  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  itemsFormGroup!: FormGroup;
  shippingFormGroup!: FormGroup;
  paymentFormGroup!: FormGroup;
  user: Observable<User | null | undefined> =
    this.store.select(selectCurrentUser);

  paymentMethod: string = '';
  cardNumber: string = '';

  cart: Product[] = [];

  amount: number = 0;

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private store: Store,
    private cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.user.subscribe((user) => {
      this.initializeFormValues(user);
    });

    this.store.select(selectCart).subscribe((newCart: Product[]) => {
      this.cart = newCart;
    });

    this.calculateAmount();
  }

  initializeFormValues(user: User | null | undefined): void {
    this.itemsFormGroup = this._formBuilder.group({});

    this.shippingFormGroup = this._formBuilder.group({
      fname: [user?.firstname || '', Validators.required],
      lname: [user?.lastname || '', Validators.required],
      address: [user?.address || '', Validators.required],
      postalCode: [user?.zip || '', Validators.required],
      city: [user?.city || '', Validators.required],
      country: [user?.country || '', Validators.required],
    });

    this.paymentFormGroup = this._formBuilder.group({
      paymentMethod: ['', Validators.required],
      cardNumber: ['', Validators.required],
    });

    this.paymentFormGroup
      .get('paymentMethod')
      ?.valueChanges.subscribe((value) => {
        this.paymentMethod = value;
      });

    this.cardNumber = this.paymentFormGroup.get('cardNumber')?.value;
  }

  submitForm(): void {
    if (this.amount > 0) {
      this.cartService.resetCart();
      const extras: NavigationExtras = {
        queryParams: {
          name: this.shippingFormGroup.get('fname')?.value,
          amount: this.amount,
        },
      };
      this.router.navigate(['/confirm'], extras);
    } else {
      alert('Your Cart is empty!');
    }
  }

  calculateAmount(): void {
    this.amount = this.cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
  }

  removeItem(id: number): void {
    this.cartService.removeFromCart(id);
    this.calculateAmount();
  }

  changeQuantity(payload: { id: number; quantity: number }): void {
    this.cartService.changeQuantity(payload.id, payload.quantity);
    this.calculateAmount();
  }
}
