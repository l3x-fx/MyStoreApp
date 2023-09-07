import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { User } from '../types/User.interface';
import { environment } from 'src/environments/environment';
import {
  UserSignupRequest,
  UserSignupResponse,
} from '../types/UserSignup.interface';
import {
  UserLoginRequest,
  UserLoginResponse,
} from '../types/UserLogin.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(data: UserSignupRequest): Observable<User> {
    const url = environment.apiUrl + '/signup';
    return this.http
      .post<UserSignupResponse>(url, data)
      .pipe(map((response) => response.user));
  }

  login(data: UserLoginRequest): Observable<User> {
    const url = environment.apiUrl + '/users/login';
    return this.http
      .post<UserLoginResponse>(url, data)
      .pipe(map((response) => response.user));
  }

  logout(): void {
    localStorage.removeItem('mystore-token');
  }

  editCurrentUser(userId: string, data: User): Observable<User> {
    const url = environment.apiUrl + '/user/' + userId;
    const token = localStorage.getItem('mystore-token');
    if (!token) {
      throw new Error('Token is missing.');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http
      .put<User>(url, data, { headers })
      .pipe(map((response) => response));
  }

  getCurrentUser(userId: string): Observable<User> {
    const url = environment.apiUrl + '/user/' + userId;
    const token = localStorage.getItem('mystore-token');
    if (!token) {
      throw new Error('Token is missing.');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http
      .get<User>(url, { headers })
      .pipe(map((response) => response));
  }
}
