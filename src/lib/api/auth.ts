import type { LoginResponse } from '@/types/auth';

import instance from './instance';

const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

export function login(email: string, password: string) {
  return instance.post<LoginResponse>('/auth/login', { email, password });
}

export function signInKakao(token: string) {
  return instance.post<LoginResponse>('/oauth/sign-in/kakao', {
    redirectUri: KAKAO_REDIRECT_URI,
    token,
  });
}

export function signUpKakao(token: string, nickname: string) {
  return instance.post<LoginResponse>('/oauth/sign-up/kakao', {
    nickname,
    redirectUri: KAKAO_REDIRECT_URI,
    token,
  });
}
