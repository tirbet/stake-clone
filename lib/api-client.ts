import createClient from 'openapi-fetch';
import type { paths } from '@/lib/openapi';

export type ApiPaths = paths; // 👈 re-export type

export const apiClient = createClient<paths>({
  baseUrl: 'https://api.tirbet.online',
  headers: {
    'x-api-key': "hello",
  },
});

