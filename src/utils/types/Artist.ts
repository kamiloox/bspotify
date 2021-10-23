// Reference: https://developer.spotify.com/documentation/web-api/reference/#/operations/get-an-artist

import { ExternalUrls, Followers, Genre, Image } from './BaseObjects';

export interface Artist {
  externalUrls: ExternalUrls;
  followers: Followers;
  genres: Genre[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: 'artist';
  uri: string;
}
