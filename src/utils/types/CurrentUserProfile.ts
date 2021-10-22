// Reference: https://developer.spotify.com/documentation/web-api/reference/#/operations/get-current-users-profile

import { ExplicitContent, ExternalUrls, Followers, Image } from './BaseObjects';

export interface CurrentUserProfile {
  country: string;
  displayName: string | null;
  email: string;
  explicitContent: ExplicitContent;
  externalUrls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  images: Image[];
  product: string;
  type: string;
  uri: string;
}
