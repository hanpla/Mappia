import type { LoginResponse, User } from '@/types/auth';

import { publicInstance } from './instance';

const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

export function login(email: string, password: string) {
  return publicInstance.post<LoginResponse>('/auth/login', { email, password });
}

export function signup(email: string, nickname: string, password: string) {
  return publicInstance.post<User>('/users', { email, nickname, password });
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
