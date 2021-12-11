import { useEffect, useState } from 'react';
import { css } from 'styled-components';
import { Redirect, useHistory } from 'react-router-dom';
import { useToastContext } from '../../contexts/ToastContext/ToastContext';
import Button from '../../components/atoms/Button/Button';
import Typography from '../../components/atoms/Typography/Typography';
import List from '../../components/molecules/List/List';
import ListItem from '../../components/molecules/ListItem/LIstItem';
import SaveTracksModal, {
  OnCreatePlaylist,
} from '../../components/organisms/SaveTracksModal/SaveTracksModal';
import MainTemplate from '../../components/templates/MainTemplate/MainTemplate';
import useAddItemsToPlaylist from '../../hooks/useAddItemsToPlaylist/useAddItemsToPlaylist';
import useCreatePlaylist from '../../hooks/useCreatePlaylist/useCreatePlaylist';
import useSavedTracks from '../../hooks/useSavedTracks/useSavedTracks';
import Progress from '../../components/atoms/Progress/Progress';
import routes from '../../utils/routes/routes';

const templateCss = css`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const SavedTracks = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { tracks, isLoading } = useSavedTracks();
  const { showToast } = useToastContext();
  const createPlaylist = useCreatePlaylist();
  const addItems = useAddItemsToPlaylist();
  const history = useHistory();

  const handleCreatePlaylist: OnCreatePlaylist = async (e, playlistName) => {
    e.preventDefault();
    try {
      const playlist = await createPlaylist.mutateAsync({
        name: playlistName,
      });
      const { snapshot_id }: { snapshot_id: string } = await addItems.mutateAsync({
        playlistId: playlist.id,
        uris: tracks.map(({ uri }) => uri),
      });
      if (snapshot_id) {
        showToast("Success, you're playlist has been saved. Check on spotify app", 'success');
      }
    } catch (err) {
      showToast("Ooops, we're sorry. Something went wrong", 'error');
    } finally {
      history.push(routes.features.path);
    }
  };

  const handlePushToExistingPlaylist = () => {}; // TODO

  const shouldRedirect = tracks.length === 0 && !isLoading;
  useEffect(() => {
    if (shouldRedirect) showToast("You can't do it. Please save at least one track", 'warning');
  }, [shouldRedirect, showToast]);

  if (isLoading)
    return (
      <MainTemplate viewportHeight padding="15px 20px" css={templateCss}>
        <Progress center />
      </MainTemplate>
    );

  if (shouldRedirect) return <Redirect to={routes.features.path} />;

  const tracksList = tracks.map(({ id, name, album, artists }) => (
    <ListItem
      key={id}
      id={id}
      primaryContent={name}
      secondaryContent={artists
        .map(({ name }) => name)
        .splice(0, 2)
        .join(', ')}
      imgSrc={album.images[0].url}
    />
  ));

  return (
    <>
      <MainTemplate viewportHeight padding="15px 20px" css={templateCss}>
        <Typography weight="medium">Summary</Typography>
        <List>{tracksList}</List>
        <Button fullWidth onClick={() => setIsModalVisible(true)}>
          Save playlist
        </Button>
      </MainTemplate>
      <SaveTracksModal
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        onCreatePlaylist={handleCreatePlaylist}
        onPushToExistingPlaylist={handlePushToExistingPlaylist}
      />
    </>
  );
};

export default SavedTracks;
