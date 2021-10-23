import { useQuery, UseQueryResult } from 'react-query';
import { fetchBackend } from '../../utils/helpers/helpers';
import { Artist } from '../../utils/types/Artist';
import { Track } from '../../utils/types/Track';
import { AvailableGenres } from '../../utils/types/AvailableGenreSeeds';
import { UserTopItems } from '../../utils/types/UserTopItems';

export type QueryTypes = 'artists' | 'tracks' | 'genres';

type QueryReturnType<T extends QueryTypes> = T extends 'artists'
  ? UserTopItems<Artist>
  : T extends 'tracks'
  ? UserTopItems<Track>
  : AvailableGenres;

const useTopEntitiesQuery = <T extends QueryTypes>(type: T): UseQueryResult<QueryReturnType<T>> => {
  const backendRoutes: { [k in QueryTypes]: string } = {
    artists: '/api/me/top/artists',
    tracks: '/api/me/top/tracks',
    genres: '/api/recommendations/available-genre-seeds',
  };

  return useQuery(['entity', type], () => fetchBackend(backendRoutes[type]), {
    refetchOnWindowFocus: false,
  });
};

export default useTopEntitiesQuery;

export type { QueryReturnType };
