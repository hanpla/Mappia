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
  try {
    const res = await privateInstance.get('/my-reservations', { params });
    return res.data;
  } catch (error: unknown) {
    let errorMessage = '내 예약 조회에 실패했습니다.';

    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    throw new Error(errorMessage);
  }
};

// 리뷰 등록
export const createReview = async (
  reservationId: number,
  body: CreateReviewRequest,
): Promise<CreateReviewContent> => {
  try {
    const res = await privateInstance.post(
      `/my-reservations/${reservationId}/reviews`,
      body,
    );
    return res.data;
  } catch (error: unknown) {
    let errorMessage = '리뷰 등록에 실패했습니다.';

    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    throw new Error(errorMessage);
  }
};

// 예약 취소
export const cancelReservation = async (
  reservationId: number,
): Promise<unknown> => {
  try {
    const res = await privateInstance.patch(
      `/my-reservations/${reservationId}`,
      {
        status: 'canceled',
      },
    );
    return res.data;
  } catch (error: unknown) {
    let errorMessage = '예약 취소에 실패했습니다.';

    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    throw new Error(errorMessage);
  }
};

// 내 예약 수정, 취소 추후 구현 예정
