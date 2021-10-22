// Reference: https://developer.spotify.com/documentation/web-api/reference/#/operations/get-users-top-artists-and-tracks

export interface UserTopItems {
  href: string;
  items: [];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}
