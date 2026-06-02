import axios, { type InternalAxiosRequestConfig } from 'axios';

import { useAuthStore } from '@/stores/authStore';

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
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token!)));
  failedQueue = [];
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

    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          original.headers.Authorization = `Bearer ${token}`;
          return privateInstance(original);
        })
        .catch((err) => Promise.reject(err));
    }

    original._retry = true;
    isRefreshing = true;

    const { accessToken, refreshToken, setTokens, clearAuth } =
      useAuthStore.getState();

    if (!refreshToken) {
      clearAuth();
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }

    try {
      const { data } = await publicInstance.post<TokensResponse>(
        '/auth/tokens',
        { accessToken, refreshToken },
      );
      setTokens(data.accessToken, data.refreshToken);
      processQueue(null, data.accessToken);
      original.headers.Authorization = `Bearer ${data.accessToken}`;
      return privateInstance(original);
    } catch (err) {
      processQueue(err, null);
      clearAuth();
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  },
);
