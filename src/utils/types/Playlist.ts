// Reference: https://developer.spotify.com/documentation/web-api/reference/#/operations/get-playlist

import { ExternalUrls, Followers, Image } from './BaseObjects';
import { CurrentUserProfile } from './CurrentUserProfile';
import { Track } from './Track';

export interface Playlist {
  collaborative: boolean;
  description: string | null;
  externalUrls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owners: CurrentUserProfile;
  public: boolean;
  snapshotId: string;
  tracks: {
    href: string;
    items: Track[];
    limit: number;
    next: string;
    offset: string;
    previous: string;
    total: number;
  };
  type: string;
  uri: string;
}
