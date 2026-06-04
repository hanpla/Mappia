'use server';

import { cookies } from 'next/headers';

import {
  ACCESS_TOKEN_KEY,
  ACCESS_TOKEN_MAX_AGE,
  AUTH_COOKIE_OPTIONS,
  REFRESH_TOKEN_KEY,
  REFRESH_TOKEN_MAX_AGE,
} from '@/lib/utils/token';

// 토큰 쿠키 쓰기/삭제는 서버(next/headers)에서 처리한다.
// 클라이언트에서 호출 시 서버가 Set-Cookie로 응답 → SSR(layout)이 즉시 인식한다.
export async function setAuthCookies(
  accessToken: string,
  refreshToken: string,
) {
  const cookieStore = await cookies();
  cookieStore.set(ACCESS_TOKEN_KEY, accessToken, {
    ...AUTH_COOKIE_OPTIONS,
    maxAge: ACCESS_TOKEN_MAX_AGE,
  });
  cookieStore.set(REFRESH_TOKEN_KEY, refreshToken, {
    ...AUTH_COOKIE_OPTIONS,
    maxAge: REFRESH_TOKEN_MAX_AGE,
  });
}

export async function clearAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.delete(ACCESS_TOKEN_KEY);
  cookieStore.delete(REFRESH_TOKEN_KEY);
}
