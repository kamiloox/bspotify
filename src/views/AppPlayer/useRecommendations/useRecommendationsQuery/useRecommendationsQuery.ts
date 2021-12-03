import { useInfiniteQuery } from 'react-query';
import { useUserContext } from '../../../../contexts/UserContext/UserContext';
import { fetchBackend, getArrayDictLength } from '../../../../utils/helpers/helpers';
import { CurrentUserProfile } from '../../../../utils/types/CurrentUserProfile';
import { Track } from '../../../../utils/types/Track';
import { SelectedEntitesType } from '../../../../utils/types/App';

const useRecommendationsQuery = (selected: SelectedEntitesType | undefined) => {
  const userState = useUserContext();
  const { country } = userState.user as CurrentUserProfile;

  const params = new URLSearchParams({
    limit: '10',
    market: country,
    seed_tracks: selected ? selected.tracks.join(',') : '',
    seed_artists: selected ? selected.artists.join(',') : '',
  });

  const url = `/api/recommendations?${params.toString()}`;
  const query = useInfiniteQuery<Track[]>('recommendations', () => fetchBackend(url), {
    refetchOnWindowFocus: false,
    getNextPageParam: () => url,
    enabled: selected ? getArrayDictLength(selected) > 0 : false,
    select: ({ pages, pageParams }) => {
      const occuredTrackIds: string[] = [];
      const newPages = pages.map((page) =>
        page.filter(({ id }) => {
          occuredTrackIds.push(id);
          const occurredTrackIdsCopy = [...occuredTrackIds];
          occurredTrackIdsCopy.pop();
          if (!occurredTrackIdsCopy.includes(id)) return true;
          return false;
        })
      );
      return { pages: newPages, pageParams };
    },
  });

  return query;
};

export default useRecommendationsQuery;
