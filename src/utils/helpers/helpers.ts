import { BACKEND_URL } from '../constants/constants';
import routes from '../routes/routes';

export const fetchBackend = (url: string, init?: RequestInit) =>
  fetch(`${BACKEND_URL}${url}`, {
    credentials: 'include',
    ...init,
  }).then((data) => data.json());

// Function copied from https://stackoverflow.com/a/47201559
export const hexToRGB = (hex: string, alpha: string | number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  if (alpha) return `rgba(${r}, ${g}, ${b}, ${alpha})`;

  return `rgb(${r}, ${g}, ${b})`;
};

export const randomInteger = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const isRoutePublic = (path: string): boolean => {
  const key = Object.keys(routes).find((key) => {
    if (routes[key as keyof typeof routes]?.path === path) return true;
    return false;
  });
  if (routes[key as keyof typeof routes]?.public || !routes[key as keyof typeof routes]) return true;
  return false;
};

export const spotifyToBackendUrl = (argUrl: string | null) => {
  if (!argUrl) return null;
  const url = new URL(argUrl);
  let newUrl = '';
  if (url.host.includes('spotify')) {
    newUrl = `/api${url.pathname.substring('/v1'.length)}${url.search}`;
  }
  return newUrl;
};
