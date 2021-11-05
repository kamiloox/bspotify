import { useQuery } from 'react-query';
import { useAppContext } from '../../contexts/AppContext/AppContext';
import { useUserContext } from '../../contexts/UserContext/UserContext';
import { fetchBackend } from '../../utils/helpers/helpers';
import { CurrentUserProfile } from '../../utils/types/CurrentUserProfile';
import { Track } from '../../utils/types/Track';

const useRecommendationsQuery = () => {
  const { selectedEntities } = useAppContext();
  const userState = useUserContext();
  const { country } = userState.user as CurrentUserProfile;

  const params = new URLSearchParams({
    limit: '10',
    market: country,
    seed_tracks: selectedEntities.tracks.join(','),
    seed_artists: selectedEntities.artists.join(','),
    seed_genres: selectedEntities.genres.join(','),
  });

  const url = `/api/recommendations?${params.toString()}`;
  return useQuery<Track[]>('recommendations', () => fetchBackend(url), {
    refetchOnWindowFocus: false,
  });
};

export default useRecommendationsQuery;
