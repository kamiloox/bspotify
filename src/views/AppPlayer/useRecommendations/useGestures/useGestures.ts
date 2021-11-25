import { useSprings, config } from 'react-spring';
import { useDrag } from '@use-gesture/react';

export type Direction = 'right' | 'left';

const MAX_CARD_DEVIATION = 200;

const useGestures = (data: any[] | undefined, updateCache: (direction: Direction) => void) => {
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
      const isTrackAccepted = mx > MAX_CARD_DEVIATION && !active;
      const isTrackRejected = mx < -MAX_CARD_DEVIATION && !active;
      if (isTrackAccepted) {
        setTimeout(() => updateCache('right'), 200);
        return { x: mx, zIndex: 10, scale, rotate, opacity: 0 };
      } else if (isTrackRejected) {
        setTimeout(() => updateCache('left'), 200);
        return { x: mx, zIndex: 10, scale, rotate, opacity: 0 };
      }
      return { x: active ? mx : 0, zIndex, scale, rotate, opacity };
    });
  });

  const moveTrack = (direction: Direction) => {
    api.start((i) => {
      if (data?.length !== i + 1) return; // Update moved card only
      const x = direction === 'right' ? MAX_CARD_DEVIATION : -MAX_CARD_DEVIATION;
      const rotate = direction === 'right' ? 10 : -10;
      return { x, y: 0, scale: 1.03, rotate, zIndex: 10, opacity: 0 };
    });
  };

  return { springsStyle, bind, moveTrack };
};

export default useGestures;
