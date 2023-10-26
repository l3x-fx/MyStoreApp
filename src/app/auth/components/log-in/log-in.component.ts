import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { UserLoginRequest } from '../../types/UserLogin.interface';
import { authActions } from '../../store/auth.actions';
import { Store } from '@ngrx/store';
import {
  selectIsSubmitting,
  selectErrors,
  selectIsAuthenticated,
} from '../../store/auth.reducer';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { ErrorComponent } from 'src/app/shared/components/error/error.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  standalone: true,
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    FlexLayoutModule,
    MatButtonModule,
    MatInputModule,
    LoadingComponent,
    ErrorComponent,
  ],
})
export class LogInComponent {
  email: string = '';
  password: string = '';
  isSubmitting: boolean = false;
  error: string | null = '';
  errorResult: string | null = null;
  isAuthenticated$ = this._store.select(selectIsAuthenticated);

  constructor(
    private _store: Store,
    private _router: Router,
  ) {}

  ngOnInit() {
    this.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this._router.navigate(['/account']);
      }
    });

    this._store.dispatch(authActions.errorReset());

    this._store
      .select(selectIsSubmitting)
      .subscribe((submit) => (this.isSubmitting = submit));

    this._store.select(selectErrors).subscribe((err) => {
      if (err?.includes('Database')) {
        this.error = err;
      } else {
        this.errorResult = err;
      }
    });
  }

  onSubmit() {
    const request: UserLoginRequest = {
      user: { email: this.email, password: this.password },
    };
    this._store.dispatch(authActions.login({ request }));
  }
}
