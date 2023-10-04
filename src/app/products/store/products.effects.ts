import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from 'src/app/services/product.service';
import { productsActions } from './products.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { User } from '../../shared/models/User.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { PersistanceService } from 'src/app/shared/services/persistance.service';
import { Router } from '@angular/router';
import { RawProduct } from 'src/app/shared/models/Product';

export const getAllEffect = createEffect(
  (actions$ = inject(Actions), productsService = inject(ProductService)) => {
    return actions$.pipe(
      ofType(productsActions.getAll),
      switchMap(() => {
        return productsService.getAll().pipe(
          map((products: RawProduct[]) => {
            return productsActions.getAllSuccess({ products });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              productsActions.getAllFailure({
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

export const getTopThree = createEffect(
  (actions$ = inject(Actions), productsService = inject(ProductService)) => {
    return actions$.pipe(
      ofType(productsActions.getTopThree),
      switchMap(() => {
        return productsService.getTopThree().pipe(
          map((topThree: RawProduct[]) => {
            return productsActions.getTopThreeSuccess({ topThree });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              productsActions.getTopThreeFailure({
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
