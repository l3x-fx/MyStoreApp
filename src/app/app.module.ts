import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'

import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'
import {ProductListComponent} from './products/product-list/product-list.component'
import {ProductDetailComponent} from './products/product-detail/product-detail.component'
import {CartComponent} from './products/cart/cart.component'
import {CheckoutComponent} from './products/checkout/checkout.component'
import {OrderConfirmComponent} from './products/order-confirm/order-confirm.component'
import {HeaderComponent} from './navigation/header/header.component'
import {ProductListItemComponent} from './products/product-list-item/product-list-item.component'
import {CartItemComponent} from './products/cart-item/cart-item.component'
import {HttpClientModule} from '@angular/common/http'
import {FormsModule} from '@angular/forms'
import {SignUpComponent} from './auth/sign-up/sign-up.component'
import {LogInComponent} from './auth/log-in/log-in.component'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {MaterialModule} from './material.module'
import {FlexLayoutModule} from '@angular/flex-layout'
import {SidenavComponent} from './navigation/sidenav/sidenav.component'

@NgModule({
    declarations: [
        AppComponent,
        ProductListComponent,
        ProductDetailComponent,
        CartComponent,
        CheckoutComponent,
        OrderConfirmComponent,
        HeaderComponent,
        ProductListItemComponent,
        CartItemComponent,
        SignUpComponent,
        LogInComponent,
        SidenavComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
        MaterialModule,
        FlexLayoutModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
