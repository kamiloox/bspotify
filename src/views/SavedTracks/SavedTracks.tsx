import Button from '../../components/atoms/Button/Button';
import Typography from '../../components/atoms/Typography/Typography';
import List from '../../components/molecules/List/List';
import ListItem from '../../components/molecules/ListItem/LIstItem';
import MainTemplate from '../../components/templates/MainTemplate/MainTemplate';
import ModalTemplate from '../../components/templates/ModalTemplate/ModalTemplate';
import SavedTracksWrapper from './SavedTracksWrapper/SavedTracksWrapper';
import useModalData from './useModalData/useModalData';
import useSavedTracks from './useSavedTracks/useSavedTracks';

const SavedTracks = () => {
  const { tracksData, isLoading } = useSavedTracks();
  const { modalContent, isModalVisible, modalTitle, closeModal, showModal } = useModalData();

  const listItems = tracksData.map((track) => (
    <ListItem
      key={track.id}
      id={track.id}
      primaryContent={track.name}
      secondaryContent={track.artists.map(({ name }) => name).join(', ')}
      imgSrc={track.album.images[0].url}
    />
  ));

  return (
    <>
      <MainTemplate viewportHeight padding="15px 20px">
        <SavedTracksWrapper tracksData={tracksData} isLoading={isLoading}>
          <Typography>Summary</Typography>
          <List>{listItems}</List>
          <Button onClick={showModal}>Save playlist</Button>
        </SavedTracksWrapper>
      </MainTemplate>
      <ModalTemplate isVisible={isModalVisible} onClose={closeModal} title={modalTitle}>
        {modalContent}
      </ModalTemplate>
    </>
  );
};

export default SavedTracks;
