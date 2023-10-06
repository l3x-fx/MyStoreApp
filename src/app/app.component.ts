import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { HeaderComponent } from './navigation/header/header.component';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { authActions } from './auth/store/auth.actions';
import { productsActions } from './products/store/products.actions';
import { Store } from '@ngrx/store';
import { PersistanceService } from './shared/services/persistance.service';
import {
  selectCart,
  selectProducts,
  selectTopThree,
} from './products/store/products.reducer';

import { CartService } from './services/cart.service';
import { map, take } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SidenavComponent,
    HeaderComponent,
    MatSidenavModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'MyStoreApp';

  constructor(
    public persistance: PersistanceService,
    private cartService: CartService,
    private store: Store,
  ) {
    if (this.persistance.get('mystore-token')) {
      this.store.dispatch(authActions.getUser({}));
    }
  }

  ngOnInit() {
    this.store.select(selectProducts).subscribe((products) => {
      if (!products) {
        this.store.dispatch(productsActions.getAll());
      }
    });
    this.store.select(selectTopThree).subscribe((top3) => {
      if (!top3) {
        this.store.dispatch(productsActions.getTopThree());
      }
    });

    this.store
      .select(selectCart)
      .pipe(
        take(1),
        map((cart) => {
          if (!cart || cart.length === 0) {
            this.cartService.initCart();
          }
        }),
      )
      .subscribe();
  }
}
