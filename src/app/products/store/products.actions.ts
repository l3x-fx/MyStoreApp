import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../../shared/models/User.interface';
import { UserEdit } from 'src/app/shared/models/UserEdit.interface';
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

    AddToCart: props<{ product: Product }>(),
    'AddToCart success': props<{ cart: [Product] }>(),
    'AddToCart failure': props<{ error: string }>(),

    RemoveFromCart: props<{ product: Product }>(),
    'RemoveFromCart success': props<{ cart: [Product] }>(),
    'RemoveFromCart failure': props<{ error: string }>(),
  },
});
