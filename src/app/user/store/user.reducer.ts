import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { UserState } from '../types/userState.interface';
import { userActions } from './user.actions';

const initialState: UserState = {
  isSubmitting: false,
  isLoading: false,
  cart: [],
  latestOrderNumber: 0,
  validationErrors: null,
};

const productsFeature = createFeature({
  name: 'user',
  reducer: createReducer(
    initialState,

    //Post ORDER
    on(userActions.postOrder, (state) => ({
      ...state,
      isSubmitting: true,
    })),
    on(userActions.postOrderSuccess, (state, { orderNumber }) => ({
      ...state,
      isSubmitting: false,
      cart: [],
      latestOrderNumber: orderNumber,
    })),
    on(userActions.postOrderFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.error,
    })),

    //CART

    on(userActions.initCart, (state, { cart }) => ({
      ...state,
      cart: cart,
    })),

    on(userActions.addToCart, (state, { cart }) => ({
      ...state,
      cart: cart,
    })),

    on(userActions.updateCart, (state, { cart }) => ({
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
  selectLatestOrderNumber,
  selectCart,
} = productsFeature;
