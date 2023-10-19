import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Order } from 'src/app/shared/models/Order.interface';
import { Product } from 'src/app/shared/models/Product.interface';

export const userActions = createActionGroup({
  source: 'user',
  events: {
    getPastOrders: emptyProps(),
    'getPastOrders success': props<{ orders: Order[] }>(),
    'getPastOrders failure': props<{ error: string }>(),

    postOrder: props<{ cart: Product[] }>(),
    'postOrder success': props<{ orderNumber: number }>(),
    'postOrder failure': props<{ error: string }>(),

    InitCart: props<{ cart: Product[] }>(),
    AddToCart: props<{ cart: Product[] }>(),
    UpdateCart: props<{ cart: Product[] }>(),
  },
});
