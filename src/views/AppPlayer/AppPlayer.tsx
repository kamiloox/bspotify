import { useEffect, useState } from 'react';
import { useLocation, useHistory, Redirect } from 'react-router-dom';
import { HeartFill, XLg, CheckAll } from '@styled-icons/bootstrap';
import { templateCss, PlayersWrapper, ButtonsWrapper, InfoWrapper } from './styles';
import { SelectedIdsType } from '../../utils/types/App';
import { Track } from '../../utils/types/Track';
import { Direction } from '../../utils/types/App';
import { getArrayDictLength } from '../../utils/helpers/helpers';
import { useToastContext } from '../../contexts/ToastContext/ToastContext';
import routes from '../../utils/routes/routes';
import MainTemplate from '../../components/templates/MainTemplate/MainTemplate';
import useRecommendations from '../../hooks/useRecommendations/useRecommendations';
import useTracksSwipe from '../../hooks/useTracksSwipe/useTracksSwipe';
import MusicPlayer from '../../components/organisms/MusicPlayer/MusicPlayer';
import IconButton from '../../components/molecules/IconButton/IconButton';
import Typography from '../../components/atoms/Typography/Typography';
import Progress from '../../components/atoms/Progress/Progress';

const AppPlayer = () => {
  const { showToast } = useToastContext();
  const history = useHistory();
  const location = useLocation();
  const locationState = location.state as { selectedIds: SelectedIdsType | undefined };

  const [savedTracksUris, setSavedTracksUris] = useState<string[]>([]);
  const [tracksToRender, setTracksToRender] = useState<Track[]>([]);
  const { data, isLoading, fetchNextPage } = useRecommendations(locationState.selectedIds);

  const updateTracksToRender = (direction: Direction) => {
    const itemsToRenderCopy = [...tracksToRender];
    const lastTrack = itemsToRenderCopy.pop();
    if (lastTrack && direction === 'right') setSavedTracksUris([...savedTracksUris, lastTrack.uri]);
    setTracksToRender(itemsToRenderCopy);

    const shouldFetchNewRecommendations = tracksToRender.length < 6;
    if (shouldFetchNewRecommendations) fetchNextPage();
  };

  const { bind, moveTrack, springsStyle } = useTracksSwipe(tracksToRender, updateTracksToRender);

  const submitChoices = () => {
    const isSavedAtLeastOne = savedTracksUris.length > 0;
    if (isSavedAtLeastOne) history.push(routes.savedTracks.path, { savedTracksUris });
    else showToast('Please save at least one track', 'warning');
  };

  useEffect(() => {
    if (data) setTracksToRender((prevStack) => [...data.pages[data.pages.length - 1], ...prevStack]);
  }, [data]);

  const canShowPlayer = locationState?.selectedIds
    ? getArrayDictLength(locationState.selectedIds) > 0
    : false;
  useEffect(() => {
    if (!canShowPlayer) showToast("Can't open player, select at least one artist or track", 'error');
  }, [canShowPlayer, showToast]);

  if (isLoading)
    return (
      <MainTemplate css={templateCss} padding="20px">
        <Progress center />
      </MainTemplate>
    );

  if (!canShowPlayer) return <Redirect to={routes.features.path} />;

  return (
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
            {savedTracksUris.length} songs
          </Typography>{' '}
          in playlist
        </Typography>
      </InfoWrapper>
      <PlayersWrapper>
        {tracksToRender
          .filter(({ preview_url }) => !!preview_url)
          .map(({ id, artists, preview_url, album, name }, index) => (
            <MusicPlayer
              key={id}
              title={name}
              artist={artists.map(({ name }) => name).join(', ')}
              audioSrc={preview_url ?? ''}
              imgSrc={album.images[0].url}
              focusable={tracksToRender.length === index + 1}
              style={{ touchAction: 'none', ...springsStyle[index] }}
              {...bind(index)}
            />
          ))}
      </PlayersWrapper>
      <ButtonsWrapper>
        <IconButton color="error" onClick={() => moveTrack('left')}>
          <XLg size={32} />
        </IconButton>
        <IconButton small onClick={submitChoices}>
          <CheckAll size={24} />
        </IconButton>
        <IconButton color="success" onClick={() => moveTrack('right')}>
          <HeartFill size={32} />
        </IconButton>
      </ButtonsWrapper>
    </MainTemplate>
  );
};

export default AppPlayer;
