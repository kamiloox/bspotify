import { useReducer } from 'react';

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
}

type AuthAction =
  | { type: 'AUTH_CHECK' }
  | { type: 'AUTH_SUCCESS' }
  | { type: 'AUTH_FAILURE' }
  | { type: 'AUTH_LOGOUT' };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  if (action.type === 'AUTH_CHECK') {
    return { isAuthenticated: false, isLoading: true };
  } else if (action.type === 'AUTH_SUCCESS') {
    return { isAuthenticated: true, isLoading: false };
  } else if (action.type === 'AUTH_FAILURE' || action.type === 'AUTH_LOGOUT') {
    return { isAuthenticated: false, isLoading: false };
  }

  return state;
};

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: true,
};

export const useAuthReducer = () => useReducer(authReducer, initialState);
