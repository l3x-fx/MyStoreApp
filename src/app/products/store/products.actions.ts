import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product, RawProduct } from 'src/app/shared/models/Product.interface';

export const productsActions = createActionGroup({
  source: 'products',
  events: {
    GetAll: emptyProps(),
    'GetAll success': props<{ products: RawProduct[] }>(),
    'GetAll failure': props<{ error: string }>(),

    ErrorReset: emptyProps(),
  },
});
