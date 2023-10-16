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
import { selectIsShownIntro } from './auth/store/auth.reducer';
import { IntroSheetComponent } from './shared/components/intro-sheet/intro-sheet.component';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SidenavComponent,
    HeaderComponent,
    MatSidenavModule,
    MatBottomSheetModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'MyStoreApp';
  introShown: boolean = false;

  constructor(
    public persistance: PersistanceService,
    private _cartService: CartService,
    private _store: Store,
    private _bottomSheet: MatBottomSheet,
  ) {
    if (this.persistance.get('mystore-token')) {
      this._store.dispatch(authActions.getUser({}));
    }
  }

  ngOnInit() {
    this._store.select(selectProducts).subscribe((products) => {
      if (!products) {
        this._store.dispatch(productsActions.getAll());
      }
    });
    this._store.select(selectTopThree).subscribe((top3) => {
      if (!top3) {
        this._store.dispatch(productsActions.getTopThree());
      }
    });

    this._store
      .select(selectCart)
      .pipe(
        take(1),
        map((cart) => {
          if (!cart || cart.length === 0) {
            this._cartService.initCart();
          }
        }),
      )
      .subscribe();

    this._store.select(selectIsShownIntro).subscribe((intro) => {
      this.introShown = intro;
    });

    if (!this.introShown) {
      this.openBottomSheet();
    }
  }
  openBottomSheet(): void {
    this._bottomSheet.open(IntroSheetComponent);
  }
}
