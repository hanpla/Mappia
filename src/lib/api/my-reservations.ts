import axios from 'axios';

import { privateInstance } from '@/lib/api/instance';

import type { ReservationStatus } from '@/types/activities';
import type {
  CreateReviewContent,
  CreateReviewRequest,
  MyReservationsContent,
} from '@/types/my-reservations';

export interface GetMyReservationsParams {
  cursorId?: number | null;
  size?: number;
  status?: ReservationStatus;
}

// 내 예약 조회
export const getMyReservations = async (
  params?: GetMyReservationsParams,
): Promise<MyReservationsContent> => {
  const res = await privateInstance.get('/my-reservations', { params });
  return res.data;
};

// 리뷰 등록
export const createReview = async (
  reservationId: number,
  body: CreateReviewRequest,
): Promise<CreateReviewContent> => {
  const res = await privateInstance.post(
    `/my-reservations/${reservationId}/reviews`,
    body,
  );
  return res.data;
};

// 예약 취소
export const cancelReservation = async (
  reservationId: number,
): Promise<unknown> => {
  const res = await privateInstance.post(
    `/my-reservations/${reservationId}/cancel`,
  );

  return res.data;
};

// 내 예약 수정, 취소 추후 구현 예정
