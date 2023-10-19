import { Order } from 'src/app/shared/models/Order.interface';
import { Product } from 'src/app/shared/models/Product.interface';

export interface UserState {
  isSubmitting: boolean;
  isLoading: boolean;
  cart: Product[] | [];
  pastOrders: Order[] | [];
  latestOrderNumber: number;
  validationErrors: string | null;
}
