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

  signup(data: UserSignupRequest): Observable<UserSignupResponse> {
    const url = environment.apiUrl + '/signup';
    return this.http
      .post<UserSignupResponse>(url, data)
      .pipe(map((response) => response));
  }

  login(data: UserLoginRequest): Observable<UserLoginResponse> {
    const url = environment.apiUrl + '/login';
    return this.http
      .post<UserLoginResponse>(url, data)
      .pipe(map((response) => response));
  }

  editCurrentUser(userId: string, data: User): Observable<User> {
    const url = environment.apiUrl + '/users/' + userId;
    const token = localStorage.getItem('mystore-token');
    if (!token) {
      throw new Error('Token is missing.');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http
      .put<User>(url, data, { headers })
      .pipe(map((response) => response));
  }

  getCurrentUser(userId?: string): Observable<User> {
    const id = userId || localStorage.getItem('mystore-id');
    const url = environment.apiUrl + '/users/' + id;
    const token = localStorage.getItem('mystore-token');
    if (!token) {
      throw new Error('Token is missing.');
    }

    return this.http.get<User>(url).pipe(map((response) => response));
  }
}
