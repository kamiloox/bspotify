import { QueryFunction, useInfiniteQuery } from 'react-query';
import { fetchBackend, spotifyToBackendUrl } from '../../utils/helpers/helpers';
import { Track } from '../../utils/types/Track';
import { UserTopItems } from '../../utils/types/UserTopItems';

const useTopTracks = () => {
  const url = '/api/me/top/tracks';

  const fetchFn: QueryFunction<any> = ({ pageParam = url }) => fetchBackend(pageParam);

  return useInfiniteQuery<UserTopItems<Track>>(['top', 'tracks'], fetchFn, {
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage) => spotifyToBackendUrl(lastPage.next),
  });
};
export default useTopTracks;
