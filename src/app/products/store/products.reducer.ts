import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { productsActions } from './products.actions';
import { ProductsState } from '../types/productsState.interface';

const initialState: ProductsState = {
  isSubmitting: false,
  isLoading: false,
  products: null,
  topThree: null,
  cart: null,
  validationErrors: null,
};

const productsFeature = createFeature({
  name: 'products',
  reducer: createReducer(
    initialState,

    //ALL_PRODUCTS
    on(productsActions.getAll, (state) => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })),
    on(productsActions.getAllSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      products: action.products,
    })),
    on(productsActions.getAllFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.error,
    })),

    //TOP_5
    on(productsActions.getTopThree, (state) => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })),
    on(productsActions.getTopThreeSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      topThree: action.topThree,
    })),
    on(productsActions.getTopThreeFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.error,
    })),

    //CART
    on(productsActions.addToCart, (state) => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })),
    on(productsActions.addToCartSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      cart: action.cart,
    })),
    on(productsActions.addToCartFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.error,
    })),
  ),
});

export const {
  name: productsFeatreKey,
  reducer: productsReducer,
  selectIsSubmitting,
  selectIsLoading,
  selectProducts,
  selectTopThree,
  selectCart,
} = productsFeature;
