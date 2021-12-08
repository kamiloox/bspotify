import { useEffect, useState } from 'react';
import { InfiniteData, useQueryClient } from 'react-query';
import { useLocation } from 'react-router-dom';
import { Track } from '../../../utils/types/Track';

const useSavedTracks = () => {
  const location = useLocation();
  const locationState = location.state as { savedTracksUris: string[] | undefined };
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(true);
  const [tracksData, setTracksData] = useState<Track[]>([]);

  useEffect(() => {
    if (!locationState?.savedTracksUris) return setIsLoading(false);
    const queryData = queryClient.getQueryData<InfiniteData<Track[]>>('recommendations');
    const selectedTracksData = queryData?.pages.flat().filter((track) => {
      if (locationState.savedTracksUris?.includes(track.uri)) return true;
      return false;
    });
    setTracksData(selectedTracksData ? selectedTracksData : []);
    setIsLoading(false);
  }, [queryClient, locationState?.savedTracksUris]);

  return { tracksData, isLoading };
};

export default useSavedTracks;
