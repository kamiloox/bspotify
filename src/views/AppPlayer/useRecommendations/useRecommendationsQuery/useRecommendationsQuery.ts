import { useInfiniteQuery } from 'react-query';
import { useAppContext } from '../../../../contexts/AppContext/AppContext';
import { useUserContext } from '../../../../contexts/UserContext/UserContext';
import { fetchBackend } from '../../../../utils/helpers/helpers';
import { CurrentUserProfile } from '../../../../utils/types/CurrentUserProfile';
import { Track } from '../../../../utils/types/Track';

const useRecommendationsQuery = () => {
  const { selectedEntities } = useAppContext();
  const userState = useUserContext();
  const { country } = userState.user as CurrentUserProfile;

  const params = new URLSearchParams({
    limit: '10',
    market: country,
    seed_tracks: ['78jIj6Ph2364zg1ZVIvbIN', '1VikIHUhVtGjHnrv8W1vQP'].join(','),
    seed_artists: selectedEntities.artists.join(','),
  });

  const url = `/api/recommendations?${params.toString()}`;
  const query = useInfiniteQuery<Track[]>('recommendations', () => fetchBackend(url), {
    refetchOnWindowFocus: false,
    getPreviousPageParam: () => fetchBackend(url), // Workaround - fetch more data without deleting existing
  });

  const { isLoading, data, fetchPreviousPage } = query;

  return { isFetchingMore: query.isFetchingPreviousPage, isLoading, data, fetchMore: fetchPreviousPage };
};

export default useRecommendationsQuery;
