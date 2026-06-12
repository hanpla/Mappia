import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

import useToastStore from '@/stores/toastStore';

import { updateMe } from '@/lib/api/users';

import type { User } from '@/types/auth';

interface DeleteContext {
  previous?: User;
}

export default function useDeleteProfileImage() {
  const queryClient = useQueryClient();
  const showToast = useToastStore((state) => state.showToast);

  return useMutation<User, unknown, void, DeleteContext>({
    mutationFn: () => updateMe({ profileImageUrl: null }),
    // 업로드와 동일하게 ['me'] 캐시를 즉시 비워 모든 인스턴스(+GNB)에 바로 반영한다.
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['me'] });
      const previous = queryClient.getQueryData<User>(['me']);
      queryClient.setQueryData<User>(['me'], (old) =>
        old ? { ...old, profileImageUrl: '' } : old,
      );
      return { previous };
    },
    onSuccess: (user) => {
      queryClient.setQueryData(['me'], user);
      showToast('success', '프로필 이미지가 삭제되었습니다.');
    },
    onError: (err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['me'], context.previous);
      }
      const message = isAxiosError<{ message?: string }>(err)
        ? err.response?.data?.message
        : undefined;
      showToast('error', message ?? '프로필 이미지 삭제에 실패했습니다.');
    },
  });
}
