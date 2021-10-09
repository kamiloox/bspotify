import { useEffect, useRef, useState } from 'react';
import Button from '../../components/atoms/Button/Button';
import AlbumCover from '../../components/molecules/AlbumCover/AlbumCover';
import AudioWave from '../../components/molecules/AudioWave/AudioWave';
import { BACKEND_URL } from '../../utils/constants/constants';

const App = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) audioRef.current.play();
    else audioRef.current.pause();
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    audioRef.current?.addEventListener('ended', () => setIsPlaying(false));
  }, []);

  return (
    <div>
      <h1>Hello app</h1>
      <Button as="a" href={`${BACKEND_URL}/auth/logout`}>
        Logout
      </Button>
      <audio
        ref={audioRef}
        src="https://p.scdn.co/mp3-preview/d283f120c773725e74fc2582099dd6833b237a83?cid=936b203f34664fd9a8f3f63d59b966dc"
      />
      <AlbumCover
        artist="Bob Marley"
        title="No women, no cry!"
        imgSrc="https://i.scdn.co/image/ab67616d0000b27384397a448d59d383bb0a2e9b"
      />
      <AudioWave maxWidth={280} audioRef={audioRef} />
      <Button color={isPlaying ? 'primary' : 'success'} onClick={handleClick}>
        {isPlaying ? 'pause' : 'play'}
      </Button>
    </div>
  );
};

export default App;
