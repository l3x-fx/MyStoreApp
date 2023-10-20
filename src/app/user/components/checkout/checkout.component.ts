import { Component } from '@angular/core';
import { Router, NavigationExtras, RouterLink } from '@angular/router';
import { CartService } from 'src/app/user/services/cart.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Product } from 'src/app/shared/models/Product.interface';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Store } from '@ngrx/store';
import { User } from '../../../shared/models/User.interface';
import { selectCurrentUser } from '../../../auth/store/auth.reducer';
import { Observable } from 'rxjs';
import { ErrorComponent } from 'src/app/shared/components/error/error.component';

import {
  selectCart,
  selectErrors,
  selectIsSubmitting,
  selectLatestOrderNumber,
} from '../../store/user.reducer';
import { userActions } from '../../store/user.actions';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';

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
    LoadingComponent,
    ErrorComponent,
  ],
  templateUrl: './checkout.component.html',

  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  itemsFormGroup!: FormGroup;
  shippingFormGroup!: FormGroup;
  paymentFormGroup!: FormGroup;
  user: Observable<User | null | undefined> =
    this._store.select(selectCurrentUser);

  paymentMethod: string = '';
  cardNumber: string = '';

  cart: Product[] = [];
  orderNumber: number = 0;
  submitting: boolean = true;
  error: string | null = null;
  amount: number = 0;

  constructor(
    private _formBuilder: FormBuilder,
    public router: Router,
    private _store: Store,
    private _cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.user.subscribe((user) => {
      this.initializeFormValues(user);
    });

    this._store.select(selectCart).subscribe((newCart) => {
      this.cart = newCart;
    });

    this.calculateAmount();

    this._store
      .select(selectLatestOrderNumber)
      .subscribe((latestOrderNumber) => (this.orderNumber = latestOrderNumber));

    this._store
      .select(selectIsSubmitting)
      .subscribe((submitting) => (this.submitting = submitting));

    this._store.select(selectErrors).subscribe((err) => (this.error = err));
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

  calculateAmount(): void {
    this.amount = this.cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
  }

  removeItem(id: number): void {
    this._cartService.removeFromCart(id);
    this.calculateAmount();
  }

  changeQuantity(payload: { id: number; quantity: number }): void {
    this._cartService.changeQuantity(payload.id, payload.quantity);
    this.calculateAmount();
  }

  submitOrder(): void {
    this._store.dispatch(userActions.postOrder({ cart: this.cart }));
  }
}
