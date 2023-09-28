import { User } from '../../shared/models/User.interface';

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
