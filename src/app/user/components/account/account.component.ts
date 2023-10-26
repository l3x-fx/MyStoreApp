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
import { UserdataComponent } from '../userdata/userdata.component';
import { userActions } from '../../store/user.actions';
import { OrderlistComponent } from '../orderlist/orderlist.component';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    RouterLink,
    FlexLayoutModule,
    UserdataComponent,
    OrderlistComponent,
  ],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
  currentUser$ = this._store.select(selectCurrentUser);
  isEdit = false;
  user: User | null | undefined;

  firstname: string = '';
  lastname: string = '';
  email: string = '';
  address: string = '';
  zip: number = 0;
  city: string = '';
  country: string = '';

  constructor(private _store: Store) {}
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
    this._store.dispatch(userActions.getPastOrders());
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
    this._store.dispatch(authActions.editUser({ data: editedUser }));
    this.isEdit = false;
  }
}
