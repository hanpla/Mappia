import axios, { type InternalAxiosRequestConfig } from 'axios';

import { refreshTokens } from '@/lib/actions/auth';
import { buildLoginUrl } from '@/lib/utils/redirect';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const baseConfig = {
  headers: { 'Content-Type': 'application/json' },
};

export const publicInstance = axios.create({
  ...baseConfig,
  baseURL: BASE_URL,
});

export const privateInstance = axios.create({ ...baseConfig, baseURL: '/api' });

let refreshPromise: Promise<string | null> | null = null;

const refreshAccessToken = () => {
  if (!refreshPromise) {
    refreshPromise = refreshTokens().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
};

privateInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;

    if (!original || error.response?.status !== 401 || original._retry) {
      return Promise.reject(error);
    }
    original._retry = true;

    try {
      const refreshedToken = await refreshAccessToken();
      if (refreshedToken === null) {
        return Promise.reject(error);
      }

      return privateInstance(original);
    } catch {
      if (typeof window !== 'undefined') {
        window.location.href = buildLoginUrl(
          window.location.pathname + window.location.search,
        );
      }
      return Promise.reject(error);
    }
  },
);
