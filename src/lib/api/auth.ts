import instance from './instance';

export function login(email: string, password: string) {
  return instance.post('/auth/login', { email, password });
}
