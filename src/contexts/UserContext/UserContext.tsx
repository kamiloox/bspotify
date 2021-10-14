import { createContext, useCallback, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useQuery } from 'react-query';
import { PrivateUserObject } from '../../utils/types/UserProfile';
import { fetchBackend } from '../../utils/helpers/helpers';
import { useAuthReducer, AuthState } from './authReducer';

const getAuthCookie = () => Cookies.get('is_authenticated') === 'true';

interface UserContextState extends AuthState {
  user: PrivateUserObject | undefined;
}

const UserContext = createContext({} as UserContextState);

interface UserProviderProps {
  children: React.ReactChild;
}

const UserProvider = ({ children }: UserProviderProps) => {
  const [authState, dispatch] = useAuthReducer();
  const { data, refetch } = useQuery<PrivateUserObject>('me', () => fetchBackend('/api/me'), {
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const refetchAndDispatch = useCallback(() => {
    refetch()
      .then(() => dispatch({ type: 'AUTH_SUCCESS' }))
      .catch(() => dispatch({ type: 'AUTH_FAILURE' }));
  }, [refetch, dispatch]);

  const tryRefreshAccessToken = useCallback(async () => {
    dispatch({ type: 'AUTH_CHECK' });
    await fetchBackend('/auth/refresh_token');
    const isAuthenticated = getAuthCookie();
    if (isAuthenticated) refetchAndDispatch();
    else dispatch({ type: 'AUTH_FAILURE' });
  }, [dispatch, refetchAndDispatch]);

  useEffect(() => {
    const isAuthenticated = getAuthCookie();
    if (isAuthenticated) refetchAndDispatch();
    else tryRefreshAccessToken();
  }, [refetchAndDispatch, tryRefreshAccessToken]);

  return <UserContext.Provider value={{ user: data, ...authState }}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);

export default UserProvider;
