import type {
  ActivityDetailContent,
  ReservationContent,
} from '@/types/activities';
import type {
  ActivityReservationsResponse,
  MyActivitiesContent,
  ReservationDashboardItem,
} from '@/types/my-activities';

import { privateInstance } from './instance';

export interface GetMyActivitiesParams {
  cursorId?: number | null;
  size?: number;
}

export interface GetReservationsParams {
  cursorId?: number | null;
  size?: number;
  scheduleId?: number | null;
  status: 'pending' | 'confirmed' | 'declined';
}

export const getMyActivities = async (
  params?: GetMyActivitiesParams,
): Promise<MyActivitiesContent> => {
  const res = await privateInstance.get<MyActivitiesContent>('/my-activities', {
    params,
  });
  return res.data;
};

export const deleteMyActivity = async (activityId: number): Promise<void> => {
  await privateInstance.delete(`/my-activities/${activityId}`);
};

export const getReservationDashboard = async (
  activityId: number,
  year: string,
  month: string,
): Promise<ReservationDashboardItem[]> => {
  const res = await privateInstance.get<ReservationDashboardItem[]>(
    `/my-activities/${activityId}/reservation-dashboard`,
    {
      params: { year, month },
    },
  );
  return res.data;
};

export const getReservations = async (
  activityId: number,
  params: GetReservationsParams,
): Promise<ActivityReservationsResponse> => {
  const res = await privateInstance.get<ActivityReservationsResponse>(
    `/my-activities/${activityId}/reservations`,
    {
      params,
    },
  );
  return res.data;
};

export const updateReservationStatus = async (
  activityId: number,
  reservationId: number,
  status: 'confirmed' | 'declined',
): Promise<ReservationContent> => {
  const res = await privateInstance.patch<ReservationContent>(
    `/my-activities/${activityId}/reservations/${reservationId}`,
    { status },
  );
  return res.data;
};

export const getActivityDetail = async (
  activityId: number,
): Promise<ActivityDetailContent> => {
  const res = await privateInstance.get<ActivityDetailContent>(
    `/activities/${activityId}`,
  );
  return res.data;
};
