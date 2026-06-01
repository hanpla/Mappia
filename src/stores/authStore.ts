import Cookies from 'js-cookie';
import { create } from 'zustand';

import type { LoginResponse } from '@/types/auth';

const ACCESS_TOKEN_EXPIRES_DAYS = 7;
const REFRESH_TOKEN_EXPIRES_DAYS = 30;

const cookieOptions = (expires: number) => ({
  expires,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
});

const persistTokens = (accessToken: string, refreshToken: string) => {
  Cookies.set(
    'accessToken',
    accessToken,
    cookieOptions(ACCESS_TOKEN_EXPIRES_DAYS),
  );
  Cookies.set(
    'refreshToken',
    refreshToken,
    cookieOptions(REFRESH_TOKEN_EXPIRES_DAYS),
  );
};

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  setAuth: (authData: LoginResponse) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  accessToken: Cookies.get('accessToken') ?? null,
  refreshToken: Cookies.get('refreshToken') ?? null,
  setAuth: (authData) => {
    persistTokens(authData.accessToken, authData.refreshToken);
    set({
      accessToken: authData.accessToken,
      refreshToken: authData.refreshToken,
    });
  },
  setTokens: (accessToken, refreshToken) => {
    persistTokens(accessToken, refreshToken);
    set({ accessToken, refreshToken });
  },
  clearAuth: () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    set({ accessToken: null, refreshToken: null });
  },
}));
