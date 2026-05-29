import Cookies from 'js-cookie';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      setAuth: (authData) => {
        Cookies.set('accessToken', authData.accessToken, {
          expires: ACCESS_TOKEN_EXPIRES_DAYS,
        });
        Cookies.set('refreshToken', authData.refreshToken, {
          expires: REFRESH_TOKEN_EXPIRES_DAYS,
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
        });
        Cookies.set('refreshToken', refreshToken, {
          expires: REFRESH_TOKEN_EXPIRES_DAYS,
        });
        set({ accessToken, refreshToken });
      },
      clearAuth: () => {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        set({ user: null, accessToken: null, refreshToken: null });
        useAuthStore.persist.clearStorage();
      },
    }),
    { name: 'auth-storage' },
  ),
);
