import axios from 'axios';

import { useAuthStore } from '@/stores/authStore';

import type { TokensResponse } from '@/types/auth';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

instance.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// 여러 요청이 동시에 401을 받아도 토큰 갱신은 한 번만 실행하도록 Promise를 공유한다.
let refreshPromise: Promise<string> | null = null;

const refreshAccessToken = () => {
  const { accessToken, refreshToken, setTokens, clearAuth } =
    useAuthStore.getState();

  if (!refreshToken) {
    clearAuth();
    return Promise.reject(new Error('No refresh token'));
  }

  if (!refreshPromise) {
    refreshPromise = axios
      .post<TokensResponse>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/tokens`,
        { accessToken, refreshToken },
      )
      .then(({ data }) => {
        setTokens(data.accessToken, data.refreshToken);
        return data.accessToken;
      })
      .catch((err) => {
        if (
          axios.isAxiosError(err) &&
          err.response &&
          err.response.status >= 400 &&
          err.response.status < 500
        ) {
          clearAuth();
        }
        throw err;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
};

instance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (!original || error.response?.status !== 401 || original._retry) {
      return Promise.reject(error);
    }
    original._retry = true;

    const { accessToken } = useAuthStore.getState();
    const currentToken = accessToken ? `Bearer ${accessToken}` : null;

    if (currentToken && original.headers.Authorization !== currentToken) {
      original.headers.Authorization = currentToken;
      return instance(original);
    }
    try {
      const accessToken = await refreshAccessToken();
      original.headers.Authorization = `Bearer ${accessToken}`;
      return instance(original);
    } catch {
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  },
);

export default instance;
