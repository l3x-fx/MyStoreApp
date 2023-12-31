import { User } from '../../shared/models/User.interface';

export interface AuthState {
  isShownIntro: boolean;
  isSubmitting: boolean;
  currentUser: User | null | undefined;
  isLoading: boolean;
  isAuthenticated: boolean;
  errors: string | null;
}
