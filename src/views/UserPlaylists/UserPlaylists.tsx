import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useHistory, Redirect } from 'react-router-dom';
import { useToastContext } from '../../contexts/ToastContext/ToastContext';
import MainTemplate from '../../components/templates/MainTemplate/MainTemplate';
import ModalTemplate from '../../components/templates/ModalTemplate/ModalTemplate';
import useSavedTracks from '../../hooks/useSavedTracks/useSavedTracks';
import useAddItemsToPlaylist from '../../hooks/useAddItemsToPlaylist/useAddItemsToPlaylist';
import UserPlaylistsList from '../../components/organisms/UserPlaylistsList/UserPlaylistsList';
import Typography from '../../components/atoms/Typography/Typography';
import Button from '../../components/atoms/Button/Button';
import routes from '../../utils/routes/routes';
import Progress from '../../components/atoms/Progress/Progress';

const templateCss = css`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
`;

const ModalInfo = styled.div`
  margin: 5px 0 20px;
`;

type SimplifiedPlaylist = { id: string; name: string };

const UserPlaylists = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState<SimplifiedPlaylist | null>(null);
  const { tracks, isLoading } = useSavedTracks();
  const { showToast } = useToastContext();
  const addItems = useAddItemsToPlaylist();
  const history = useHistory();

  const onPlaylistClick = (id: string, name: string) => {
    setIsModalVisible(true);
    setSelectedPlaylist({ id, name });
  };

  const handleUpdatePlaylist = async () => {
    try {
      const { snapshot_id }: { snapshot_id: string } = await addItems.mutateAsync({
        playlistId: selectedPlaylist?.id as string,
        uris: tracks.map(({ uri }) => uri),
      });
      if (snapshot_id)
        showToast("Success, you're playlist has been saved. Check it on spotify app", 'success');
    } catch (err) {
      showToast("Ooops, we're sorry. Something went wrong", 'error');
    } finally {
      history.push(routes.features.path);
    }
  };

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

  return (
    <>
      <MainTemplate viewportHeight padding="15px 20px" css={templateCss}>
        <Typography weight="medium">Choose a playlist you want to extend</Typography>
        <UserPlaylistsList onItemClick={onPlaylistClick} />
      </MainTemplate>
      <ModalTemplate
        isVisible={isModalVisible}
        title="Are you sure?"
        onClose={() => setIsModalVisible(false)}
      >
        <ModalInfo>
          <Typography>
            This action will update your existing playlist{' '}
            <Typography as="span" weight="medium">
              `{selectedPlaylist?.name}`
            </Typography>
          </Typography>
        </ModalInfo>
        <Button fullWidth color="success" onClick={handleUpdatePlaylist}>
          Update playlist
        </Button>
      </ModalTemplate>
    </>
  );
};

export default UserPlaylists;
