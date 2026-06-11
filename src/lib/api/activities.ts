import {
  ActivityDetailContent,
  ActivityReviewsContent,
  CreateReservationRequest,
  ReservationContent,
  ScheduleWithTimes,
} from '@/types/activities';

import { privateInstance, publicInstance } from './instance';

// 체험 상세 조회
export const getActivityDetail = async (
  activityId: number,
): Promise<ActivityDetailContent> => {
  const response = await publicInstance.get<ActivityDetailContent>(
    `/activities/${activityId}`,
  );
  return response.data;
};

// 체험 리뷰 조회
export const getActivityReviews = async (
  activityId: number,
  page: number = 1,
  size: number = 3,
): Promise<ActivityReviewsContent> => {
  const response = await publicInstance.get<ActivityReviewsContent>(
    `/activities/${activityId}/reviews`,
    {
      params: { page, size },
    },
  );
  return response.data;
};

// 체험 예약 가능일 조회
export const getAvailableSchedules = async (
  activityId: number,
  year: string,
  month: string,
): Promise<ScheduleWithTimes[]> => {
  const response = await publicInstance.get<ScheduleWithTimes[]>(
    `/activities/${activityId}/available-schedule`,
    {
      params: {
        year,
        month,
      },
    },
  );
  return response.data;
};

// 체험 예약 신청
export const createReservation = async (
  activityId: number,
  data: CreateReservationRequest,
): Promise<ReservationContent> => {
  const response = await privateInstance.post<ReservationContent>(
    `/activities/${activityId}/reservations`,
    data,
  );
  return response.data;
};
