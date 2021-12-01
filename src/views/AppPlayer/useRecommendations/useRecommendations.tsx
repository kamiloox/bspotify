import { useState, useEffect } from 'react';
import useGestures, { Direction } from './useGestures/useGestures';
import MusicPlayer from '../../../components/organisms/MusicPlayer/MusicPlayer';
import useRecommendationsQuery from './useRecommendationsQuery/useRecommendationsQuery';
import { Track } from '../../../utils/types/Track';
import { SelectedEntitesType } from '../../../utils/types/App';

const useRecommendations = (selected: SelectedEntitesType) => {
  const query = useRecommendationsQuery(selected);
  const [savedTrackUris, setSavedTrackUris] = useState<string[]>([]);
  const [itemsToRender, setItemsToRender] = useState<Track[]>([]);

  useEffect(() => {
    if (query.data)
      setItemsToRender((prevStack) => [...query.data.pages[query.data.pages.length - 1], ...prevStack]);
  }, [query.data]);

  const updateItemsToRender = (direction: Direction) => {
    const itemsToRenderCopy = [...itemsToRender];
    const lastTrack = itemsToRenderCopy.pop();
    if (lastTrack && direction === 'right') setSavedTrackUris([...savedTrackUris, lastTrack.uri]);
    setItemsToRender(itemsToRenderCopy);

    const shouldFetchNewRecommendations = itemsToRender.length < 6;
    if (shouldFetchNewRecommendations) query.fetchNextPage();
  };

  const { bind, moveTrack, springsStyle } = useGestures(itemsToRender, updateItemsToRender);

  const moveTrackAndUpdateData = (direction: Direction) => {
    moveTrack(direction);
    setTimeout(() => updateItemsToRender(direction), 700);
  };

  const acceptTrack = () => moveTrackAndUpdateData('right');

  const rejectTrack = () => moveTrackAndUpdateData('left');

  const playersJSX = itemsToRender
    .filter(({ preview_url }) => !!preview_url)
    .map(({ id, artists, preview_url, album, name }, index) => (
      <MusicPlayer
        key={id}
        title={name}
        artist={artists.map(({ name }) => name).join(', ')}
        audioSrc={preview_url as string}
        imgSrc={album.images[0].url}
        focusable={itemsToRender.length === index + 1 ? true : false}
        style={{ touchAction: 'none', ...springsStyle[index] }}
        {...bind(index)}
      />
    ));

  return { ...query, playersJSX, savedTrackUris, acceptTrack, rejectTrack };
};

export default useRecommendations;
