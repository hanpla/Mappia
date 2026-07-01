import { type NextRequest, NextResponse } from 'next/server';

import { isAxiosError } from 'axios';

import { loginKakao, signupKakao } from '@/lib/api/auth';
import { getKakaoAuthUrl } from '@/lib/utils/kakao';
import {
  ACCESS_COOKIE_OPTIONS,
  ACCESS_TOKEN_KEY,
  ACCESS_TOKEN_MAX_AGE,
  REFRESH_COOKIE_OPTIONS,
  REFRESH_TOKEN_KEY,
  REFRESH_TOKEN_MAX_AGE,
} from '@/lib/utils/token';

import type { LoginResponse } from '@/types/auth';

const generateNickname = () =>
  `kakao${Math.random().toString(36).slice(2, 7).padEnd(5, '0')}`;

const redirectWithAuth = (request: NextRequest, data: LoginResponse) => {
  const response = NextResponse.redirect(new URL('/?login=kakao', request.url));
  response.cookies.set(ACCESS_TOKEN_KEY, data.accessToken, {
    ...ACCESS_COOKIE_OPTIONS,
    maxAge: ACCESS_TOKEN_MAX_AGE,
  });
  response.cookies.set(REFRESH_TOKEN_KEY, data.refreshToken, {
    ...REFRESH_COOKIE_OPTIONS,
    maxAge: REFRESH_TOKEN_MAX_AGE,
  });
  return response;
};

const redirectToLoginError = (request: NextRequest) =>
  NextResponse.redirect(new URL('/login?error=kakao', request.url));

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  if (!code) return redirectToLoginError(request);

  if (state === 'signup') {
    try {
      const { data } = await signupKakao(code, generateNickname());
      return redirectWithAuth(request, data);
    } catch {
      return redirectToLoginError(request);
    }
  }

  try {
    const { data } = await loginKakao(code);
    return redirectWithAuth(request, data);
  } catch (err) {
    const status = isAxiosError(err) ? err.response?.status : undefined;
    if (status === 404) {
      return NextResponse.redirect(getKakaoAuthUrl({ state: 'signup' }));
    }
    return redirectToLoginError(request);
  }
}
