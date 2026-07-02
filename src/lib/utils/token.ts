export const ACCESS_TOKEN_KEY = 'accessToken';
export const REFRESH_TOKEN_KEY = 'refreshToken';

// 쿠키 수명은 API가 발급하는 JWT 실제 만료와 일치시킨다.
export const ACCESS_TOKEN_MAX_AGE = 60 * 30; // 30분
export const REFRESH_TOKEN_MAX_AGE = 60 * 60 * 24 * 14; // 14일

const BASE_COOKIE_OPTIONS = {
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  httpOnly: true,
};

export const ACCESS_COOKIE_OPTIONS = {
  ...BASE_COOKIE_OPTIONS,
};

export const REFRESH_COOKIE_OPTIONS = {
  ...BASE_COOKIE_OPTIONS,
};
