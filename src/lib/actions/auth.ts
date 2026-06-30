'use server';

import { cookies } from 'next/headers';

import {
  ACCESS_COOKIE_OPTIONS,
  ACCESS_TOKEN_KEY,
  ACCESS_TOKEN_MAX_AGE,
  REFRESH_COOKIE_OPTIONS,
  REFRESH_TOKEN_KEY,
  REFRESH_TOKEN_MAX_AGE,
} from '@/lib/utils/token';

import type { LoginResponse, TokensResponse } from '@/types/auth';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const setAuthCookies = async (
  accessToken: string,
  refreshToken: string,
) => {
  const cookieStore = await cookies();
  cookieStore.set(ACCESS_TOKEN_KEY, accessToken, {
    ...ACCESS_COOKIE_OPTIONS,
    maxAge: ACCESS_TOKEN_MAX_AGE,
  });
  cookieStore.set(REFRESH_TOKEN_KEY, refreshToken, {
    ...REFRESH_COOKIE_OPTIONS,
    maxAge: REFRESH_TOKEN_MAX_AGE,
  });
};

export const clearAuthCookies = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(ACCESS_TOKEN_KEY);
  cookieStore.delete(REFRESH_TOKEN_KEY);
};

export type LoginResult = { ok: true } | { ok: false; message: string };

// 이메일 로그인을 서버에서 처리한다. 로그인 API를 호출해 받은 토큰을 곧바로 httpOnly
// 쿠키에 저장하고, 클라이언트에는 성공/실패만 반환한다. 덕분에 액세스/리프레시 토큰이
// 클라이언트 JS에 전혀 노출되지 않는다(카카오 OAuth 콜백과 동일한 보안 수준).
export const login = async (
  email: string,
  password: string,
): Promise<LoginResult> => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    cache: 'no-store',
  });

  if (!response.ok) {
    // 백엔드가 보낸 에러 message를 그대로 노출하되, 없으면 기본 메시지로 대체한다.
    const data = (await response.json().catch(() => null)) as {
      message?: string;
    } | null;
    return {
      ok: false,
      message: data?.message ?? '로그인에 실패했습니다. 정보를 확인해 주세요.',
    };
  }

  const data = (await response.json()) as LoginResponse;
  await setAuthCookies(data.accessToken, data.refreshToken);
  return { ok: true };
};

export const refreshTokens = async (): Promise<string | null> => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(REFRESH_TOKEN_KEY)?.value;

  if (!refreshToken) {
    await clearAuthCookies();
    throw new Error('No refresh token');
  }

  const response = await fetch(`${BASE_URL}/auth/tokens`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${refreshToken}` },
    cache: 'no-store',
  });

  if (!response.ok) {
    // 4xx(만료/무효): 쿠키를 정리하고 throw → 클라이언트 인터셉터가 로그인 페이지로 보낸다.
    if (response.status >= 400 && response.status < 500) {
      await clearAuthCookies();
      throw new Error('Failed to refresh token');
    }

    return null;
  }

  const data = (await response.json()) as TokensResponse;
  await setAuthCookies(data.accessToken, data.refreshToken);
  return data.accessToken;
};
