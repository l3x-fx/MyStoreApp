import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UserSignupRequest } from '../types/UserSignup.interface';
import {
  UserLoginRequest,
  UserLoginResponse,
} from '../types/UserLogin.interface';
import { User } from '../types/User.interface';

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    Signup: props<{ request: UserSignupRequest }>(),
    'Signup success': props<{ user: User }>(),
    'Signup failure': props<{ errors: string }>(),

    Login: props<{ request: UserLoginRequest }>(),
    'Login success': props<{ user: User }>(),
    'Login failure': props<{ errors: string }>(),

    GetUser: props<{ userId?: string }>(),
    'GetUser success': props<{ user: User }>(),
    'GetUser failure': emptyProps(),

    EditUser: props<{ userId: string; data: User }>(),
    'EditUser success': props<{ user: User }>(),
    'EditUser failure': props<{ errors: string }>(),

    Logout: emptyProps(),
  },
});
