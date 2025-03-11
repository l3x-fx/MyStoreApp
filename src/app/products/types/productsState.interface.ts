import { RawProduct, Product } from 'src/app/shared/models/Product.interface';

export interface ProductsState {
  isLoading: boolean;
  products: RawProduct[] | null | undefined;

  errors: string | null;
}
