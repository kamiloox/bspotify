// Reference: https://developer.spotify.com/documentation/web-api/reference/#/operations/get-track

import { Album } from './Album';
import { Arist } from './Artist';
import { ExternalIds, ExternalUrls, Restricions } from './BaseObjects';

export interface Track {
  album: Album;
  artists: Arist[];
  availableMarkets: string[];
  discNumber: number;
  durationMs: number;
  explicit: boolean;
  externalIds: ExternalIds;
  externalUrls: ExternalUrls;
  href: string;
  id: string;
  restrictions: Restricions;
  name: string;
  popularity: number;
  preview_url: string | null;
  type: 'track';
  uri: string;
  isLocal: boolean;
}
