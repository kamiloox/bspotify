import { ReactChild, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useAppContext } from '../../../contexts/AppContext/AppContext';
import { useToastContext } from '../../../contexts/ToastContext/ToastContext';
import routes from '../../../utils/routes/routes';

interface AppPlayerWrapperProps {
  children: ReactChild;
}

const AppPlayerWrapper = ({ children }: AppPlayerWrapperProps) => {
  const { getSelectedEntitiesLength } = useAppContext();
  const { showToast } = useToastContext();

  const canRedirectToPlayer = getSelectedEntitiesLength() > 0;
  useEffect(() => {
    if (!canRedirectToPlayer)
      showToast("Can't open player, select at least one artist or track", 'error');
  }, [canRedirectToPlayer, showToast]);

  if (!canRedirectToPlayer) return <Redirect to={routes.features.path} />;

  return <>{children}</>;
};

export default AppPlayerWrapper;
