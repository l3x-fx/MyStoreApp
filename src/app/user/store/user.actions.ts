import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product, RawProduct } from 'src/app/shared/models/Product';

export const userActions = createActionGroup({
  source: 'user',
  events: {
    postOrder: props<{ cart: Product[] }>(),
    'postOrder success': props<{ orderNumber: number }>(),
    'postOrder failure': props<{ error: string }>(),

    InitCart: props<{ cart: Product[] }>(),
    AddToCart: props<{ cart: Product[] }>(),
    UpdateCart: props<{ cart: Product[] }>(),
  },
});
