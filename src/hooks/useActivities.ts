import { useQuery } from '@tanstack/react-query';

import { type GetActivitiesParams, getActivities } from '@/lib/api/activities';

export const useActivities = (params: GetActivitiesParams) =>
  useQuery({
    queryKey: ['activities', params],
    queryFn: () => getActivities(params),
    placeholderData: (previous) => previous,
  });

export const usePopularActivities = (size = 10) =>
  useQuery({
    queryKey: ['activities', 'popular', size],
    queryFn: () =>
      getActivities({ method: 'cursor', sort: 'most_reviewed', size }),
    staleTime: 1000 * 60 * 5,
  });
