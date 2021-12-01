import { Artist } from '../../utils/types/Artist';
import { Track } from '../../utils/types/Track';

export const artistsFilter = (artists: Artist[], searchText: string) => {
  return artists.filter(({ name }) => name.toLowerCase().includes(searchText.toLowerCase()));
};

export const tracksFilter = (tracks: Track[], searchText: string) => {
  return tracks.filter(
    ({ name, artists }) =>
      name.toLowerCase().includes(searchText.toLowerCase()) ||
      artists
        .map(({ name }) => name)
        .join(', ')
        .toLowerCase()
        .includes(searchText.toLowerCase())
  );
};
