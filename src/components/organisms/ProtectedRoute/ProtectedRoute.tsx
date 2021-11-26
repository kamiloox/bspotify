import { ReactChild } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useUserContext } from '../../../contexts/UserContext/UserContext';
import Progress from '../../atoms/Progress/Progress';
import MainTemplate from '../../templates/MainTemplate/MainTemplate';

interface ProtectedRouteProps extends RouteProps {
  redirectTo?: string;
  children: ReactChild;
}

const ProtectedRoute = ({ redirectTo = '', children, ...rest }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useUserContext();

  if (isLoading)
    return (
      <MainTemplate viewportHeight>
        <Progress center />
      </MainTemplate>
    );

  if (isAuthenticated) return <Route {...rest}>{children}</Route>;

  return <Redirect to={redirectTo} />;
};

export default ProtectedRoute;
