import type {
  ActivityCategory,
  ActivityDetailContent,
  ActivityListContent,
  ActivityReviewsContent,
  CreateActivityContent,
  CreateActivityRequest,
  CreateReservationRequest,
  ReservationContent,
  ScheduleWithTimes,
} from '@/types/activities';

import { privateInstance, publicInstance } from './instance';

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

// 체험 리스트 조회
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

// 활동 이미지 업로드
export const uploadActivityImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await privateInstance.post<{ activityImageUrl: string }>(
    '/activities/image',
    formData,
    {
      headers: { 'Content-Type': undefined },
    },
  );
  return response.data.activityImageUrl;
};

// 체험 등록
export const createActivity = async (
  body: CreateActivityRequest,
): Promise<CreateActivityContent> => {
  const response = await privateInstance.post<CreateActivityContent>(
    '/activities',
    body,
  );
  return response.data;
};
