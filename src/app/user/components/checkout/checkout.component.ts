import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from 'src/app/user/services/cart.service';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
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
import { Observable, of, switchMap } from 'rxjs';
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

  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent {
  itemsFormGroup!: FormGroup;
  shippingFormGroup!: FormGroup;
  paymentFormGroup!: FormGroup;
  user: Observable<User | null | undefined> =
    this._store.select(selectCurrentUser);

  paymentMethod: string = '';
  cardNumber: string = '0';

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
      cardNumber: ['', [Validators.required], [this.cardNumberValidator()]],
    });

    this.paymentFormGroup
      .get('paymentMethod')
      ?.valueChanges.subscribe((value) => {
        this.paymentMethod = value;
      });

    this.cardNumber = this.paymentFormGroup.get('cardNumber')?.value;
  }
  cardNumberValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }
      return of(control.value).pipe(
        switchMap((cardNumber) => {
          const cardNumberPure = cardNumber.replace(/\D/g, '');
          // !!!
          // disabled because this is only a showcase shop, not a real shop,
          // so a real creditcard number is not required
          // !!!
          //
          // const cardPattern =
          //   /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;

          //   const isValid = cardPattern.test(cardNumberPure);

          const isValid = cardNumberPure.toString().length >= 13;
          console.log(cardNumber, isValid);
          return isValid ? of(null) : of({ invalidCardNumber: true });
        }),
      );
    };
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
