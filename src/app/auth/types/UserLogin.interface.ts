import { User } from './User.interface';

export interface UserLoginRequest {
  user: {
    email: string;
    password: string;
  };
}
export interface UserLoginResponse {
  user: User;
  token: string;
}
