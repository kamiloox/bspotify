import React, { useState, ChangeEvent, MouseEvent } from 'react';
import styled from 'styled-components';
import ModalTemplate from '../../templates/ModalTemplate/ModalTemplate';
import TextField, { TextFieldStatus } from '../../molecules/TextField/TextField';
import Button from '../../atoms/Button/Button';

const Wrapper = styled.div`
  margin: 0 auto;
  overflow-x: hidden;
  & :first-child {
    margin-bottom: 8px;
  }
`;

export type OnCreatePlaylist = (e: MouseEvent<HTMLButtonElement>, playlistName: string) => void;

export type onPushToExistingPlaylist = () => void;

interface SaveTracksModalProps {
  onCreatePlaylist: OnCreatePlaylist;
  onPushToExistingPlaylist: onPushToExistingPlaylist;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isVisible: boolean;
}

const titles = {
  firstStep: 'Where to save your new tracks?',
  secondStep: 'Name your new playlist.',
};

const SaveTracksModal = ({
  isVisible,
  setIsVisible,
  onCreatePlaylist,
  onPushToExistingPlaylist,
}: SaveTracksModalProps) => {
  const [playlistNameStatus, setPlaylistNameStatus] = useState<TextFieldStatus>();
  const [isVisibleNextStep, setIsVisibleNextStep] = useState(false);
  const [modalTitle, setModalTitle] = useState(titles.firstStep);
  const [playlistName, setPlaylistName] = useState('');

  const showNextStep = () => {
    setIsVisibleNextStep(true);
    setModalTitle(titles.secondStep);
  };

  const handlePlaylistNameChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    if (value.length > 1) setPlaylistNameStatus('success');
    else setPlaylistNameStatus('error');
    setPlaylistName(value);
  };

  const closeModal = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsVisibleNextStep(false);
      setModalTitle(titles.firstStep);
    }, 700);
  };

  const firstStep = (
    <Wrapper>
      <Button color="success" fullWidth onClick={showNextStep} style={{ marginTop: '10px' }}>
        Create new playlist
      </Button>
      <Button color="success" fullWidth onClick={onPushToExistingPlaylist}>
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
        onClick={(e) => onCreatePlaylist(e, playlistName)}
      >
        Create playlist
      </Button>
    </Wrapper>
  );

  return (
    <ModalTemplate isVisible={isVisible} onClose={closeModal} title={modalTitle}>
      {isVisibleNextStep ? secondStep : firstStep}
    </ModalTemplate>
  );
};

export default SaveTracksModal;
