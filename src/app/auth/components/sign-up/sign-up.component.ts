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
import { selectErrors, selectIsSubmitting } from '../../store/auth.reducer';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    FlexLayoutModule,
    MatInputModule,
    LoadingComponent,
  ],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  lname: string = '';
  fname: string = '';
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
