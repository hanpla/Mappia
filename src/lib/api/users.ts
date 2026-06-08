import type { User } from '@/types/auth';

import { privateInstance } from './instance';

export const getMe = async (): Promise<User> => {
  const { data } = await privateInstance.get<User>('/users/me');
  return data;
};
