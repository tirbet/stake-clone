import createClient from 'openapi-fetch';
import type { paths } from '@/lib/openapi';
import { API_URL, API_KEY } from './config';

export type ApiPaths = paths; // 👈 re-export type

export const apiClient = createClient<paths>({
  baseUrl: API_URL,
  headers: {
    'x-api-key': API_KEY,
  },
});

