// Reference: https://developer.spotify.com/documentation/web-api/reference/#category-users-profile

import {
  ExplicitContentSettingsObject,
  ExternalUrlObject,
  FollowersObject,
  ImageObject,
} from './BaseObjects';

export interface PublicUserObject {
  display_name: string | null;
  external_urls: ExternalUrlObject;
  followers: FollowersObject;
  href: string;
  id: string;
  images: ImageObject[];
  type: string;
  uri: string;
}

export interface PrivateUserObject extends PublicUserObject {
  country: string;
  email: string;
  explicit_content: ExplicitContentSettingsObject;
  product: string;
}
