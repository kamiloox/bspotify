import { useSprings, config } from 'react-spring';
import { useDrag } from '@use-gesture/react';
import { Direction } from '../../utils/types/App';

const MAX_TRACK_DEVIATION = 200;

const useTracksSwipe = (data: any[] | undefined, updateTracks: (direction: Direction) => void) => {
  const [springsStyle, api] = useSprings((data?.length || 0) as number, () => ({
    x: 0,
    y: 0,
    scale: 1,
    rotate: 0,
    zIndex: 1,
    opacity: 1,
    config: config.gentle,
  }));

  const bind = useDrag(({ active, movement: [mx], args: [index] }) => {
    api.start((i) => {
      if (i !== index) return; // Update moved card only
      const zIndex = active ? 10 : 1;
      const scale = active ? 1.01 : 1;
      const rotate = active ? mx * 0.07 : 0;
      const opacity = active ? 1 - Math.abs(mx) * 0.005 : 1;
      const isTrackAccepted = mx > MAX_TRACK_DEVIATION && !active;
      const isTrackRejected = mx < -MAX_TRACK_DEVIATION && !active;
      if (isTrackAccepted) {
        setTimeout(() => updateTracks('right'), 200);
        return { x: mx, zIndex: 10, scale, rotate, opacity: 0 };
      } else if (isTrackRejected) {
        setTimeout(() => updateTracks('left'), 200);
        return { x: mx, zIndex: 10, scale, rotate, opacity: 0 };
      }
      return { x: active ? mx : 0, zIndex, scale, rotate, opacity };
    });
  });

  const moveTrack = (direction: Direction) => {
    api.start((i) => {
      if (data?.length !== i + 1) return; // Update moved card only
      const x = direction === 'right' ? MAX_TRACK_DEVIATION : -MAX_TRACK_DEVIATION;
      const rotate = direction === 'right' ? 10 : -10;
      setTimeout(() => updateTracks(direction), 700);
      return { x, y: 0, scale: 1.03, rotate, zIndex: 10, opacity: 0 };
    });
  };

  return { springsStyle, bind, moveTrack };
};

export default useTracksSwipe;
