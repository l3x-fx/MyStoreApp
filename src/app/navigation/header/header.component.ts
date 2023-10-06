import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { RouterLink } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { authActions } from 'src/app/auth/store/auth.actions';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from 'src/app/auth/store/auth.reducer';
import { Observable, map } from 'rxjs';
import { selectCart } from 'src/app/products/store/products.reducer';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    FlexLayoutModule,
    MatBadgeModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  currentUser$ = this.store.select(selectCurrentUser);
  cart$ = this.store.select(selectCart);
  itemsNumber: number = 1;

  @Output() sidenavToggle = new EventEmitter<void>();
  constructor(private store: Store) {}

  ngOnInit() {
    this.cart$
      .pipe(map((cart) => cart))
      .subscribe((cart) =>
        cart ? (this.itemsNumber = cart.length) : (this.itemsNumber = 0),
      );
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  logout() {
    this.store.dispatch(authActions.logout());
  }
}
