import Cookies from 'js-cookie';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { User } from '@/types/auth';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
}

interface AuthActions {
  setAuth: (user: User, accessToken: string, refreshToken: string) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isLoggedIn: false,
      setAuth: (user, accessToken, refreshToken) => {
        Cookies.set('accessToken', accessToken, { expires: 7 });
        set({ user, accessToken, refreshToken, isLoggedIn: true });
      },
      setTokens: (accessToken, refreshToken) => {
        Cookies.set('accessToken', accessToken, { expires: 7 });
        set({ accessToken, refreshToken });
      },
      clearAuth: () => {
        Cookies.remove('accessToken');
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isLoggedIn: false,
        });
      },
    }),
    { name: 'auth' },
  ),
);
