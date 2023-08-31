import {Component, Input} from '@angular/core'
import {Router, NavigationExtras, RouterLink} from '@angular/router'
import {CartService} from 'src/app/services/cart.service'
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms'
import {Product} from 'src/app/shared/models/Product'
import {CommonModule} from '@angular/common'
import {MatStepperModule} from '@angular/material/stepper'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatRadioModule} from '@angular/material/radio'
import {CartItemComponent} from '../products/cart-item/cart-item.component'

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
    ],
    templateUrl: './checkout.component.html',

    styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
    itemsFormGroup!: FormGroup
    shippingFormGroup!: FormGroup
    paymentFormGroup!: FormGroup

    fname: string = ''
    lname: string = ''
    address: string = ''
    postalCode: string = ''
    city: string = ''
    country: string = ''

    paymentMethod: string = ''
    cardNumber: string = ''

    cart: Product[] = []

    @Input() amount: number

    constructor(
        private _formBuilder: FormBuilder,
        private router: Router,
        private cartService: CartService,
    ) {
        this.amount = 0
    }

    ngOnInit(): void {
        this.itemsFormGroup = this._formBuilder.group({
            firstCtrl: [''],
        })
        this.shippingFormGroup = this._formBuilder.group({
            fname: ['', Validators.required],
            lname: ['', Validators.required],
            address: ['', Validators.required],
            postalCode: ['', Validators.required],
            city: ['', Validators.required],
            country: ['', Validators.required],
        })
        this.paymentFormGroup = this._formBuilder.group({
            paymentMethod: ['', Validators.required],
            cardNumber: ['', Validators.required],
        })

        this.fname = this.shippingFormGroup.get('fname')?.value
        this.lname = this.shippingFormGroup.get('lname')?.value
        this.address = this.shippingFormGroup.get('address')?.value
        this.postalCode = this.shippingFormGroup.get('postalCode')?.value
        this.city = this.shippingFormGroup.get('city')?.value
        this.country = this.shippingFormGroup.get('country')?.value

        this.paymentFormGroup
            .get('paymentMethod')
            ?.valueChanges.subscribe((value) => {
                this.paymentMethod = value
            })

        this.cardNumber = this.paymentFormGroup.get('cardNumber')?.value

        this.cartService.getCart().subscribe((newCart: Product[]) => {
            this.cart = newCart
            this.calculateAmount()
        })
    }

    submitForm(): void {
        if (this.amount > 0) {
            this.cartService.resetCart()
            const extras: NavigationExtras = {
                queryParams: {
                    name: this.lname,
                    amount: this.amount,
                },
            }
            this.router.navigate(['/confirm'], extras)
        } else {
            alert('Your Cart is empty!')
        }
    }

    calculateAmount(): void {
        this.amount = this.cart.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0,
        )
    }

    removeItem(id: number): void {
        this.cart = this.cartService.deleteItem(id)
        this.calculateAmount()
        alert('Item Deleted!')
    }

    changeQuantity(payload: {id: number; quantity: number}): void {
        this.cart = this.cartService.changeQuantity(
            payload.id,
            payload.quantity,
        )
        this.calculateAmount()
    }
}
