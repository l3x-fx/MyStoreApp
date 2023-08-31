import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {ProductListComponent} from './products/product-list/product-list.component'
import {CartComponent} from './products/cart/cart.component'
import {OrderConfirmComponent} from './products/order-confirm/order-confirm.component'
import {ProductDetailComponent} from './products/product-detail/product-detail.component'
import {LogInComponent} from './auth/log-in/log-in.component'
import {SignUpComponent} from './auth/sign-up/sign-up.component'
import {CheckoutComponent} from './checkout/checkout.component'

const routes: Routes = [
    {path: '', component: ProductListComponent},
    {path: 'product/:id', component: ProductDetailComponent},
    {path: 'cart', component: CartComponent},
    {path: 'checkout', component: CheckoutComponent},
    {path: 'confirm', component: OrderConfirmComponent},
    {path: 'signup', component: SignUpComponent},
    {path: 'login', component: LogInComponent},
    {path: '**', component: ProductListComponent},
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
