import { Artist } from '../../utils/types/Artist';
import { Track } from '../../utils/types/Track';
import { AvailableGenres } from '../../utils/types/AvailableGenreSeeds';
import { UserTopItems } from '../../utils/types/UserTopItems';

export type EntityTypes = 'artists' | 'tracks' | 'genres';

export type QueryReturnEntityType<T extends EntityTypes> = T extends 'artists'
  ? UserTopItems<Artist>
  : T extends 'tracks'
  ? UserTopItems<Track>
  : AvailableGenres;
