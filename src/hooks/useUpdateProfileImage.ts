import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

import useToastStore from '@/stores/toastStore';

import { updateMe, uploadProfileImage } from '@/lib/api/users';

import type { User } from '@/types/auth';

export default function useUpdateProfileImage() {
  const queryClient = useQueryClient();
  const showToast = useToastStore((state) => state.showToast);

  return useMutation({
    mutationFn: async (file: File) => {
      const profileImageUrl = await uploadProfileImage(file);
      return updateMe({ profileImageUrl });
    },
    onSuccess: (user: User) => {
      queryClient.setQueryData(['me'], user);
      showToast('success', '프로필 이미지가 변경되었습니다.');
    },
    onError: (err) => {
      const message = isAxiosError<{ message?: string }>(err)
        ? err.response?.data?.message
        : undefined;
      showToast('error', message ?? '프로필 이미지 변경에 실패했습니다.');
    },
  });
}
