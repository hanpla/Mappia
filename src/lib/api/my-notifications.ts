import type { MyNotificationsContent } from '@/types/my-notifications';

import { privateInstance } from './instance';

export const getMyNotifications = async (): Promise<MyNotificationsContent> => {
  const { data } =
    await privateInstance.get<MyNotificationsContent>('/my-notifications');
  return data;
};

export const deleteNotification = async (
  notificationId: number,
): Promise<void> => {
  await privateInstance.delete(`/my-notifications/${notificationId}`);
};
