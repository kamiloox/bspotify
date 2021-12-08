import { QueryFunction, useInfiniteQuery } from 'react-query';
import { fetchBackend, spotifyToBackendUrl } from '../../utils/helpers/helpers';
import { Artist } from '../../utils/types/Artist';
import { UserTopItems } from '../../utils/types/UserTopItems';

const useTopArtists = () => {
  const url = '/api/me/top/artists';

  const fetchFn: QueryFunction<any> = ({ pageParam = url }) => fetchBackend(pageParam);

  return useInfiniteQuery<UserTopItems<Artist>>(['top', 'artists'], fetchFn, {
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage) => spotifyToBackendUrl(lastPage.next),
  });
};
export default useTopArtists;
