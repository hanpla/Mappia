'use server';

import { cookies } from 'next/headers';

import {
  ACCESS_COOKIE_OPTIONS,
  ACCESS_TOKEN_KEY,
  ACCESS_TOKEN_MAX_AGE,
  REFRESH_COOKIE_OPTIONS,
  REFRESH_TOKEN_KEY,
  REFRESH_TOKEN_MAX_AGE,
} from '@/lib/utils/token';

import type { LoginResponse, TokensResponse } from '@/types/auth';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const setAuthCookies = async (
  accessToken: string,
  refreshToken: string,
) => {
  const cookieStore = await cookies();
  cookieStore.set(ACCESS_TOKEN_KEY, accessToken, {
    ...ACCESS_COOKIE_OPTIONS,
    maxAge: ACCESS_TOKEN_MAX_AGE,
  });
  cookieStore.set(REFRESH_TOKEN_KEY, refreshToken, {
    ...REFRESH_COOKIE_OPTIONS,
    maxAge: REFRESH_TOKEN_MAX_AGE,
  });
};

export const clearAuthCookies = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(ACCESS_TOKEN_KEY);
  cookieStore.delete(REFRESH_TOKEN_KEY);
};

export type LoginResult = { ok: true } | { ok: false; message: string };

export const login = async (
  email: string,
  password: string,
): Promise<LoginResult> => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    cache: 'no-store',
  });

  if (!response.ok) {
    const data = (await response.json().catch(() => null)) as {
      message?: string;
    } | null;
    return {
      ok: false,
      message: data?.message ?? '로그인에 실패했습니다. 정보를 확인해 주세요.',
    };
  }

  const data = (await response
    .json()
    .catch(() => null)) as LoginResponse | null;
  if (!data?.accessToken || !data?.refreshToken) {
    return {
      ok: false,
      message: '로그인에 실패했습니다. 잠시 후 다시 시도해 주세요.',
    };
  }
  await setAuthCookies(data.accessToken, data.refreshToken);
  return { ok: true };
};

export const refreshTokens = async (): Promise<string | null> => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(REFRESH_TOKEN_KEY)?.value;

  if (!refreshToken) {
    await clearAuthCookies();
    throw new Error('No refresh token');
  }

  const response = await fetch(`${BASE_URL}/auth/tokens`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${refreshToken}` },
    cache: 'no-store',
  });

  if (!response.ok) {
    if (response.status >= 400 && response.status < 500) {
      await clearAuthCookies();
      throw new Error('Failed to refresh token');
    }

    return null;
  }

  const data = (await response.json()) as TokensResponse;
  await setAuthCookies(data.accessToken, data.refreshToken);
  return data.accessToken;
};
