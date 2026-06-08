'use server';

import { cookies } from 'next/headers';

import axios from 'axios';

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

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const getAccessToken = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  if (!token) {
    throw new Error('로그인이 필요합니다.');
  }

  return token;
};

// 1. 내 예약 리스트 조회
export const getMyReservations = async (
  params?: GetMyReservationsParams,
): Promise<MyReservationsContent> => {
  try {
    const accessToken = await getAccessToken();

    const res = await axios.get(`${BASE_URL}/my-reservations`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      params,
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
  return {
    cursorId: null,
    totalCount: 0,
    reservations: [],
  };
};

// 2. 내 예약 리뷰 작성
export const createReview = async (
  reservationId: number,
  body: CreateReviewRequest,
): Promise<CreateReviewContent | undefined> => {
  try {
    const accessToken = await getAccessToken();

    const res = await axios.post(
      `${BASE_URL}/my-reservations/${reservationId}/reviews`,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
