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
  // 일부 삭제가 실패해도 나머지 요청을 끝까지 진행한 뒤, 실패 건이 있으면 에러를 던진다.
  const results = await Promise.allSettled(
    notificationIds.map((id) => deleteNotification(id)),
  );
  const failedCount = results.filter((r) => r.status === 'rejected').length;
  if (failedCount > 0) {
    throw new Error(`${failedCount}개의 알림 삭제에 실패했습니다.`);
  }
};
