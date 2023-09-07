import { User } from './User.interface';

export interface AuthState {
  isSubmitting: boolean;
  currentUser: User | null | undefined;
  isLoading: boolean;
  validationErrors: string | null;
}
