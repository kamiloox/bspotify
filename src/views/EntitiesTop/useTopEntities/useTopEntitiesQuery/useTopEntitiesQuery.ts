import { useQuery } from 'react-query';
import { fetchBackend } from '../../../../utils/helpers/helpers';
import { QueryReturnEntityType, EntityType } from '../../../../utils/types/App';

const useEntitiesQuery = (type: EntityType) => {
  const backendRoutes: { [k in EntityType]: string } = {
    artists: '/api/me/top/artists',
    tracks: '/api/me/top/tracks',
  };

  return useQuery<QueryReturnEntityType<typeof type>>(
    ['entity', type],
    () => fetchBackend(backendRoutes[type]),
    {
      refetchOnWindowFocus: false,
    }
  );
};
export default useEntitiesQuery;

export type { QueryReturnEntityType };
