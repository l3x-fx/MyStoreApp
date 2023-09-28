import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from 'src/app/auth/store/auth.reducer';
import { map } from 'rxjs';
import { User } from 'src/app/shared/models/User.interface';
import { UserEdit } from 'src/app/shared/models/UserEdit.interface';
import { authActions } from 'src/app/auth/store/auth.actions';

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
  ],
  templateUrl: './userdata.component.html',
  styleUrls: ['./userdata.component.css'],
})
export class UserdataComponent {
  currentUser$ = this.store.select(selectCurrentUser);
  isEdit = false;
  user: User | null | undefined;

  firstname: string = '';
  lastname: string = '';
  email: string = '';
  address: string = '';
  zip: number = 0;
  city: string = '';
  country: string = '';

  constructor(private store: Store) {}
  ngOnInit() {
    this.currentUser$.subscribe((res) => (this.user = res));
    if (this.user) {
      this.firstname = this.user.firstname;
      this.lastname = this.user.lastname;
      this.email = this.user.email;
      this.address = this.user.address;
      this.zip = this.user.zip;
      this.city = this.user.city;
      this.country = this.user.country;
    }
  }
  setEdit() {
    this.isEdit = true;
  }
  cancel() {
    this.isEdit = false;
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
    this.store.dispatch(authActions.editUser({ data: editedUser }));
    this.isEdit = false;
  }
}
