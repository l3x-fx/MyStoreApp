import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import { authActions } from './auth.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { User } from '../types/User.interface';
import { HttpErrorResponse } from '@angular/common/http';

export const signupEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(authActions.signup),
      switchMap(({ request }) => {
        return authService.signup(request).pipe(
          map((user: User) => {
            return authActions.signupSuccess({ user });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              authActions.signupFailure({
                errors: errorResponse.error.errors,
              }),
            );
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const loginEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(authActions.login),
      switchMap(({ request }) => {
        return authService.login(request).pipe(
          map((user: User) => {
            return authActions.signupSuccess({ user });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              authActions.signupFailure({
                errors: errorResponse.error.errors,
              }),
            );
          }),
        );
      }),
    );
  },
  { functional: true },
);
