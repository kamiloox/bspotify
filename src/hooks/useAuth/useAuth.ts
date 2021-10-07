import { useEffect, useState } from 'react';
import Cookie from 'js-cookie';
import { fetchBackend } from '../../utils/helpers/helpers';

const getAuthCookie = () => Cookie.get('is_authenticated') === 'true';

const useAuth = () => {
  const authCookie = getAuthCookie();
  const [isAuthenticated, setIsAuthenticated] = useState(authCookie);
  const [isLoading, setIsLoading] = useState(authCookie ? false : true);

  const refreshAccessToken = async () => {
    setIsLoading(true);
    await fetchBackend('/auth/refresh_token');
    const updatedAuthCookie = getAuthCookie();
    if (updatedAuthCookie) setIsAuthenticated(true);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!isAuthenticated) refreshAccessToken();
  }, [isAuthenticated]);

  return { isAuthenticated, isLoading };
};

export default useAuth;
