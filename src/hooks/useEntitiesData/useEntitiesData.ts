import { useState } from 'react';
import { EntityItemProps } from '../../components/molecules/EntityItem/EntityItem';
import { EntityTypes, QueryReturnEntityType } from '../../utils/types/App';
import useEntitiesQuery from '../useEntitiesQuery/useEntitiesQuery';
import { artistsFilter, tracksFilter, genresFilter } from './filters';

type EntityData = EntityItemProps & { key: string };

const useEntitiesData = () => {
  let data: EntityData[] = [];
  const steps: EntityTypes[] = ['tracks', 'artists', 'genres'];
  const [step, setStep] = useState<EntityTypes>(steps[0]);
  const [selectedEntities, setSelectedEntities] = useState<{ [k in EntityTypes]: string[] }>({
    artists: [],
    genres: [],
    tracks: [],
  });

  const query = useEntitiesQuery(step);
  const [searchText, setSearchText] = useState('');

  const goToNextStep = () => {
    const currentStage = steps.indexOf(step);
    if (steps.length > currentStage + 1) setStep(steps[currentStage + 1]);
    else console.log('submit choices');
  };

  const handleEntityClick: EntityItemProps['onClick'] = (e, id) => {
    const MAX_LENGTH = 5;
    if (!selectedEntities[step].includes(id) && selectedEntities[step].length < MAX_LENGTH) {
      setSelectedEntities({ ...selectedEntities, [step]: [...selectedEntities[step], id] });
    } else {
      const filteredEntities = selectedEntities[step].filter((currentId) => currentId !== id);
      setSelectedEntities({ ...selectedEntities, [step]: [...filteredEntities] });
    }
  };

  const response = query.data;

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

  return { step, searchText, setSearchText, goToNextStep, selectedEntities, data };
};

export default useEntitiesData;
