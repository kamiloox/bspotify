import { useState, ChangeEvent, MouseEvent } from 'react';
import styled from 'styled-components';
import Button from '../../../components/atoms/Button/Button';
import TextField, { TextFieldStatus } from '../../../components/molecules/TextField/TextField';

const Wrapper = styled.div`
  margin: 0 auto;
  overflow-x: hidden;
  & :first-child {
    margin-bottom: 8px;
  }
`;

const titles = {
  firstStep: 'Where to save your new tracks?',
  secondStep: 'Name your new playlist.',
};

const useModalData = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isVisibleNextModalStep, setIsVisibleNextModalStep] = useState(false);
  const [modalTitle, setModalTitle] = useState(titles.firstStep);

  const [playlistName, setPlaylistName] = useState('');
  const [playlistNameStatus, setPlaylistNameStatus] = useState<TextFieldStatus>();

  const closeModal = () => {
    setIsModalVisible(false);
    setTimeout(() => {
      setIsVisibleNextModalStep(false);
      setModalTitle(titles.firstStep);
    }, 700);
  };

  const showModal = () => setIsModalVisible(true);

  const showNextStep = () => {
    setIsVisibleNextModalStep(true);
    setModalTitle(titles.secondStep);
  };

  const handlePlaylistNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.length > 1) setPlaylistNameStatus('success');
    else setPlaylistNameStatus('error');
    setPlaylistName(e.target.value);
  };

  const handleCreatePlaylist = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('submitted');
  };

  const firstStep = (
    <Wrapper>
      <Button color="success" fullWidth onClick={showNextStep} style={{ marginTop: '10px' }}>
        Create new playlist
      </Button>
      <Button color="success" fullWidth>
        Save to existing playlist
      </Button>
    </Wrapper>
  );

  const secondStep = (
    <Wrapper as="form">
      <TextField
        id="playlistName"
        label="Playlist name"
        value={playlistName}
        onChange={(e) => handlePlaylistNameChange(e)}
        status={playlistNameStatus}
      />
      <Button
        color={playlistNameStatus}
        fullWidth
        style={{ marginTop: 0 }}
        onClick={handleCreatePlaylist}
      >
        Create playlist
      </Button>
    </Wrapper>
  );

  const modalContent = isVisibleNextModalStep ? secondStep : firstStep;

  return { modalContent, isModalVisible, modalTitle, closeModal, showModal };
};

export default useModalData;
