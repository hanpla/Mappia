'use server';

import { cookies } from 'next/headers';

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/lib/utils/token';

// 토큰 쿠키 쓰기/삭제는 서버(next/headers)에서 처리한다.
// 클라이언트에서 set/clear 시 서버가 Set-Cookie로 응답 → SSR(layout)이 즉시 인식한다.
// 읽기는 클라이언트(axios)·서버(layout) 양쪽에서 하므로 httpOnly는 false로 둔다.
const ACCESS_TOKEN_MAX_AGE = 60 * 60 * 24 * 7; // 7일
const REFRESH_TOKEN_MAX_AGE = 60 * 60 * 24 * 30; // 30일

const baseCookieOptions = {
  httpOnly: false, // 클라이언트 axios 인터셉터가 액세스 토큰을 읽어 헤더에 첨부함
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
};

export async function setAuthCookies(
  accessToken: string,
  refreshToken: string,
) {
  const cookieStore = await cookies();
  cookieStore.set(ACCESS_TOKEN_KEY, accessToken, {
    ...baseCookieOptions,
    maxAge: ACCESS_TOKEN_MAX_AGE,
  });
  cookieStore.set(REFRESH_TOKEN_KEY, refreshToken, {
    ...baseCookieOptions,
    maxAge: REFRESH_TOKEN_MAX_AGE,
  });
}

export async function clearAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.delete(ACCESS_TOKEN_KEY);
  cookieStore.delete(REFRESH_TOKEN_KEY);
}
