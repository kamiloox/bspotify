import { useInfiniteQuery } from 'react-query';
import { useUserContext } from '../../../../contexts/UserContext/UserContext';
import { fetchBackend } from '../../../../utils/helpers/helpers';
import { CurrentUserProfile } from '../../../../utils/types/CurrentUserProfile';
import { Track } from '../../../../utils/types/Track';
import { SelectedEntitesType } from '../../../../utils/types/App';

const useRecommendationsQuery = (selected: SelectedEntitesType) => {
  const userState = useUserContext();
  const { country } = userState.user as CurrentUserProfile;

  const params = new URLSearchParams({
    limit: '10',
    market: country,
    seed_tracks: selected.tracks.join(','),
    seed_artists: selected.artists.join(','),
  });

  const url = `/api/recommendations?${params.toString()}`;
  const query = useInfiniteQuery<Track[]>('recommendations', () => fetchBackend(url), {
    refetchOnWindowFocus: false,
    getNextPageParam: () => url,
    // enabled: getSelectedEntitiesLength() > 0, // TODO
  });

  return query;
};

export default useRecommendationsQuery;
