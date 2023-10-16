import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UserSignupRequest } from '../types/UserSignup.interface';
import { UserLoginRequest } from '../types/UserLogin.interface';
import { User } from '../../shared/models/User.interface';
import { UserEdit } from 'src/app/shared/models/UserEdit.interface';

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    Intro: emptyProps(),
    Signup: props<{ request: UserSignupRequest }>(),
    'Signup success': props<{ user: User }>(),
    'Signup failure': props<{ error: string }>(),

    Login: props<{ request: UserLoginRequest }>(),
    'Login success': props<{ user: User }>(),
    'Login failure': props<{ errors: string }>(),

    GetUser: props<{ userId?: string }>(),
    'GetUser success': props<{ user: User }>(),
    'GetUser failure': emptyProps(),

    EditUser: props<{ data: UserEdit }>(),
    'EditUser success': props<{ user: User }>(),
    'EditUser failure': props<{ errors: string }>(),

    Logout: emptyProps(),

    ErrorReset: emptyProps(),
  },
});
