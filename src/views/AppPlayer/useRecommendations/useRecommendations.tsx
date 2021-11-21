import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { useSprings, animated, config } from 'react-spring';
import { useDrag } from '@use-gesture/react';
import MusicPlayer from '../../../components/organisms/MusicPlayer/MusicPlayer';
import useRecommendationsQuery from './useRecommendationsQuery/useRecommendationsQuery';
import { Track } from '../../../utils/types/Track';

type Direction = 'right' | 'left';

const useRecommendations = () => {
  const queryClient = useQueryClient();
  const query = useRecommendationsQuery();
  const [savedTrackIds, setSavedTrackIds] = useState<string[]>([]);
  const { data } = query;
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
      if (i !== index) return;
      const x = active ? mx : 0;
      const zIndex = active ? 10 : 1;
      const scale = active ? 1.03 : 1;
      const rotate = active ? mx * 0.07 : 0;
      return { x, zIndex, scale, rotate, opacity: 1 };
    });
  });

  const moveTrack = (direction: Direction) => {
    api.start((i) => {
      if (query.data?.length !== i + 1) return;
      const x = direction === 'right' ? 300 : -300;
      const rotate = direction === 'right' ? 10 : -10;
      return { x, y: 0, scale: 1.03, rotate, zIndex: 10, opacity: 0 };
    });
  };

  const updateQueryData = (direction: Direction) => {
    queryClient.setQueryData<Track[]>('recommendations', (oldData) => {
      if (!oldData) return [];
      const newData = [...oldData];
      const poppedTrack = newData.pop();
      if (poppedTrack?.id && direction === 'right') setSavedTrackIds([...savedTrackIds, poppedTrack.id]);
      return newData;
    });
  };

  const moveTrackAndUpdateData = (direction: Direction) => {
    moveTrack(direction);
    setTimeout(() => updateQueryData(direction), 700);
  };

  const acceptTrack = () => moveTrackAndUpdateData('right');

  const rejectTrack = () => moveTrackAndUpdateData('left');

  const playersJSX = data
    ?.filter(({ preview_url }) => !!preview_url)
    .map(({ id, artists, preview_url, album, name }, index) => {
      const styles = springsStyle[index];

      return (
        <animated.div key={id} {...bind(index)} style={{ touchAction: 'none', ...styles }}>
          <MusicPlayer
            focusable={data.length === index + 1 ? true : false}
            artist={artists.map(({ name }) => name).join(', ')}
            audioSrc={preview_url as string}
            imgSrc={album.images[0].url}
            title={name}
          />
        </animated.div>
      );
    });

  return { ...query, playersJSX, acceptTrack, rejectTrack };
};

export default useRecommendations;
