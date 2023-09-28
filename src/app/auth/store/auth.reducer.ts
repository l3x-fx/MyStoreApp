import { createFeature, createReducer, on } from '@ngrx/store';
import { authActions } from './auth.actions';
import { AuthState } from '../types/authState.interface';

const initialState: AuthState = {
  isSubmitting: false,
  isLoading: false,
  currentUser: null,
  validationErrors: null,
};

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,

    //SIGNUP
    on(authActions.signup, (state) => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })),
    on(authActions.signupSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      currentUser: action.user,
    })),
    on(authActions.signupFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.error,
    })),

    //LOGIN
    on(authActions.login, (state) => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })),
    on(authActions.loginSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      currentUser: action.user,
    })),
    on(authActions.loginFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })),

    //GET_USER
    on(authActions.getUser, (state) => ({
      ...state,
      isLoading: true,
      validationErrors: null,
    })),
    on(authActions.getUserSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      currentUser: action.user,
    })),
    on(authActions.getUserFailure, (state) => ({
      ...state,
      isLoading: false,
      currentUser: null,
    })),

    //EDIT_USER
    on(authActions.editUser, (state) => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })),
    on(authActions.editUserSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      currentUser: action.user,
    })),
    on(authActions.editUserFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })),

    //LOGOUT
    on(authActions.logout, (state) => ({
      ...state,
      ...initialState,
      currentUser: null,
      validationErrors: null,
    })),

    //LOGOUT
    on(authActions.errorReset, (state) => ({
      ...state,
      validationErrors: null,
    })),
  ),
});

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectIsSubmitting,
  selectIsLoading,
  selectCurrentUser,
  selectValidationErrors,
} = authFeature;
