import { BaseActivity, ReservationContent } from './activities';
import { ApiResponse } from './api';

export type MyReservationActivity = Pick<
  BaseActivity,
  'id' | 'title' | 'bannerImageUrl'
>;

export interface MyReservationItem extends Omit<
  ReservationContent,
  'activityId'
> {
  activity: MyReservationActivity;
}

export interface MyReservationsContent {
  /** 마지막 페이지일 경우 null */
  cursorId: number | null;
  totalCount: number;
  reservations: MyReservationItem[];
}

export interface CreateReviewContent {
  id: number;
  teamId: string;
  userId: number;
  activityId: number;
  rating: number;
  content: string;
  /** ISO 8601 형식의 날짜 문자열 (예: "2026-05-29T06:57:23.882Z") */
  createdAt: string;
  /** ISO 8601 형식의 날짜 문자열 (예: "2026-05-29T06:57:23.882Z") */
  updatedAt: string;
}

// ==========================================
// API 응답 타입 정의
// ==========================================

// 1. 내 예약 리스트 조회
export type GetMyReservationsResponse = ApiResponse<MyReservationsContent>;

// 2. 내 예약 리뷰 작성 완료
export type CreateReviewResponse = ApiResponse<CreateReviewContent>;

// ==========================================
// API 요청 타입 정의
// ==========================================

// 2. 내 예약 리뷰 작성 요청 바디
export type CreateReviewRequest = Pick<
  CreateReviewContent,
  'rating' | 'content'
>;
