// 토큰 쿠키 설정값과, 클라이언트(axios 인터셉터)에서 액세스 토큰을 읽는 헬퍼.
// 쿠키 쓰기/삭제/갱신은 서버에서 처리한다:
//   - 클라이언트 발화(이메일 로그인/로그아웃, 토큰 갱신): @/lib/actions/auth (서버 액션)
//   - 카카오 OAuth 콜백: src/app/(auth)/oauth/kakao/route.ts (Route Handler)
export const ACCESS_TOKEN_KEY = 'accessToken';
export const REFRESH_TOKEN_KEY = 'refreshToken';

// 쿠키 수명은 API가 발급하는 JWT 실제 만료와 일치시킨다.
export const ACCESS_TOKEN_MAX_AGE = 60 * 30; // 30분
export const REFRESH_TOKEN_MAX_AGE = 60 * 60 * 24 * 14; // 14일

const BASE_COOKIE_OPTIONS = {
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
};

// 액세스 토큰(30분): 클라이언트 axios 인터셉터가 읽어 Authorization 헤더에 첨부하므로
// httpOnly를 걸 수 없다. 수명이 짧아 노출 시 피해 범위가 제한적이다.
export const ACCESS_COOKIE_OPTIONS = {
  ...BASE_COOKIE_OPTIONS,
  httpOnly: false,
};

// 리프레시 토큰(14일): JS로 노출되면 장기 계정 탈취로 이어지므로 httpOnly로 차단한다.
// 토큰 갱신은 서버(서버 액션/Route Handler)가 쿠키를 직접 읽어 처리한다.
export const REFRESH_COOKIE_OPTIONS = {
  ...BASE_COOKIE_OPTIONS,
  httpOnly: true,
};

// 브라우저의 document.cookie에서 액세스 토큰을 읽는다. 서버(SSR)에서는 document가 없으므로
// null을 반환한다. (서버는 next/headers cookies()로 직접 읽는다.)
// 리프레시 토큰은 httpOnly라 클라이언트에서 읽을 수 없다.
const readCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
};

export const getAccessToken = () => readCookie(ACCESS_TOKEN_KEY);
