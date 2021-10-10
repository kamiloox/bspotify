import { useEffect, useRef, useState } from 'react';
import { Wrapper, RotatedIconButton, PauseFill, PlayFill } from './styles';
import AlbumCover from '../../molecules/AlbumCover/AlbumCover';
import AudioWave from '../../molecules/AudioWave/AudioWave';

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
        <RotatedIconButton onClick={handleClick} isRotating={isPlaying}>
          {isPlaying ? <PauseFill size={42} /> : <PlayFill size={42} />}
        </RotatedIconButton>
      </AlbumCover>
      <AudioWave maxWidth={280} audioRef={audioRef} />
    </Wrapper>
  );
};

export default MusicPlayer;
