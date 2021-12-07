import { useMutation } from 'react-query';
import { fetchBackend } from '../../utils/helpers/helpers';

interface MutationArgs {
  playlistId: string;
  uris: string[];
}

const useAddItemsToPlaylist = () => {
  return useMutation(({ playlistId, uris }: MutationArgs) =>
    fetchBackend(
      `/api/playlists/${playlistId}/tracks?${new URLSearchParams({
        playlistId,
        uris: uris.join(','),
      }).toString()}`,
      {
        method: 'POST',
      }
    )
  );
};

export default useAddItemsToPlaylist;
