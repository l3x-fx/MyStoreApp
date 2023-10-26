import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from 'src/app/auth/store/auth.reducer';
import { User } from 'src/app/shared/models/User.interface';
import { UserEdit } from 'src/app/shared/models/UserEdit.interface';
import { authActions } from 'src/app/auth/store/auth.actions';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import {
  selectErrors,
  selectIsSubmitting,
} from '../../../auth/store/auth.reducer';

@Component({
  selector: 'app-userdata',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    RouterLink,
    FlexLayoutModule,
    LoadingComponent,
  ],
  templateUrl: './userdata.component.html',
  styleUrls: ['./userdata.component.scss'],
})
export class UserdataComponent {
  isEdit: boolean = false;
  user: User | null | undefined;
  isSubmitting: boolean = false;
  error: string | null = '';

  firstname: string = '';
  lastname: string = '';
  email: string = '';
  address: string = '';
  zip: number = 0;
  city: string = '';
  country: string = '';

  constructor(private _store: Store) {}
  ngOnInit() {
    this._store.select(selectCurrentUser).subscribe((user) => {
      if (user) {
        this.user = user;
        this.firstname = user.firstname;
        this.lastname = user.lastname;
        this.email = user.email;
        this.address = user.address;
        this.zip = user.zip;
        this.city = user.city;
        this.country = user.country;
      }
    });

    this._store
      .select(selectIsSubmitting)
      .subscribe((submit) => (this.isSubmitting = submit));
    this._store.select(selectErrors).subscribe((err) => (this.error = err));
  }

  setEdit() {
    this.isEdit = true;
  }

  cancel() {
    this.isEdit = false;
  }
  isDisabled(): boolean {
    return !(this.firstname && this.lastname && this.isEmailValid(this.email));
  }
  isEmailValid(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }
  onSubmit() {
    const editedUser: UserEdit = {
      firstname: this.firstname,
      email: this.email,
      lastname: this.lastname,
      address: this.address,
      zip: this.zip,
      city: this.city,
      country: this.country,
    };
    this._store.dispatch(authActions.editUser({ data: editedUser }));
    this.isEdit = false;
  }
}
