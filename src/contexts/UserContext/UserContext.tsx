import { createContext, useCallback, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useAuthReducer, AuthState } from './authReducer';
import { fetchBackend } from '../../utils/helpers/helpers';

const UserContext = createContext({} as AuthState);

const getAuthCookie = () => Cookies.get('is_authenticated') === 'true';

interface UserProviderProps {
  children: React.ReactChild;
}

const UserProvider = ({ children }: UserProviderProps) => {
  const [authState, dispatch] = useAuthReducer();

  const tryRefreshAccessToken = useCallback(async () => {
    dispatch({ type: 'AUTH_CHECK' });
    await fetchBackend('/auth/refresh_token');
    const isAuthenticated = getAuthCookie();
    if (isAuthenticated) dispatch({ type: 'AUTH_SUCCESS' });
    else dispatch({ type: 'AUTH_FAILURE' });
  }, [dispatch]);

  useEffect(() => {
    const isAuthenticated = getAuthCookie();
    if (isAuthenticated) dispatch({ type: 'AUTH_SUCCESS' });
    else tryRefreshAccessToken();
  }, [dispatch, tryRefreshAccessToken]);

  return <UserContext.Provider value={authState}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);

export default UserProvider;
