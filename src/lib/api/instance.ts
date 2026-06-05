import axios, { type InternalAxiosRequestConfig } from 'axios';

import { clearKakaoOauthGuards } from '@/lib/utils/kakao';
import {
  clearTokenCookies,
  getAccessToken,
  getRefreshToken,
  setTokenCookies,
} from '@/lib/utils/token';

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

// 강제 로그아웃: 토큰 쿠키 + 카카오 OAuth 가드 정리.
// (스토어 인메모리 상태는 이후 /login 전체 새로고침에서 쿠키 기준으로 재초기화된다.)
const clearSession = () => {
  clearTokenCookies();
  clearKakaoOauthGuards();
};

privateInstance.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// 여러 요청이 동시에 401을 받아도 토큰 갱신은 한 번만 실행하도록 Promise를 공유한다.
let refreshPromise: Promise<string> | null = null;

const refreshAccessToken = () => {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    clearSession();
    return Promise.reject(new Error('No refresh token'));
  }

  if (!refreshPromise) {
    refreshPromise = axios
      .post<TokensResponse>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/tokens`,
        { accessToken, refreshToken },
      )
      .then(({ data }) => {
        setTokenCookies(data.accessToken, data.refreshToken);
        return data.accessToken;
      })
      .catch((err) => {
        if (
          axios.isAxiosError(err) &&
          err.response &&
          err.response.status >= 400 &&
          err.response.status < 500
        ) {
          clearSession();
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
