export interface ExternalUrls {
  spotify: string;
}

export interface Followers {
  href: null;
  total: number;
}

export interface Image {
  height: number;
  width: number;
  url: string;
}

export interface ExplicitContent {
  filter_enabled: boolean;
  filter_locked: boolean;
}

export interface Restricions {
  reason: 'market' | 'product' | 'explicit';
}

export interface ExternalIds {
  isrc: string;
  ean: string;
  upc: string;
}

export type Genre = string;
