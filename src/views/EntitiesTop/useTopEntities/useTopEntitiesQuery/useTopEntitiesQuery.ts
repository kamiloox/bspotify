import { QueryFunction, useInfiniteQuery } from 'react-query';
import { fetchBackend, spotifyToBackendUrl } from '../../../../utils/helpers/helpers';
import { QueryReturnEntityType, EntityType } from '../../../../utils/types/App';

const useEntitiesQuery = (type: EntityType) => {
  const backendRoutes: { [k in EntityType]: string } = {
    artists: '/api/me/top/artists',
    tracks: '/api/me/top/tracks',
  };

  const fetchFn: QueryFunction<any> = ({ pageParam = backendRoutes[type] }) => fetchBackend(pageParam);

  return useInfiniteQuery<QueryReturnEntityType<typeof type>>(['entity', type], fetchFn, {
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage) => spotifyToBackendUrl(lastPage.next),
  });
};
export default useEntitiesQuery;
