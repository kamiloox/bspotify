import { HeartFill, XLg, CheckAll } from '@styled-icons/bootstrap';
import { templateCss, InnerWrapperPlayer, ButtonsWrapper, InfoWrapper } from './styles';
import AppPlayerWrapper from './AppPlayerWrapper/AppPlayerWrapper';
import MainTemplate from '../../components/templates/MainTemplate/MainTemplate';
import useRecommendations from './useRecommendations/useRecommendations';
import IconButton from '../../components/molecules/IconButton/IconButton';
import Typography from '../../components/atoms/Typography/Typography';
import Progress from '../../components/atoms/Progress/Progress';
import { useLocation } from 'react-router-dom';
import { SelectedEntitesType } from '../../utils/types/App';

const AppPlayer = () => {
  const location = useLocation();
  const { selected } = location.state as { selected: SelectedEntitesType };
  const { isLoading, playersJSX, savedTrackUris, acceptTrack, rejectTrack } =
    useRecommendations(selected);

  if (isLoading)
    return (
      <MainTemplate>
        <Progress center />
      </MainTemplate>
    );

  return (
    <AppPlayerWrapper selected={selected}>
      <MainTemplate css={templateCss} padding="20px">
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
          <IconButton small>
            <CheckAll size={24} />
          </IconButton>
          <IconButton color="success" onClick={acceptTrack}>
            <HeartFill size={32} />
          </IconButton>
        </ButtonsWrapper>
      </MainTemplate>
    </AppPlayerWrapper>
  );
};

export default AppPlayer;
