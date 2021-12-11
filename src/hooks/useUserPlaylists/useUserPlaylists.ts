import { useInfiniteQuery } from 'react-query';
import { useUserContext } from '../../contexts/UserContext/UserContext';
import { fetchBackend, spotifyToBackendUrl } from '../../utils/helpers/helpers';
import { CurrentUserProfile } from '../../utils/types/CurrentUserProfile';
import { UserPlaylists } from '../../utils/types/UserPlaylists';

const useUserPlaylists = () => {
  const { user } = useUserContext();
  const { id: userId } = user as CurrentUserProfile;

  const url = `/api/users/${userId}/playlists`;
  return useInfiniteQuery<UserPlaylists>('playlists', ({ pageParam = url }) => fetchBackend(pageParam), {
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage) => spotifyToBackendUrl(lastPage.next),
  });
};

export default useUserPlaylists;
