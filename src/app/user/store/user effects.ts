import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { CartService } from 'src/app/services/cart.service';
import { PersistanceService } from 'src/app/shared/services/persistance.service';
import { userActions } from './user.actions';

export const postOrder = createEffect(
  (
    actions$ = inject(Actions),
    cartService = inject(CartService),
    persistanceService = inject(PersistanceService),
  ) => {
    return actions$.pipe(
      ofType(userActions.postOrder),
      switchMap(({ cart }) => {
        console.log('Postorder in progress');
        return cartService.submitOrder(cart).pipe(
          map((response) => {
            console.log('almost there');
            persistanceService.remove('mystore-cart');

            return userActions.postOrderSuccess({ orderNumber: response });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            console.log('möp');
            return of(
              userActions.postOrderFailure({
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
