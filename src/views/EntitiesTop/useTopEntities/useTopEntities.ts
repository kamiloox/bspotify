import { EntityItemProps } from '../../../components/molecules/EntityItem/EntityItem';
import useTopEntitiesQuery from './useTopEntitiesQuery/useTopEntitiesQuery';
import { artistsFilter, tracksFilter } from './filters';
import { useAppContext } from '../../../contexts/AppContext/AppContext';
import { Artist } from '../../../utils/types/Artist';
import { Track } from '../../../utils/types/Track';

type DataToProps = EntityItemProps & { key: string };

const useTopEntiites = (searchText: string = '') => {
  let data: DataToProps[] = [];
  const { handleItemClick, selectedEntities, step } = useAppContext();
  const query = useTopEntitiesQuery(step);
  const response = query.data;

  if (response && step === 'artists') {
    const items = response.pages.map((page) => page.items).flat() as Artist[];
    const filteredItems = artistsFilter(items, searchText);
    data = filteredItems.map((item) => ({
      id: item.id,
      key: item.id,
      primaryContent: item.name,
      imgSrc: item.images[0].url,
      isSelected: selectedEntities.artists.includes(item.id),
      onClick: () => handleItemClick(item.id),
    }));
  } else if (response && step === 'tracks') {
    const items = response.pages.map((page) => page.items).flat() as Track[];
    const filteredItems = tracksFilter(items, searchText);
    data = filteredItems.map((item) => ({
      id: item.id,
      key: item.id,
      primaryContent: item.name,
      secondaryContent: item.artists.map(({ name }) => name).join(', '),
      imgSrc: item.album.images[0].url,
      isSelected: selectedEntities.tracks.includes(item.id),
      onClick: () => handleItemClick(item.id),
    }));
  }

  return { ...query, data };
};

export default useTopEntiites;
