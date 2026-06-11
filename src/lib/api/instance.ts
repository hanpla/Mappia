import axios, { type InternalAxiosRequestConfig } from 'axios';

import { clearAuthCookies, setAuthCookies } from '@/lib/actions/auth';
import { getAccessToken, getRefreshToken } from '@/lib/utils/token';

import type { TokensResponse } from '@/types/auth';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const baseConfig = {
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
};

// 인증이 필요 없는 요청 (로그인 / 회원가입 / 토큰 갱신 등)
export const publicInstance = axios.create(baseConfig);

// 인증이 필요한 요청 (액세스 토큰 첨부 + 401 시 토큰 갱신)
export const privateInstance = axios.create(baseConfig);

privateInstance.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

let refreshPromise: Promise<string> | null = null;

const refreshAccessToken = () => {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    return clearAuthCookies().then(() => {
      throw new Error('No refresh token');
    });
  }

  if (!refreshPromise) {
    refreshPromise = axios
      .post<TokensResponse>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/tokens`,
        null,
        { headers: { Authorization: `Bearer ${refreshToken}` } },
      )
      .then(async ({ data }) => {
        await setAuthCookies(data.accessToken, data.refreshToken);
        return data.accessToken;
      })
      .catch(async (err) => {
        if (
          axios.isAxiosError(err) &&
          err.response &&
          err.response.status >= 400 &&
          err.response.status < 500
        ) {
          await clearAuthCookies();
        }
        throw err;
      })
      .finally(() => {
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

    const accessToken = getAccessToken();
    const currentToken = accessToken ? `Bearer ${accessToken}` : null;

    if (currentToken && original.headers.Authorization !== currentToken) {
      original.headers.Authorization = currentToken;
      return privateInstance(original);
    }
    try {
      const accessToken = await refreshAccessToken();
      original.headers.Authorization = `Bearer ${accessToken}`;
      return privateInstance(original);
    } catch {
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  },
);
