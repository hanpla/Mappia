import Cookies from 'js-cookie';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { LoginResponse, User } from '@/types/auth';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  setAuth: (authData: LoginResponse) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      setAuth: (authData) => {
        Cookies.set('accessToken', authData.accessToken, { expires: 7 });
        Cookies.set('refreshToken', authData.refreshToken, { expires: 30 });
        set({
          user: authData.user,
          accessToken: authData.accessToken,
          refreshToken: authData.refreshToken,
        });
      },
      setTokens: (accessToken, refreshToken) => {
        Cookies.set('accessToken', accessToken, { expires: 7 });
        Cookies.set('refreshToken', refreshToken, { expires: 30 });
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
