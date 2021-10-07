import { BACKEND_URL } from '../constants/constants';

export const fetchBackend = (url: string, init?: RequestInit) =>
  fetch(`${BACKEND_URL}${url}`, {
    credentials: 'include',
    ...init,
  }).then((data) => data.json());
