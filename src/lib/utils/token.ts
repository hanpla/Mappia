// 토큰 쿠키 키 상수와, 클라이언트(axios 인터셉터)에서 토큰을 읽는 헬퍼.
// 쿠키 쓰기/삭제는 서버(next/headers)에서 처리한다 → @/lib/actions/auth
export const ACCESS_TOKEN_KEY = 'accessToken';
export const REFRESH_TOKEN_KEY = 'refreshToken';

// 브라우저의 document.cookie에서 값을 읽는다. 서버(SSR)에서는 document가 없으므로
// null을 반환한다. (서버는 next/headers cookies()로 직접 읽는다.)
const readCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
};

export const getAccessToken = () => readCookie(ACCESS_TOKEN_KEY);
export const getRefreshToken = () => readCookie(REFRESH_TOKEN_KEY);
