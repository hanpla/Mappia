import { useQuery } from '@tanstack/react-query';

import { getActivityDetail } from '@/lib/api/activities';

export const useActivityDetail = (activityId: number) =>
  useQuery({
    queryKey: ['activity', activityId],
    queryFn: () => getActivityDetail(activityId),
    enabled: Number.isFinite(activityId) && activityId > 0,
  });
