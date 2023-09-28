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
import { Observable, map } from 'rxjs';

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
  firstname: string | undefined;

  @Output() sidenavToggle = new EventEmitter<void>();
  constructor(private store: Store) {}

  ngOnInit() {
    this.currentUser$
      .pipe(map((currentUser) => (currentUser ? currentUser.firstname : '')))
      .subscribe((firstname) => {
        this.firstname = firstname;
      });
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  logout() {
    this.store.dispatch(authActions.logout());
  }
}
