import { useEffect, useRef, useState } from 'react';
import { animated } from 'react-spring';
import { ReactDOMAttributes } from '@use-gesture/core/types';
import { Wrapper, RotatedIconButton, PauseFill, PlayFill } from './styles';
import AlbumCover from '../../molecules/AlbumCover/AlbumCover';
import AudioWave from '../../molecules/AudioWave/AudioWave';

interface MusicPlayerProps extends ReactDOMAttributes {
  audioSrc: string;
  artist: string;
  title: string;
  imgSrc?: string;
  focusable?: boolean;
  style?: any; // animated.div style props
}

const MusicPlayer = ({
  title,
  artist,
  audioSrc,
  imgSrc,
  style,
  focusable = false,
  ...rest
}: MusicPlayerProps) => {
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
      <audio ref={audioRef} src={audioSrc} preload="auto" />
      <animated.div style={style} {...rest}>
        <AlbumCover artist={artist} title={title} imgSrc={imgSrc}>
          <RotatedIconButton onClick={handleClick} isRotating={isPlaying} tabIndex={focusable ? 0 : -1}>
            {isPlaying ? <PauseFill size={42} /> : <PlayFill size={42} />}
          </RotatedIconButton>
        </AlbumCover>
      </animated.div>
      <animated.div style={style}>
        <AudioWave maxWidth={280} audioRef={audioRef} focusable={focusable} />
      </animated.div>
    </Wrapper>
  );
};

export default MusicPlayer;
