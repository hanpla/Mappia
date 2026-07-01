import type { LoginResponse, User } from '@/types/auth';

import { publicInstance } from './instance';

const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

export const signup = (email: string, nickname: string, password: string) => {
  return publicInstance.post<User>('/users', { email, nickname, password });
};

export const loginKakao = (code: string) => {
  return publicInstance.post<LoginResponse>('/oauth/sign-in/kakao', {
    redirectUri: KAKAO_REDIRECT_URI,
    token: code,
  });
};

export const signupKakao = (code: string, nickname: string) => {
  return publicInstance.post<LoginResponse>('/oauth/sign-up/kakao', {
    nickname,
    redirectUri: KAKAO_REDIRECT_URI,
    token: code,
  });
};
