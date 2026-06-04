import type { MyActivitiesContent } from '@/types/my-activities';

import { privateInstance } from './instance';

export interface GetMyActivitiesParams {
  cursorId?: number | null;
  size?: number;
}

export const getMyActivities = async (
  params?: GetMyActivitiesParams,
): Promise<MyActivitiesContent> => {
  const response = await privateInstance.get<MyActivitiesContent>(
    '/my-activities',
    {
      params,
    },
  );
  return response.data;
};

export const deleteMyActivity = async (activityId: number): Promise<void> => {
  await privateInstance.delete(`/my-activities/${activityId}`);
};
