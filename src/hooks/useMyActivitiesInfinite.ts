import { useInfiniteQuery } from '@tanstack/react-query';

import { getMyActivities } from '@/lib/api/my-activities';

export function useMyActivitiesInfinite() {
  return useInfiniteQuery({
    queryKey: ['my-activities'],
    queryFn: ({ pageParam }) =>
      getMyActivities({ cursorId: pageParam, size: 6 }),
    initialPageParam: null as number | null,
    getNextPageParam: (lastPage) => lastPage.cursorId ?? undefined,
    staleTime: 1000 * 60, // 1분 동안 fresh 상태 유지 (중복 페칭 방지)
  });
}
