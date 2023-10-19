import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { PersistanceService } from 'src/app/shared/services/persistance.service';
import { userActions } from './user.actions';
import { OrderService } from '../services/order.service';
import { Order } from 'src/app/shared/models/Order.interface';
import { CartService } from '../services/cart.service';

export const getPastOrders = createEffect(
  (actions$ = inject(Actions), orderService = inject(OrderService)) => {
    return actions$.pipe(
      ofType(userActions.getPastOrders),
      switchMap(() => {
        return orderService.getPastOrders().pipe(
          map((orders: Order[]) => {
            return userActions.getPastOrdersSuccess({ orders });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            console.log('möp');
            return of(
              userActions.getPastOrdersFailure({
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

export const postOrder = createEffect(
  (
    actions$ = inject(Actions),
    cartService = inject(CartService),
    persistanceService = inject(PersistanceService),
  ) => {
    return actions$.pipe(
      ofType(userActions.postOrder),
      switchMap(({ cart }) => {
        return cartService.submitOrder(cart).pipe(
          map((response) => {
            persistanceService.remove('mystore-cart');

            return userActions.postOrderSuccess({ orderNumber: response });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
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
