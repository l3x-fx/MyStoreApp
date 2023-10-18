import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product, RawProduct } from 'src/app/shared/models/Product';

export const productsActions = createActionGroup({
  source: 'products',
  events: {
    GetAll: emptyProps(),
    'GetAll success': props<{ products: RawProduct[] }>(),
    'GetAll failure': props<{ error: string }>(),

    GetTopThree: emptyProps(),
    'GetTopThree success': props<{ topThree: RawProduct[] }>(),
    'GetTopThree failure': props<{ error: string }>(),

    postOrder: props<{ cart: Product[] }>(),
    'postOrder success': props<{ orderNumber: number }>(),
    'postOrder failure': props<{ error: string }>(),

    InitCart: props<{ cart: Product[] }>(),
    AddToCart: props<{ cart: Product[] }>(),
    UpdateCart: props<{ cart: Product[] }>(),
  },
});
