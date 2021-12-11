import { Playlist } from './Playlist';

export interface UserPlaylists {
  href: string;
  items: Playlist[];
  limit: number;
  next: string | null;
  previous: string | null;
  total: number;
}
