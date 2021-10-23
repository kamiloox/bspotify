// Reference: https://developer.spotify.com/documentation/web-api/reference/#/operations/get-users-top-artists-and-tracks

import { Artist } from './Artist';
import { Track } from './Track';

export interface UserTopItems<T> {
  href: string;
  items: T extends Artist ? Artist[] : Track[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}
