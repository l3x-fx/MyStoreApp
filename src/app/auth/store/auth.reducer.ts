import { createFeature, createReducer, on } from '@ngrx/store';
import { authActions } from './auth.actions';
import { AuthState } from '../types/authState.interface';

const initialState: AuthState = {
  isShownIntro: false,
  isSubmitting: false,
  isLoading: false,
  isAuthenticated: false,
  currentUser: null,
  errors: null,
};

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    //INTRO
    on(authActions.intro, (state) => ({
      ...state,
      isShownIntro: true,
    })),
    //SIGNUP
    on(authActions.signup, (state) => ({
      ...state,
      isSubmitting: true,
      errors: null,
    })),
    on(authActions.signupSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      isAuthenticated: true,
      currentUser: action.user,
    })),
    on(authActions.signupFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      isAuthenticated: false,
      errors: action.error,
    })),

    //LOGIN
    on(authActions.login, (state) => ({
      ...state,
      isSubmitting: true,
      errors: null,
    })),
    on(authActions.loginSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      isAuthenticated: true,
      currentUser: action.user,
    })),
    on(authActions.loginFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      isAuthenticated: false,
      errors: action.errors,
    })),

    //GET_USER
    on(authActions.getUser, (state) => ({
      ...state,
      isLoading: true,
      errors: null,
    })),
    on(authActions.getUserSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      isAuthenticated: true,
      currentUser: action.user,
    })),
    on(authActions.getUserFailure, (state) => ({
      ...state,
      isLoading: false,
      isAuthenticated: false,
      currentUser: null,
    })),

    //EDIT_USER
    on(authActions.editUser, (state) => ({
      ...state,
      isSubmitting: true,
      errors: null,
    })),
    on(authActions.editUserSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      currentUser: action.user,
    })),
    on(authActions.editUserFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      errors: action.errors,
    })),

    //LOGOUT
    on(authActions.logout, (state) => ({
      ...state,
      ...initialState,
      currentUser: null,
      isAuthenticated: false,
      errors: null,
    })),

    //ErrorReset
    on(authActions.errorReset, (state) => ({
      ...state,
      errors: null,
    })),
  ),
});

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectIsShownIntro,
  selectIsSubmitting,
  selectIsLoading,
  selectIsAuthenticated,
  selectCurrentUser,
  selectErrors,
} = authFeature;
