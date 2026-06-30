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

// 카카오 OAuth 콜백을 서버에서 처리한다(Route Handler). 1회용 인가코드를 서버↔백엔드로만
// 교환하므로 클라 JS에 노출되지 않고, GET 핸들러는 요청당 1회 실행이라 기존 클라이언트
// 방식의 StrictMode 이중 호출 가드(sessionStorage)가 필요 없다.

// 인가코드가 1회용이라 가입 단계에서 닉네임을 입력받을 수 없어 자동 생성한다.
// (추후 닉네임 입력 UI로 대체 권장)
const generateNickname = () =>
  `kakao${Math.random().toString(36).slice(2, 7).padEnd(5, '0')}`;

// 토큰 쿠키를 응답에 실어 홈으로 리다이렉트한다. Route Handler에서는 next/headers 대신
// NextResponse에 직접 쿠키를 설정해야 리다이렉트 응답의 Set-Cookie에 안정적으로 실린다.
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

  // 가입 의도로 재인증되어 돌아온 경우: 새 인가코드로 회원가입
  if (state === 'signup') {
    try {
      const { data } = await signupKakao(code, generateNickname());
      return redirectWithAuth(request, data);
    } catch {
      return redirectToLoginError(request);
    }
  }

  // 기본: 로그인 시도
  try {
    const { data } = await loginKakao(code);
    return redirectWithAuth(request, data);
  } catch (err) {
    // 404(미가입)일 때만 가입용으로 재인증(새 코드 발급). 그 외 오류는 로그인 페이지로.
    const status = isAxiosError(err) ? err.response?.status : undefined;
    if (status === 404) {
      return NextResponse.redirect(getKakaoAuthUrl({ state: 'signup' }));
    }
    return redirectToLoginError(request);
  }
}
