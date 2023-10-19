import { RawProduct, Product } from 'src/app/shared/models/Product';

export interface UserState {
  isSubmitting: boolean;
  isLoading: boolean;
  cart: Product[] | [];
  latestOrderNumber: number;
  validationErrors: string | null;
}
