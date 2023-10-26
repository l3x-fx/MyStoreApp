import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { map } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectCurrentUser,
  selectIsAuthenticated,
} from 'src/app/auth/store/auth.reducer';
import { RouterLink } from '@angular/router';
import { authActions } from 'src/app/auth/store/auth.actions';
import { selectCart } from 'src/app/user/store/user.reducer';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatSidenavModule,
    MatListModule,
    FlexLayoutModule,
  ],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent {
  @Output() closeSidenav = new EventEmitter();
  isAuthenticated$ = this._store.select(selectIsAuthenticated);
  currentUser$ = this._store.select(selectCurrentUser);
  cart$ = this._store.select(selectCart);
  itemsNumber: number = 1;

  constructor(private _store: Store) {}

  ngOnInit() {
    this.cart$
      .pipe(map((cart) => cart))
      .subscribe((cart) =>
        cart ? (this.itemsNumber = cart.length) : (this.itemsNumber = 0),
      );
  }

  onClose() {
    this.closeSidenav.emit();
  }

  logout() {
    this._store.dispatch(authActions.logout());
    this.onClose();
  }
}
