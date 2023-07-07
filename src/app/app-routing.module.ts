import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { CartComponent } from './cart/cart.component';
import { OrderConfirmComponent } from './order-confirm/order-confirm.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

const routes: Routes = [
    { path: '', component: ProductListComponent }, 
    { path: 'product/:id', component: ProductDetailComponent },
    { path: 'cart', component: CartComponent },
    {path: 'confirm', component: OrderConfirmComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
