// Reference: https://developer.spotify.com/documentation/web-api/reference/#/operations/get-an-album

import { Arist } from './Artist';
import { ExternalUrls, Image, Restricions } from './BaseObjects';
import { Track } from './Track';

export interface Album {
  albumType: 'album' | 'single' | 'compilation';
  totalTracks: number;
  availableMarkets: string[];
  externalUrls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  releaseDate: string;
  releaseDatePrecision: 'year' | 'month' | 'day';
  restrictions: Restricions;
  type: 'album';
  uri: string;
  artists: Arist[];
  tracks: Track[];
}
