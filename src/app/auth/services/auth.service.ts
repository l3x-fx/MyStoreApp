import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { User } from '../../shared/models/User.interface';
import { environment } from 'src/environments/environment';
import {
  UserSignupRequest,
  UserSignupResponse,
} from '../types/UserSignup.interface';
import {
  UserLoginRequest,
  UserLoginResponse,
} from '../types/UserLogin.interface';
import { UserEdit } from 'src/app/shared/models/UserEdit.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient) {}

  signup(data: UserSignupRequest): Observable<UserSignupResponse> {
    const url = environment.apiUrl + '/signup';
    return this._http
      .post<UserSignupResponse>(url, data)
      .pipe(map((response) => response));
  }

  login(data: UserLoginRequest): Observable<UserLoginResponse> {
    const url = environment.apiUrl + '/login';
    return this._http
      .post<UserLoginResponse>(url, data)
      .pipe(map((response) => response));
  }

  getCurrentUser(userId?: string): Observable<User> {
    const id = userId || localStorage.getItem('mystore-id');
    const url = environment.apiUrl + '/users/' + id;
    const token = localStorage.getItem('mystore-token');
    if (!token) {
      throw new Error('Token is missing.');
    }

    return this._http.get<User>(url).pipe(map((response) => response));
  }
  editCurrentUser(data: UserEdit): Observable<User> {
    const userId = localStorage.getItem('mystore-id');
    const url = environment.apiUrl + '/users/' + userId;
    const token = localStorage.getItem('mystore-token');
    if (!token) {
      throw new Error('Token is missing.');
    }

    return this._http.put<User>(url, data).pipe(map((response) => response));
  }
}
