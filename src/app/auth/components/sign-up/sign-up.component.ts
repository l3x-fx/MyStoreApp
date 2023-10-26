import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UserSignupRequest } from '../../types/UserSignup.interface';
import { Store } from '@ngrx/store';
import { authActions } from '../../store/auth.actions';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import {
  selectErrors,
  selectIsAuthenticated,
  selectIsSubmitting,
} from '../../store/auth.reducer';
import { ErrorComponent } from 'src/app/shared/components/error/error.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    FlexLayoutModule,
    MatInputModule,
    LoadingComponent,
    ErrorComponent,
  ],
})
export class SignUpComponent {
  lname: string = '';
  fname: string = '';
  email: string = '';
  password: string = '';
  isSubmitting: boolean = false;
  error: string | null = '';
  reason: string | null = null;
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
      this.error = err;
      if (this.error) {
        this.reason = this.error?.substring(0, this.error?.indexOf(':'));
      }
    });
  }
  onSubmit() {
    const request: UserSignupRequest = {
      user: {
        email: this.email,
        firstname: this.fname,
        lastname: this.lname,
        password: this.password,
      },
    };

    this._store.dispatch(authActions.signup({ request }));
  }
}
