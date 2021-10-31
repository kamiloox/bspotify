import { useQuery, UseQueryResult } from 'react-query';
import { fetchBackend } from '../../utils/helpers/helpers';
import { QueryReturnEntityType, EntityTypes } from '../../utils/types/App';

const useEntitiesQuery = <T extends EntityTypes>(type: T): UseQueryResult<QueryReturnEntityType<T>> => {
  const backendRoutes: { [k in EntityTypes]: string } = {
    artists: '/api/me/top/artists',
    tracks: '/api/me/top/tracks',
    genres: '/api/recommendations/available-genre-seeds',
  };

  return useQuery(['entity', type], () => fetchBackend(backendRoutes[type]), {
    refetchOnWindowFocus: false,
  });
};

export default useEntitiesQuery;

export type { QueryReturnEntityType };
