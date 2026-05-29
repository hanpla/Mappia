import type { LoginResponse } from '@/types/auth';

import instance from './instance';

export function login(email: string, password: string) {
  return instance.post<LoginResponse>('/auth/login', { email, password });
}
