import { User } from '../../shared/models/User.interface';

export interface UserSignupRequest {
  user: {
    email: string;
    firstname: string;
    lastname: string;
    password: string;
  };
}

export interface UserSignupResponse {
  user: User;
  token: string;
}
