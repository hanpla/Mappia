import axios from 'axios';

import type { LoginResponse } from '@/types/auth';

import instance from './instance';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

export function login(email: string, password: string) {
  return instance.post<LoginResponse>('/auth/login', { email, password });
}

export function signInKakao(token: string) {
  return axios.post<LoginResponse>(`${BASE_URL}/oauth/sign-in/kakao`, {
    redirectUri: KAKAO_REDIRECT_URI,
    token,
  });
}

export function signUpKakao(token: string, nickname: string) {
  return axios.post<LoginResponse>(`${BASE_URL}/oauth/sign-up/kakao`, {
    nickname,
    redirectUri: KAKAO_REDIRECT_URI,
    token,
  });
}
