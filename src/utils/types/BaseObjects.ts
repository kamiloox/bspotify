// Reference: https://developer.spotify.com/documentation/web-api/reference/#objects-index

export interface ExternalUrlObject {
  spotify: string;
}

export interface FollowersObject {
  href: null;
  total: number;
}

export interface ImageObject {
  height: number;
  width: number;
  url: string;
}

export interface ExplicitContentSettingsObject {
  filter_enabled: boolean;
  filter_locked: boolean;
}
