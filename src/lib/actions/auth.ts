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

import type { TokensResponse } from '@/types/auth';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// 토큰 쿠키 쓰기/삭제/갱신은 서버(next/headers)에서 처리한다.
// 클라이언트에서 호출 시 서버가 Set-Cookie로 응답 → SSR(layout)이 즉시 인식한다.
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

// 리프레시 토큰이 httpOnly라 클라이언트가 직접 읽어 갱신할 수 없다. 대신 이 서버 액션이
// 쿠키에서 리프레시 토큰을 읽어 백엔드로 교환하고, 새 토큰을 쿠키에 심은 뒤 새 액세스
// 토큰만 반환한다. (axios privateInstance의 401 인터셉터에서 호출)
export const refreshTokens = async (): Promise<string> => {
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
    // 4xx(만료/무효)면 쿠키를 정리해 로그아웃 상태로 만든다.
    // 5xx(일시적 서버 오류)는 세션을 유지하고 다음 갱신 기회를 남긴다.
    if (response.status >= 400 && response.status < 500) {
      await clearAuthCookies();
    }
    throw new Error('Failed to refresh token');
  }

  const data = (await response.json()) as TokensResponse;
  await setAuthCookies(data.accessToken, data.refreshToken);
  return data.accessToken;
};
