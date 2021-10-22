import { createContext, useCallback, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useQuery } from 'react-query';
import { CurrentUserProfile } from '../../utils/types/CurrentUserProfile';
import { fetchBackend } from '../../utils/helpers/helpers';
import { useAuthReducer, AuthState } from './authReducer';

const getAuthCookie = () => Cookies.get('is_authenticated') === 'true';

interface UserContextState extends AuthState {
  user: CurrentUserProfile | undefined;
  logoutUser: () => Promise<void>;
}

const UserContext = createContext({} as UserContextState);

interface UserProviderProps {
  children: React.ReactChild;
}

const UserProvider = ({ children }: UserProviderProps) => {
  const [authState, dispatch] = useAuthReducer();
  const { data, refetch } = useQuery<CurrentUserProfile>('me', () => fetchBackend('/api/me'), {
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

  const value = {
    user: data,
    logoutUser: async () => {
      await fetchBackend('/auth/logout');
      dispatch({ type: 'AUTH_LOGOUT' });
    },
    ...authState,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);

export default UserProvider;
