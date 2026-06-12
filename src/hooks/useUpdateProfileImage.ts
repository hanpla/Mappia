import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

import useToastStore from '@/stores/toastStore';

import { updateMe, uploadProfileImage } from '@/lib/api/users';

import type { User } from '@/types/auth';

interface UpdateContext {
  previous?: User;
  blobUrl: string;
}

export default function useUpdateProfileImage() {
  const queryClient = useQueryClient();
  const showToast = useToastStore((state) => state.showToast);

  return useMutation<User, unknown, File, UpdateContext>({
    mutationFn: async (file) => {
      const profileImageUrl = await uploadProfileImage(file);
      return updateMe({ profileImageUrl });
    },
    // ['me'] 캐시를 단일 진실원천으로 써서 미리보기를 모든 인스턴스(+GNB)와 공유한다.
    // 로컬 previewSrc를 두지 않으므로 삭제/교체가 항상 동기화된다.
    onMutate: async (file) => {
      await queryClient.cancelQueries({ queryKey: ['me'] });
      const previous = queryClient.getQueryData<User>(['me']);
      const blobUrl = URL.createObjectURL(file);
      queryClient.setQueryData<User>(['me'], (old) =>
        old ? { ...old, profileImageUrl: blobUrl } : old,
      );
      return { previous, blobUrl };
    },
    onSuccess: (user) => {
      queryClient.setQueryData(['me'], user); // blob → 서버 URL 교체
      showToast('success', '프로필 이미지가 변경되었습니다.');
    },
    onError: (err, _file, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['me'], context.previous);
      }
      const message = isAxiosError<{ message?: string }>(err)
        ? err.response?.data?.message
        : undefined;
      showToast('error', message ?? '프로필 이미지 변경에 실패했습니다.');
    },
    onSettled: (_data, _err, _file, context) => {
      if (context?.blobUrl) URL.revokeObjectURL(context.blobUrl);
    },
  });
}
