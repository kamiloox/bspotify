import { Artist } from '../../utils/types/Artist';
import { Track } from '../../utils/types/Track';
import { UserTopItems } from '../../utils/types/UserTopItems';

export type EntityType = 'artists' | 'tracks';

export type QueryReturnEntityType<T extends EntityType> = T extends 'artists'
  ? UserTopItems<Artist>
  : UserTopItems<Track>;

export type SelectedEntitesType = { [k in EntityType]: string[] };

export type SelectedIdsType = { tracks: string[]; artists: string[] };

export type Step = 'artists' | 'tracks';
