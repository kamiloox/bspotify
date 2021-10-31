import React, { useState } from 'react';
import { EntityItemProps } from '../../components/molecules/EntityItem/EntityItem';
import { useAppContext } from '../../contexts/AppContext/AppContext';
import { QueryReturnEntityType } from '../../utils/types/App';
import useEntitiesQuery from '../useEntitiesQuery/useEntitiesQuery';
import { artistsFilter, tracksFilter, genresFilter } from './filters';

type EntityData = EntityItemProps & { key: string };

// This hook re-exports some data from useAppContext!
const useEntitiesData = () => {
  let data: EntityData[] = [];
  const [searchText, setSearchText] = useState('');
  const { step, goToNextStep, handleEntityClick, selectedEntities } = useAppContext();
  const { data: response } = useEntitiesQuery(step);

  if (response && step === 'artists') {
    const { items } = response as QueryReturnEntityType<'artists'>;
    const filteredItems = artistsFilter(items, searchText);
    data = filteredItems.map((item) => ({
      id: item.id,
      key: item.id,
      primaryContent: item.name,
      imgSrc: item.images[0].url,
      isSelected: selectedEntities.artists.includes(item.id),
      onClick: handleEntityClick,
    }));
  } else if (response && step === 'tracks') {
    const { items } = response as QueryReturnEntityType<'tracks'>;
    const filteredItems = tracksFilter(items, searchText);
    data = filteredItems.map((item) => ({
      id: item.id,
      key: item.id,
      primaryContent: item.name,
      secondaryContent: item.artists.map(({ name }) => name).join(', '),
      imgSrc: item.album.images[0].url,
      isSelected: selectedEntities.tracks.includes(item.id),
      onClick: handleEntityClick,
    }));
  } else if (response && step === 'genres') {
    const { genres } = response as QueryReturnEntityType<'genres'>;
    const filteredItems = genresFilter(genres, searchText);
    data = filteredItems.map((genre) => ({
      id: genre,
      key: genre,
      primaryContent: genre,
      isSelected: selectedEntities.genres.includes(genre),
      onClick: handleEntityClick,
    }));
  }

  const handleSearchText = (e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value);

  return { data, handleSearchText, step, goToNextStep };
};

export default useEntitiesData;
