import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { productsActions } from './products.actions';
import { ProductsState } from '../types/productsState.interface';

const initialState: ProductsState = {
  isSubmitting: false,
  isLoading: false,
  products: null,
  topThree: null,
  cart: [],
  latestOrderNumber: 0,
  validationErrors: null,
};

const productsFeature = createFeature({
  name: 'products',
  reducer: createReducer(
    initialState,

    //Get ALL_PRODUCTS
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

    //Get TOP_5
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

    //Post ORDER
    on(productsActions.postOrder, (state) => ({
      ...state,
      isSubmitting: true,
    })),
    on(productsActions.postOrderSuccess, (state, { orderNumber }) => ({
      ...state,
      isSubmitting: false,
      cart: [],
      latestOrderNumber: orderNumber,
    })),
    on(productsActions.postOrderFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.error,
    })),

    //CART

    on(productsActions.initCart, (state, { cart }) => ({
      ...state,
      cart: cart,
    })),

    on(productsActions.addToCart, (state, { cart }) => ({
      ...state,
      cart: cart,
    })),

    on(productsActions.updateCart, (state, { cart }) => ({
      ...state,
      isSubmitting: false,
      cart: cart,
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
  selectLatestOrderNumber,
  selectCart,
} = productsFeature;
