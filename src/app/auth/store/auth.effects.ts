import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import { authActions } from './auth.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { User } from '../types/User.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { UserLoginResponse } from '../types/UserLogin.interface';
import { PersistanceService } from 'src/app/shared/services/persistance.service';
import { UserSignupResponse } from '../types/UserSignup.interface';
import { Router } from '@angular/router';

export const signupEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistanceService = inject(PersistanceService),
  ) => {
    return actions$.pipe(
      ofType(authActions.signup),
      switchMap(({ request }) => {
        return authService.signup(request).pipe(
          map((userSignupResponse: UserSignupResponse) => {
            persistanceService.set(
              'mystore-token',
              'mystore-id',
              userSignupResponse.token,
              userSignupResponse.user.id,
            );
            const user = userSignupResponse.user;
            console.log('EFFECTS USER', user);
            return authActions.signupSuccess({ user });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              authActions.signupFailure({
                error: errorResponse.error.error,
              }),
            );
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const redirectAfterRegisterEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.signupSuccess),
      tap(() => {
        router.navigateByUrl('/');
      }),
    );
  },
  { functional: true, dispatch: false },
);

export const loginEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistanceService = inject(PersistanceService),
  ) => {
    return actions$.pipe(
      ofType(authActions.login),
      switchMap(({ request }) => {
        return authService.login(request).pipe(
          map((userLoginResponse: UserLoginResponse) => {
            persistanceService.set(
              'mystore-token',
              'mystore-id',
              userLoginResponse.token,
              userLoginResponse.user.id,
            );
            const user = userLoginResponse.user;
            return authActions.loginSuccess({ user });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              authActions.loginFailure({
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

export const redirectAfterLoginEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.loginSuccess),
      tap(() => {
        router.navigateByUrl('/');
      }),
    );
  },
  { functional: true, dispatch: false },
);

export const logoutEffect = createEffect(
  (
    actions$ = inject(Actions),
    router = inject(Router),
    persistanceService = inject(PersistanceService),
  ) => {
    return actions$.pipe(
      ofType(authActions.logout),
      tap(() => {
        persistanceService.remove('mystore-token');
        persistanceService.remove('mystore-id');
        router.navigateByUrl('/');
      }),
    );
  },

  { functional: true, dispatch: false },
);

export const getUserEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistanceService = inject(PersistanceService),
  ) => {
    return actions$.pipe(
      ofType(authActions.getUser),
      switchMap(({ userId }) => {
        const token = persistanceService.get('mystore-token');

        if (!token) {
          return of(authActions.getUserFailure());
        }
        return authService.getCurrentUser(userId).pipe(
          map((user: User) => {
            return authActions.getUserSuccess({ user });
          }),
          catchError(() => {
            return of(authActions.getUserFailure());
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const editUserEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistanceService = inject(PersistanceService),
  ) => {
    return actions$.pipe(
      ofType(authActions.editUser),
      switchMap(({ userId, data }) => {
        const token = persistanceService.get('mystore-token');

        if (!token) {
          return of(
            authActions.editUserFailure({ errors: 'Token is missing' }),
          );
        }

        return authService.editCurrentUser(userId, data).pipe(
          map((user: User) => {
            return authActions.editUserSuccess({ user });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              authActions.editUserFailure({
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
