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
  ],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  lname: string = '';
  fname: string = '';
  email: string = '';
  password: string = '';
  constructor(private store: Store) {}

  onSubmit() {
    const request: UserSignupRequest = {
      user: {
        email: this.email,
        firstname: this.fname,
        lastname: this.lname,
        password: this.password,
      },
    };
    console.log(request);
    this.store.dispatch(authActions.signup({ request }));
  }
}
