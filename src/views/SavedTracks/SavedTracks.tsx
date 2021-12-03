import { useState } from 'react';
import styled from 'styled-components';
import Button from '../../components/atoms/Button/Button';
import Typography from '../../components/atoms/Typography/Typography';
import List from '../../components/molecules/List/List';
import ListItem from '../../components/molecules/ListItem/LIstItem';
import MainTemplate from '../../components/templates/MainTemplate/MainTemplate';
import ModalTemplate from '../../components/templates/ModalTemplate/ModalTemplate';
import SavedTracksWrapper from './SavedTracksWrapper/SavedTracksWrapper';
import useSavedTracks from './useSavedTracks/useSavedTracks';

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
`;

const SavedTracks = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { tracksData, isLoading } = useSavedTracks();

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
      <ModalTemplate
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        title="Are you sure?"
      >
        Do something to save this
      </ModalTemplate>
      <MainTemplate viewportHeight>
        <Wrapper>
          <SavedTracksWrapper tracksData={tracksData} isLoading={isLoading}>
            <Typography>Summary</Typography>
            <List>{listItems}</List>
          </SavedTracksWrapper>
          <Button onClick={() => setIsModalVisible(true)}>Save playlist</Button>
        </Wrapper>
      </MainTemplate>
    </>
  );
};

export default SavedTracks;
