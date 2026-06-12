import type { User } from '@/types/auth';
import type {
  ProfileImageUploadResponse,
  UpdateMyInfoRequest,
} from '@/types/my-info';

import { privateInstance } from './instance';

export const getMe = async (): Promise<User> => {
  const { data } = await privateInstance.get<User>('/users/me');
  return data;
};

export const updateMe = async (payload: UpdateMyInfoRequest): Promise<User> => {
  const { data } = await privateInstance.patch<User>('/users/me', payload);
  return data;
};

export const uploadProfileImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);

  const { data } = await privateInstance.post<ProfileImageUploadResponse>(
    '/users/me/image',
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );

  return data.profileImageUrl;
};
