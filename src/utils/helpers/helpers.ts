import { BACKEND_URL } from '../constants/constants';

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
