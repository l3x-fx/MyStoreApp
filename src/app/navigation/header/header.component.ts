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
import { map } from 'rxjs';
import { selectCart } from 'src/app/user/store/user.reducer';
import { AboutComponent } from 'src/app/shared/components/about/about.component';

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
    AboutComponent,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  currentUser$ = this._store.select(selectCurrentUser);
  cart$ = this._store.select(selectCart);
  itemsNumber: number = 1;

  @Output() sidenavToggle = new EventEmitter<void>();
  constructor(private _store: Store) {}

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
    this._store.dispatch(authActions.logout());
  }
}
