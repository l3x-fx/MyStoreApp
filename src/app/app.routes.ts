import { Route } from '@angular/router';
import { ProductListComponent } from './products/components/product-list/product-list.component';
import { CheckoutComponent } from './checkout/checkout.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: ProductListComponent,
  },
  {
    path: 'product/:id',
    loadComponent: () =>
      import(
        'src/app/products/components/product-detail/product-detail.component'
      ).then((mod) => mod.ProductDetailComponent),
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('src/app/user/components/cart/cart.component').then(
        (m) => m.CartComponent,
      ),
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('src/app/auth/components/sign-up/sign-up.component').then(
        (m) => m.SignUpComponent,
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('src/app/auth/components/log-in/log-in.component').then(
        (m) => m.LogInComponent,
      ),
  },
  {
    path: 'account',
    loadComponent: () =>
      import('src/app/user/components/account/account.component').then(
        (m) => m.AccountComponent,
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import(
        'src/app/products/components/product-list/product-list.component'
      ).then((mod) => mod.ProductListComponent),
  },
];
