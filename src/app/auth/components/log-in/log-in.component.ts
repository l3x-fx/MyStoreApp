import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { UserLoginRequest } from '../../types/UserLogin.interface';
import { authActions } from '../../store/auth.actions';

import { selectIsSubmitting, selectErrors } from '../../store/auth.reducer';
import { Store } from '@ngrx/store';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';

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
    LoadingComponent,
  ],
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent {
  email: string = '';
  password: string = '';
  isSubmitting: boolean = false;
  error: string | null = '';

  constructor(private _store: Store) {}

  ngOnInit() {
    this._store
      .select(selectIsSubmitting)
      .subscribe((submit) => (this.isSubmitting = submit));
    this._store.select(selectErrors).subscribe((err) => (this.error = err));
  }

  onSubmit() {
    const request: UserLoginRequest = {
      user: { email: this.email, password: this.password },
    };
    this._store.dispatch(authActions.login({ request }));
  }
}
