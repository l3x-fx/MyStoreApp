import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from 'src/app/products/services/product.service';
import { productsActions } from './products.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { RawProduct } from 'src/app/shared/models/Product.interface';

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
