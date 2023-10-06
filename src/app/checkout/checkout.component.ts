import { Component, Input } from '@angular/core';
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
import { filter, take } from 'rxjs';

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

  currentUser$ = this.store.select(selectCurrentUser);

  user: User | undefined | null;

  paymentMethod: string = '';
  cardNumber: string = '';

  cart: Product[] = [];

  @Input() amount: number;

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private store: Store,
    private cartService: CartService,
  ) {
    this.currentUser$
      .pipe(
        filter((user) => !!user),
        take(1),
      )
      .subscribe((user) => {
        this.user = user;
        console.log(this.user);
        this.initializeFormValues();
      });

    this.amount = 0;
  }

  ngOnInit(): void {
    this.store.select(selectCart).subscribe((newCart: Product[]) => {
      this.cart = newCart;
    });
  }

  ngOnChanges() {
    this.calculateAmount();
  }

  initializeFormValues(): void {
    this.itemsFormGroup = this._formBuilder.group({
      firstCtrl: [''],
    });

    this.shippingFormGroup = this._formBuilder.group({
      fname: [this.user?.firstname || 'LALA', Validators.required],
      lname: [this.user?.lastname || '', Validators.required],
      address: [this.user?.address || '', Validators.required],
      postalCode: [this.user?.zip || '', Validators.required],
      city: [this.user?.city || '', Validators.required],
      country: [this.user?.country || '', Validators.required],
    });
    console.log(this.shippingFormGroup.get('fname')?.value);
    console.log(this.shippingFormGroup.get('city')?.value);

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
    alert('Item Deleted!');
  }

  changeQuantity(payload: { id: number; quantity: number }): void {
    this.cartService.changeQuantity(payload.id, payload.quantity);
  }
}
