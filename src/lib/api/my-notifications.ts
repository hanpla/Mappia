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

export const deleteAllNotifications = async (
  notificationIds: number[],
): Promise<void> => {
  await Promise.all(notificationIds.map((id) => deleteNotification(id)));
};
