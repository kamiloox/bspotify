import { HeartFill, XLg, CheckAll } from '@styled-icons/bootstrap';
import { templateCss, InnerWrapperPlayer, ButtonsWrapper, InfoWrapper } from './styles';
import AppPlayerWrapper from './AppPlayerWrapper/AppPlayerWrapper';
import MainTemplate from '../../components/templates/MainTemplate/MainTemplate';
import useRecommendations from './useRecommendations/useRecommendations';
import IconButton from '../../components/molecules/IconButton/IconButton';
import Typography from '../../components/atoms/Typography/Typography';
import { useLocation } from 'react-router-dom';
import { SelectedEntitesType } from '../../utils/types/App';

const AppPlayer = () => {
  const location = useLocation();
  const locationState = location.state as { selected: SelectedEntitesType | undefined };
  const { isLoading, playersJSX, savedTrackUris, acceptTrack, rejectTrack, submitChoices } =
    useRecommendations(locationState?.selected);

  return (
    <MainTemplate css={templateCss} padding="20px">
      <AppPlayerWrapper selected={locationState?.selected} isLoading={isLoading}>
        <InfoWrapper>
          <Typography size="s">
            recommending songs{' '}
            <Typography as="span" size="s" weight="medium">
              for you
            </Typography>
          </Typography>
          <Typography size="s">
            saved{' '}
            <Typography as="span" size="s" weight="medium">
              {savedTrackUris.length} songs
            </Typography>{' '}
            in playlist
          </Typography>
        </InfoWrapper>
        <InnerWrapperPlayer>{playersJSX}</InnerWrapperPlayer>
        <ButtonsWrapper>
          <IconButton color="error" onClick={rejectTrack}>
            <XLg size={32} />
          </IconButton>
          <IconButton small onClick={submitChoices}>
            <CheckAll size={24} />
          </IconButton>
          <IconButton color="success" onClick={acceptTrack}>
            <HeartFill size={32} />
          </IconButton>
        </ButtonsWrapper>
      </AppPlayerWrapper>
    </MainTemplate>
  );
};

export default AppPlayer;
