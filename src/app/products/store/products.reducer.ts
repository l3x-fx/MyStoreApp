import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { productsActions } from './products.actions';
import { ProductsState } from '../types/productsState.interface';

const initialState: ProductsState = {
  isLoading: false,
  products: null,
  topThree: null,
  errors: null,
};

const productsFeature = createFeature({
  name: 'products',
  reducer: createReducer(
    initialState,

    //Get ALL_PRODUCTS
    on(productsActions.getAll, (state) => ({
      ...state,
      isLoading: true,
      errors: null,
    })),
    on(productsActions.getAllSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      products: action.products,
    })),
    on(productsActions.getAllFailure, (state, action) => ({
      ...state,
      isLoading: false,
      errors: action.error,
    })),

    //Get TOP_5
    on(productsActions.getTopThree, (state) => ({
      ...state,
      isLoading: true,
      errors: null,
    })),
    on(productsActions.getTopThreeSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      topThree: action.topThree,
    })),
    on(productsActions.getTopThreeFailure, (state, action) => ({
      ...state,
      isLoading: false,
      errors: action.error,
    })),

    //ErrorReset
    on(productsActions.errorReset, (state) => ({ ...state, errors: null })),
  ),
});

export const {
  name: productsFeatureKey,
  reducer: productsReducer,

  selectIsLoading,
  selectProducts,
  selectTopThree,
  selectErrors,
} = productsFeature;
