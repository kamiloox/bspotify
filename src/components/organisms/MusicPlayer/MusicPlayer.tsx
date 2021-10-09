import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import Button from '../../atoms/Button/Button';
import AlbumCover from '../../molecules/AlbumCover/AlbumCover';
import AudioWave from '../../molecules/AudioWave/AudioWave';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  & > *:last-child {
    margin-top: 20px;
  }
`;

interface MusicPlayerProps {
  audioSrc: string;
  imgSrc: string;
  artist: string;
  title: string;
}

const MusicPlayer = ({ title, artist, audioSrc, imgSrc }: MusicPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    audioRef.current?.addEventListener('ended', () => setIsPlaying(false));
  }, []);

  const handleClick = () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) audioRef.current.play();
    else audioRef.current.pause();
    setIsPlaying(!isPlaying);
  };

  return (
    <Wrapper>
      <audio ref={audioRef} src={audioSrc} />
      <AlbumCover artist={artist} title={title} imgSrc={imgSrc}>
        <Button color={isPlaying ? 'primary' : 'success'} onClick={handleClick}>
          {isPlaying ? 'pause' : 'play'}
        </Button>
      </AlbumCover>
      <AudioWave maxWidth={280} audioRef={audioRef} />
    </Wrapper>
  );
};

export default MusicPlayer;
