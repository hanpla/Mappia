import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

import useToastStore from '@/stores/toastStore';

import { updateMe } from '@/lib/api/users';

import type { User } from '@/types/auth';
import type { UpdateMyInfoRequest } from '@/types/my-info';

export default function useUpdateMyInfo() {
  const queryClient = useQueryClient();
  const showToast = useToastStore((state) => state.showToast);

  return useMutation({
    mutationFn: (payload: UpdateMyInfoRequest) => updateMe(payload),
    onSuccess: (user: User) => {
      queryClient.setQueryData(['me'], user);
      showToast('success', '내 정보가 변경되었습니다.');
    },
    onError: (err) => {
      const message = isAxiosError<{ message?: string }>(err)
        ? err.response?.data?.message
        : undefined;
      showToast('error', message ?? '내 정보 변경에 실패했습니다.');
    },
  });
}
