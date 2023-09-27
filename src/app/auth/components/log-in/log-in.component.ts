import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { UserLoginRequest } from '../../types/UserLogin.interface';
import { authActions } from '../../store/auth.actions';
import { combineLatest } from 'rxjs';
import {
  selectIsSubmitting,
  selectValidationErrors,
} from '../../store/auth.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    FlexLayoutModule,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent {
  email: string = '';
  password: string = '';

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  });
  constructor(private store: Store) {}

  ngOnInit() {}

  onSubmit() {
    const request: UserLoginRequest = {
      user: { email: this.email, password: this.password },
    };
    this.store.dispatch(authActions.login({ request }));
  }
}
