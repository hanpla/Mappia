import type { LoginResponse, User } from '@/types/auth';

import instance from './instance';

export function login(email: string, password: string) {
  return instance.post<LoginResponse>('/auth/login', { email, password });
}

export function signup(email: string, nickname: string, password: string) {
  return instance.post<User>('/users', { email, nickname, password });
}
