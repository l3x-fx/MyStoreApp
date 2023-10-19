import { RawProduct, Product } from 'src/app/shared/models/Product.interface';

export interface ProductsState {
  isSubmitting: boolean;
  isLoading: boolean;
  products: RawProduct[] | null | undefined;
  topThree: RawProduct[] | null | undefined;
  validationErrors: string | null;
}
