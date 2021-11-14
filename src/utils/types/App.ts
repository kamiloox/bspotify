import { Artist } from '../../utils/types/Artist';
import { Track } from '../../utils/types/Track';
import { UserTopItems } from '../../utils/types/UserTopItems';

export type EntityType = 'artists' | 'tracks';

export type QueryReturnEntityType<T extends EntityType> = T extends 'artists'
  ? UserTopItems<Artist>
  : UserTopItems<Track>;
