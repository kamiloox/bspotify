import { ReactNode, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Progress from '../../../components/atoms/Progress/Progress';
import { useToastContext } from '../../../contexts/ToastContext/ToastContext';
import { getArrayDictLength } from '../../../utils/helpers/helpers';
import routes from '../../../utils/routes/routes';
import { SelectedEntitesType } from '../../../utils/types/App';

interface AppPlayerWrapperProps {
  children: ReactNode;
  selected: SelectedEntitesType | undefined;
  isLoading: boolean;
}

const AppPlayerWrapper = ({ children, selected, isLoading }: AppPlayerWrapperProps) => {
  const { showToast } = useToastContext();

  const canShowPlayer = selected ? getArrayDictLength(selected) > 0 : false;
  useEffect(() => {
    if (!canShowPlayer) showToast("Can't open player, select at least one artist or track", 'error');
  }, [canShowPlayer, showToast]);

  if (isLoading) return <Progress center />;

  if (!canShowPlayer) return <Redirect to={routes.features.path} />;

  return <>{children}</>;
};

export default AppPlayerWrapper;
