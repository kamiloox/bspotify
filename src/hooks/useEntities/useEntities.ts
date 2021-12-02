import { ListItemProps } from '../../components/molecules/ListItem/LIstItem';
import { artistsFilter, tracksFilter } from './filters';
import { Artist } from '../../utils/types/Artist';
import { Track } from '../../utils/types/Track';
import useEntitiesQuery from './useEntitiesQuery/useEntitiesQuery';
import useEntitiesManipulation from './useEntitiesManipulation/useEntitiesManipulation';
import { EntityType } from './useEntitiesManipulation/entitiesReducer';

type DataToProps = ListItemProps & { key: string };

const useEntities = (steps: EntityType[], searchText: string = '') => {
  let data: DataToProps[] = [];
  const entitiesOrganizerData = useEntitiesManipulation(steps);
  const { currentStep, selected, handleItemClick } = entitiesOrganizerData;
  const query = useEntitiesQuery(currentStep);
  const response = query.data;

  if (response && currentStep === 'artists') {
    const items = response.pages.map((page) => page.items).flat() as Artist[];
    const filteredItems = artistsFilter(items, searchText);
    data = filteredItems.map((item) => ({
      id: item.id,
      key: item.id,
      primaryContent: item.name,
      imgSrc: item.images[0].url,
      isSelected: selected.artists.includes(item.id),
      onClick: () => handleItemClick(item.id),
    }));
  } else if (response && currentStep === 'tracks') {
    const items = response.pages.map((page) => page.items).flat() as Track[];
    const filteredItems = tracksFilter(items, searchText);
    data = filteredItems.map((item) => ({
      id: item.id,
      key: item.id,
      primaryContent: item.name,
      secondaryContent: item.artists.map(({ name }) => name).join(', '),
      imgSrc: item.album.images[0].url,
      isSelected: selected.tracks.includes(item.id),
      onClick: () => handleItemClick(item.id),
    }));
  }

  return { ...query, data, entitiesOrganizerData };
};

export default useEntities;
