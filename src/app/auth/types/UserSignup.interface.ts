import { User } from './User.interface';

export interface UserSignupRequest {
  user: {
    email: string;
    fistname: string;
    lastname: string;
    password: string;
  };
}

export interface UserSignupResponse {
  user: User;
  token: string;
}
