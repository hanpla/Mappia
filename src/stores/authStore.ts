import Cookies from 'js-cookie';
import { create } from 'zustand';

import type { LoginResponse, User } from '@/types/auth';

const ACCESS_TOKEN_EXPIRES_DAYS = 7;
const REFRESH_TOKEN_EXPIRES_DAYS = 30;

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  setAuth: (authData: LoginResponse) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  setUser: (user: User) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  accessToken: Cookies.get('accessToken') ?? null,
  refreshToken: Cookies.get('refreshToken') ?? null,
  setAuth: (authData) => {
    Cookies.set('accessToken', authData.accessToken, {
      expires: ACCESS_TOKEN_EXPIRES_DAYS,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
    Cookies.set('refreshToken', authData.refreshToken, {
      expires: REFRESH_TOKEN_EXPIRES_DAYS,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
    set({
      user: authData.user,
      accessToken: authData.accessToken,
      refreshToken: authData.refreshToken,
    });
  },
  setUser: (user) => set({ user }),
  setTokens: (accessToken, refreshToken) => {
    Cookies.set('accessToken', accessToken, {
      expires: ACCESS_TOKEN_EXPIRES_DAYS,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
    Cookies.set('refreshToken', refreshToken, {
      expires: REFRESH_TOKEN_EXPIRES_DAYS,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
    set({ accessToken, refreshToken });
  },
  clearAuth: () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    set({ user: null, accessToken: null, refreshToken: null });
  },
}));
