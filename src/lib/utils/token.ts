import Cookies from 'js-cookie';

// 토큰 쿠키 입출력을 한곳에 모은다. authStore와 axios instance가 공유한다.
const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const ACCESS_TOKEN_EXPIRES_DAYS = 7;
const REFRESH_TOKEN_EXPIRES_DAYS = 30;

const cookieOptions = (expires: number) => ({
  expires,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
});

export const getAccessToken = () => Cookies.get(ACCESS_TOKEN_KEY) ?? null;
export const getRefreshToken = () => Cookies.get(REFRESH_TOKEN_KEY) ?? null;

export const setTokenCookies = (accessToken: string, refreshToken: string) => {
  Cookies.set(
    ACCESS_TOKEN_KEY,
    accessToken,
    cookieOptions(ACCESS_TOKEN_EXPIRES_DAYS),
  );
  Cookies.set(
    REFRESH_TOKEN_KEY,
    refreshToken,
    cookieOptions(REFRESH_TOKEN_EXPIRES_DAYS),
  );
};

export const clearTokenCookies = () => {
  Cookies.remove(ACCESS_TOKEN_KEY);
  Cookies.remove(REFRESH_TOKEN_KEY);
};
