import styled from 'styled-components';
import { ReactNode, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useToastContext } from '../../../contexts/ToastContext/ToastContext';
import Progress from '../../../components/atoms/Progress/Progress';
import routes from '../../../utils/routes/routes';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
`;

interface SavedTracksWrapperProps {
  children: ReactNode;
  tracksData: any[];
  isLoading: boolean;
}

const SavedTracksWrapper = ({ children, tracksData, isLoading }: SavedTracksWrapperProps) => {
  const { showToast } = useToastContext();

  const shouldRedirect = tracksData.length === 0 && !isLoading;
  useEffect(() => {
    if (shouldRedirect) showToast("You can't do it. Please save at least one track", 'warning');
  }, [shouldRedirect, showToast]);

  if (isLoading) return <Progress center />;

  if (shouldRedirect) return <Redirect to={routes.features.path} />;

  return <Wrapper>{children}</Wrapper>;
};

export default SavedTracksWrapper;
