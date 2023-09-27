import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { authActions } from 'src/app/auth/store/auth.actions';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from 'src/app/auth/store/auth.reducer';

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
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  currentUser$ = this.store.select(selectCurrentUser);

  @Output() sidenavToggle = new EventEmitter<void>();
  constructor(private store: Store) {}

  ngOnInit() {}

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  logout() {
    console.log('LOGOUT!!!!');
    this.store.dispatch(authActions.logout());
  }
}
