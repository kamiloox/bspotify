import { useMutation } from 'react-query';
import { useUserContext } from '../../contexts/UserContext/UserContext';
import { fetchBackend } from '../../utils/helpers/helpers';
import { Playlist } from '../../utils/types/Playlist';

interface PlaylistBody {
  name: string;
  public?: boolean;
  collaborative?: boolean;
  description?: string;
}

const useCreatePlaylist = () => {
  const { user } = useUserContext();
  return useMutation(
    (playlistBody: PlaylistBody): Promise<Playlist> =>
      fetchBackend(`/api/users/${user?.id}/playlists`, {
        body: JSON.stringify(playlistBody),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
  );
};

export default useCreatePlaylist;
