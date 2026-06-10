import type { ActivityCategory, ActivityListContent } from '@/types/activities';

import { publicInstance } from './instance';

export type ActivitySort =
  | 'latest'
  | 'most_reviewed'
  | 'price_asc'
  | 'price_desc';

export interface GetActivitiesParams {
  method?: 'offset' | 'cursor';
  page?: number;
  size?: number;
  category?: ActivityCategory;
  keyword?: string;
  sort?: ActivitySort;
}

export const getActivities = async (
  params: GetActivitiesParams = {},
): Promise<ActivityListContent> => {
  const { method = 'offset', ...rest } = params;

  const { data } = await publicInstance.get<ActivityListContent>(
    '/activities',
    { params: { method, ...rest } },
  );

  return data;
};
