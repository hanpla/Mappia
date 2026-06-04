import { create } from 'zustand';

import { clearKakaoOauthGuards } from '@/lib/utils/kakao';
import {
  clearTokenCookies,
  getAccessToken,
  getRefreshToken,
  setTokenCookies,
} from '@/lib/utils/token';

import type { LoginResponse } from '@/types/auth';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  setAuth: (authData: LoginResponse) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  accessToken: getAccessToken(),
  refreshToken: getRefreshToken(),
  setAuth: (authData) => {
    setTokenCookies(authData.accessToken, authData.refreshToken);
    set({
      accessToken: authData.accessToken,
      refreshToken: authData.refreshToken,
    });
  },
  clearAuth: () => {
    clearTokenCookies();
    clearKakaoOauthGuards();
    set({ accessToken: null, refreshToken: null });
  },
}));
