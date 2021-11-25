import { useState } from 'react';
import { useQueryClient, InfiniteData } from 'react-query';
import useGestures, { Direction } from './useGestures/useGestures';
import MusicPlayer from '../../../components/organisms/MusicPlayer/MusicPlayer';
import useRecommendationsQuery from './useRecommendationsQuery/useRecommendationsQuery';
import { Track } from '../../../utils/types/Track';

const useRecommendations = () => {
  const queryClient = useQueryClient();
  const query = useRecommendationsQuery();
  const data = query.data?.pages.flat();
  const [savedTrackIds, setSavedTrackIds] = useState<string[]>([]);

  const updateQueryData = (direction: Direction) => {
    queryClient.setQueryData<InfiniteData<Track[]>>('recommendations', (oldData) => {
      if (!oldData) return {} as InfiniteData<Track[]>;
      const newPages = [...oldData.pages].filter((page) => page.length > 0);
      const poppedTrack = newPages[newPages.length - 1].pop();
      if (poppedTrack?.id && direction === 'right') setSavedTrackIds([...savedTrackIds, poppedTrack.id]);
      return { pages: newPages, pageParams: oldData.pageParams };
    });
    const shouldUpdateCache = data && data.length < 4;
    if (shouldUpdateCache && !query.isFetchingMore) query.fetchMore();
  };

  const { bind, moveTrack, springsStyle } = useGestures(data, updateQueryData);

  const moveTrackAndUpdateData = (direction: Direction) => {
    moveTrack(direction);
    setTimeout(() => updateQueryData(direction), 700);
  };

  const acceptTrack = () => moveTrackAndUpdateData('right');

  const rejectTrack = () => moveTrackAndUpdateData('left');

  const playersJSX = data
    ?.filter(({ preview_url }) => !!preview_url)
    .map(({ id, artists, preview_url, album, name }, index) => (
      <MusicPlayer
        key={id}
        title={name}
        artist={artists.map(({ name }) => name).join(', ')}
        audioSrc={preview_url as string}
        imgSrc={album.images[0].url}
        focusable={data.length === index + 1 ? true : false}
        style={{ touchAction: 'none', ...springsStyle[index] }}
        {...bind(index)}
      />
    ));

  return { ...query, playersJSX, savedTrackIds, acceptTrack, rejectTrack };
};

export default useRecommendations;
