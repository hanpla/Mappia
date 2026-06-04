import type { LoginResponse, User } from '@/types/auth';

import { publicInstance } from './instance';

export function login(email: string, password: string) {
  return publicInstance.post<LoginResponse>('/auth/login', { email, password });
}

export function signup(email: string, nickname: string, password: string) {
  return publicInstance.post<User>('/users', { email, nickname, password });
}
