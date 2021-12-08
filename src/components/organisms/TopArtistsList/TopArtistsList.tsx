import { useEffect } from 'react';
import useIntersectionObserver from '../../../hooks/useIntersectionObserver/useIntersectionObserver';
import useTopArtists from '../../../hooks/useTopArtists/useTopArtists';
import List from '../../molecules/List/List';
import ListItem from '../../molecules/ListItem/LIstItem';
import ListItemProgress from '../../molecules/ListItemProgress/ListItemProgress';

interface TopArtistsListProps {
  searchText: string;
  selectedIds: string[];
  onItemClick: (id: string) => void;
}

const TopArtistsList = ({ searchText, selectedIds, onItemClick }: TopArtistsListProps) => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useTopArtists();
  const { elementRef: lastElementRef, isIntersecting } = useIntersectionObserver();

  const visibleArtists = (data?.pages.map(({ items }) => items).flat() || []).filter(({ name }) =>
    name.toLowerCase().includes(searchText.toLowerCase())
  );

  useEffect(() => {
    if (isIntersecting && hasNextPage) fetchNextPage();
  }, [isIntersecting, hasNextPage, fetchNextPage]);

  return (
    <List>
      {visibleArtists.map(({ id, name, images }, index) => (
        <ListItem
          id={id}
          key={id}
          primaryContent={name}
          imgSrc={images[0].url}
          isSelected={selectedIds.includes(id)}
          onClick={() => onItemClick(id)}
          ref={visibleArtists.length === index + 1 ? lastElementRef : null}
        />
      ))}
      {isFetchingNextPage && <ListItemProgress />}
    </List>
  );
};

export default TopArtistsList;
