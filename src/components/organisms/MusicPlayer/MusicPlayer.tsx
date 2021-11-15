import { useEffect, useRef, useState } from 'react';
import { Wrapper, RotatedIconButton, PauseFill, PlayFill } from './styles';
import AlbumCover from '../../molecules/AlbumCover/AlbumCover';
import AudioWave from '../../molecules/AudioWave/AudioWave';

interface MusicPlayerProps {
  audioSrc: string;
  imgSrc: string;
  artist: string;
  title: string;
  focusable?: boolean;
}

const MusicPlayer = ({ title, artist, audioSrc, imgSrc, focusable = false }: MusicPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const { current } = audioRef;
    const handleStopPlaying = () => setIsPlaying(false);
    current?.addEventListener('ended', handleStopPlaying);
    return () => current?.removeEventListener('ended', handleStopPlaying);
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
        <RotatedIconButton onClick={handleClick} isRotating={isPlaying} tabIndex={focusable ? 0 : -1}>
          {isPlaying ? <PauseFill size={42} /> : <PlayFill size={42} />}
        </RotatedIconButton>
      </AlbumCover>
      <AudioWave maxWidth={280} audioRef={audioRef} focusable={focusable} />
    </Wrapper>
  );
};

export default MusicPlayer;
