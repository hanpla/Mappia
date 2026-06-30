import axios, { type InternalAxiosRequestConfig } from 'axios';

import { refreshTokens } from '@/lib/actions/auth';
import { buildLoginUrl } from '@/lib/utils/redirect';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const baseConfig = {
  headers: { 'Content-Type': 'application/json' },
};

// 인증이 필요 없는 요청(로그인 / 회원가입 / 토큰 갱신 등)은 외부 API로 직접 보낸다.
export const publicInstance = axios.create({
  ...baseConfig,
  baseURL: BASE_URL,
});

// 인증이 필요한 요청은 동일 출처 프록시(/api)를 거친다. 브라우저가 httpOnly accessToken
// 쿠키를 자동 전송하고, 프록시(src/app/api/[...path]/route.ts)가 Authorization을 주입한다.
// 토큰이 httpOnly라 클라이언트에서 직접 읽어 헤더에 붙일 수 없으므로 요청 인터셉터는 없다.
export const privateInstance = axios.create({ ...baseConfig, baseURL: '/api' });

let refreshPromise: Promise<string | null> | null = null;

const refreshAccessToken = () => {
  if (!refreshPromise) {
    refreshPromise = refreshTokens().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
};

privateInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;

    if (!original || error.response?.status !== 401 || original._retry) {
      return Promise.reject(error);
    }
    original._retry = true;

    try {
      const refreshedToken = await refreshAccessToken();
      if (refreshedToken === null) {
        return Promise.reject(error);
      }
      // 갱신된 accessToken은 httpOnly 쿠키에 저장됐다. 재요청 시 프록시가 쿠키에서 읽어
      // Authorization을 다시 주입하므로, 클라이언트가 헤더를 직접 설정할 필요가 없다.
      return privateInstance(original);
    } catch {
      if (typeof window !== 'undefined') {
        window.location.href = buildLoginUrl(
          window.location.pathname + window.location.search,
        );
      }
      return Promise.reject(error);
    }
  },
);
