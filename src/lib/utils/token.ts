// 토큰 쿠키 설정값. 쿠키 쓰기/삭제/갱신과 액세스 토큰 첨부는 모두 서버에서 처리한다:
//   - 클라이언트 발화(이메일 로그인/로그아웃, 토큰 갱신): @/lib/actions/auth (서버 액션)
//   - 카카오 OAuth 콜백: src/app/(auth)/oauth/kakao/route.ts (Route Handler)
//   - 인증 요청 프록시(Authorization 주입): src/app/api/[...path]/route.ts (Route Handler)
export const ACCESS_TOKEN_KEY = 'accessToken';
export const REFRESH_TOKEN_KEY = 'refreshToken';

// 쿠키 수명은 API가 발급하는 JWT 실제 만료와 일치시킨다.
export const ACCESS_TOKEN_MAX_AGE = 60 * 30; // 30분
export const REFRESH_TOKEN_MAX_AGE = 60 * 60 * 24 * 14; // 14일

// 두 토큰 모두 httpOnly로 차단한다. 브라우저는 동일 출처 프록시(/api)로 요청을 보내고
// 서버(프록시/서버 액션)가 쿠키를 직접 읽어 토큰을 다루므로, 클라이언트 JS가 토큰을
// 읽을 일이 없다. → XSS 발생 시에도 토큰 탈취를 막는다.
const BASE_COOKIE_OPTIONS = {
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  httpOnly: true,
};

// 액세스 토큰(30분): 프록시가 쿠키에서 읽어 Authorization 헤더에 주입한다.
export const ACCESS_COOKIE_OPTIONS = {
  ...BASE_COOKIE_OPTIONS,
};

// 리프레시 토큰(14일): 토큰 갱신은 서버(서버 액션/Route Handler)가 쿠키를 직접 읽어 처리한다.
export const REFRESH_COOKIE_OPTIONS = {
  ...BASE_COOKIE_OPTIONS,
};
