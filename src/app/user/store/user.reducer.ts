import { createFeature, createReducer, on } from '@ngrx/store';
import { UserState } from '../types/userState.interface';
import { userActions } from './user.actions';

const initialState: UserState = {
  isSubmitting: false,
  isLoading: false,
  cart: [],
  pastOrders: [],
  latestOrderNumber: 0,
  errors: null,
};

const userFeature = createFeature({
  name: 'user',
  reducer: createReducer(
    initialState,
    //Get PAST ORDERS
    on(userActions.getPastOrders, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(userActions.getPastOrdersSuccess, (state, { orders }) => ({
      ...state,
      isLoading: false,
      pastOrders: orders,
    })),

    on(userActions.getPastOrdersFailure, (state, action) => ({
      ...state,
      isLoading: false,
      errors: action.error,
    })),
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
      errors: action.error,
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
  name: userFeatureKey,
  reducer: userReducer,
  selectIsSubmitting,
  selectIsLoading,
  selectErrors,
  selectPastOrders,
  selectLatestOrderNumber,
  selectCart,
} = userFeature;
