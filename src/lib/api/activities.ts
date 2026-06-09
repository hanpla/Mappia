import type {
  ActivityCategory,
  ActivityListContent,
  GetActivitiesResponse,
} from '@/types/activities';

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

  const { data } = await publicInstance.get<GetActivitiesResponse>(
    '/activities',
    { params: { method, ...rest } },
  );

  if (!data.success || !data.data) {
    throw new Error(data.message || '체험 목록을 불러오지 못했습니다.');
  }

  return data.data;
};
