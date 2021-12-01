import { ReactChild, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useToastContext } from '../../../contexts/ToastContext/ToastContext';
import { getArrayDictLength } from '../../../utils/helpers/helpers';
import routes from '../../../utils/routes/routes';
import { SelectedEntitesType } from '../../../utils/types/App';

interface AppPlayerWrapperProps {
  children: ReactChild;
  selected: SelectedEntitesType;
}

const AppPlayerWrapper = ({ children, selected }: AppPlayerWrapperProps) => {
  const { showToast } = useToastContext();

  const canRedirectToPlayer = getArrayDictLength(selected) > 0;
  useEffect(() => {
    if (!canRedirectToPlayer)
      showToast("Can't open player, select at least one artist or track", 'error');
  }, [canRedirectToPlayer, showToast]);

  if (!canRedirectToPlayer) return <Redirect to={routes.features.path} />;

  return <>{children}</>;
};

export default AppPlayerWrapper;
