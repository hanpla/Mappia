import type { LoginResponse, User } from '@/types/auth';

import { publicInstance } from './instance';

const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

export function login(email: string, password: string) {
  return publicInstance.post<LoginResponse>('/auth/login', { email, password });
}

export function signup(email: string, nickname: string, password: string) {
  return publicInstance.post<User>('/users', { email, nickname, password });
}

export function signInKakao(code: string) {
  return publicInstance.post<LoginResponse>('/oauth/sign-in/kakao', {
    redirectUri: KAKAO_REDIRECT_URI,
    token: code, // 백엔드가 인가 코드를 token 키로 받음
  });
}

export function signUpKakao(code: string, nickname: string) {
  return publicInstance.post<LoginResponse>('/oauth/sign-up/kakao', {
    nickname,
    redirectUri: KAKAO_REDIRECT_URI,
    token: code, // 백엔드가 인가 코드를 token 키로 받음
  });
}
