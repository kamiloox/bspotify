import { useEffect } from 'react';
import useIntersectionObserver from '../../../hooks/useIntersectionObserver/useIntersectionObserver';
import useTopTracks from '../../../hooks/useTopTracks/useTopTracks';
import List from '../../molecules/List/List';
import ListItem from '../../molecules/ListItem/LIstItem';
import ListItemProgress from '../../molecules/ListItemProgress/ListItemProgress';

interface TopTracksListProps {
  searchText: string;
  selectedIds: string[];
  onItemClick: (id: string) => void;
}

const TopTracksList = ({ searchText, selectedIds, onItemClick }: TopTracksListProps) => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useTopTracks();
  const { elementRef: lastElementRef, isIntersecting } = useIntersectionObserver();

  const visibleTracks = (data?.pages.map(({ items }) => items).flat() || []).filter(
    ({ name, artists }) =>
      name.toLowerCase().includes(searchText.toLowerCase()) ||
      artists
        .map(({ name }) => name)
        .join('')
        .toLowerCase()
        .includes(searchText.toLowerCase())
  );

  useEffect(() => {
    if (isIntersecting && hasNextPage) fetchNextPage();
  }, [isIntersecting, hasNextPage, fetchNextPage]);

  return (
    <List>
      {visibleTracks.map(({ id, name, album, artists }, index) => (
        <ListItem
          id={id}
          key={id}
          primaryContent={name}
          secondaryContent={artists
            .map(({ name }) => name)
            .splice(0, 2)
            .join(', ')}
          imgSrc={album.images[0].url}
          isSelected={selectedIds.includes(id)}
          onClick={() => onItemClick(id)}
          ref={visibleTracks.length === index + 1 ? lastElementRef : null}
        />
      ))}
      {isFetchingNextPage && <ListItemProgress />}
    </List>
  );
};

export default TopTracksList;
