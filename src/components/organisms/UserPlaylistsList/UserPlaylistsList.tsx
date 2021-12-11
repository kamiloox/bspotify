import { useEffect } from 'react';
import { useUserContext } from '../../../contexts/UserContext/UserContext';
import { CurrentUserProfile } from '../../../utils/types/CurrentUserProfile';
import useIntersectionObserver from '../../../hooks/useIntersectionObserver/useIntersectionObserver';
import useUserPlaylists from '../../../hooks/useUserPlaylists/useUserPlaylists';
import List from '../../molecules/List/List';
import ListItem from '../../molecules/ListItem/LIstItem';
import ListItemProgress from '../../molecules/ListItemProgress/ListItemProgress';

interface UserPlaylistsListProps {
  onItemClick: (id: string, name: string) => void;
}

const UserPlaylistsList = ({ onItemClick }: UserPlaylistsListProps) => {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useUserPlaylists();
  const { elementRef: lastElementRef, isIntersecting } = useIntersectionObserver();
  const { user } = useUserContext();
  const { id: userId } = user as CurrentUserProfile;

  useEffect(() => {
    if (isIntersecting && hasNextPage) fetchNextPage();
  }, [isIntersecting, hasNextPage, fetchNextPage]);

  const flattenedPlaylists = data?.pages.map(({ items }) => items).flat() || [];
  const editablePlaylists = flattenedPlaylists.filter(
    ({ collaborative, owner }) => collaborative || owner.id === userId
  );
  const playlists = editablePlaylists.map(({ id, name, images, description }, index) => (
    <ListItem
      id={id}
      key={id}
      primaryContent={name}
      secondaryContent={description as string | undefined}
      imgSrc={images[0].url}
      onClick={() => onItemClick(id, name)}
      ref={editablePlaylists.length === index + 1 ? lastElementRef : null}
    />
  ));

  return (
    <List>
      {playlists}
      {isFetchingNextPage && <ListItemProgress />}
    </List>
  );
};

export default UserPlaylistsList;
