import { ReactChild } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth/useAuth';
import Typography from '../../atoms/Typography/Typography';

interface ProtectedRouteProps extends RouteProps {
  redirectTo: string;
  children: ReactChild;
}

const ProtectedRoute = ({ redirectTo, children, ...rest }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <Typography>Loading...</Typography>;

  if (!isAuthenticated) return <Redirect to={redirectTo} />;

  return <Route {...rest}>{children}</Route>;
};

export default ProtectedRoute;
