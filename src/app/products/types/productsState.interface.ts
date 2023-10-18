import { RawProduct, Product } from 'src/app/shared/models/Product';

export interface ProductsState {
  isSubmitting: boolean;
  isLoading: boolean;
  products: RawProduct[] | null | undefined;
  topThree: RawProduct[] | null | undefined;
  cart: Product[] | [];
  latestOrderNumber: number;
  validationErrors: string | null;
}
