import { BaseActivity, ReservationContent } from './activities';
import { ApiResponse } from './api';

export type ReservationStatus =
  | 'pending'
  | 'confirmed'
  | 'declined'
  | 'canceled'
  | 'completed';

export type MyReservationActivity = Pick<
  BaseActivity,
  'id' | 'title' | 'bannerImageUrl'
>;

export interface MyReservationItem {
  id: number;
  teamId: string;
  userId: number;
  activity: MyReservationActivity;
  scheduleId: number;
  status: ReservationStatus;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  /** "YYYY-MM-DD" 형식 (예: "2026-06-01") */
  date: string;
  /** "HH:mm" 형식 (예: "14:00") */
  startTime: string;
  /** "HH:mm" 형식 (예: "16:00") */
  endTime: string;
  /** ISO 8601 형식의 날짜 문자열 (예: "2026-05-29T06:57:23.882Z") */
  createdAt: string;
  /** ISO 8601 형식의 날짜 문자열 (예: "2026-05-29T06:57:23.882Z") */
  updatedAt: string;
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

// 3. 내 체험 예약 상태 업데이트
export type UpdateReservationStatusResponse =
  ApiResponse<UpdateReservationStatusContent>;

// ==========================================
// API 요청 타입 정의
// ==========================================

// 2. 내 예약 리뷰 작성 요청 바디
export type CreateReviewRequest = Pick<
  CreateReviewContent,
  'rating' | 'content'
>;

// 3. 내 체험 예약 상태 업데이트 요청 바디
export interface UpdateReservationStatusRequest {
  status: 'confirmed' | 'declined';
}

// 3. 내 체험 예약 상태 업데이트 응답 데이터
export interface UpdateReservationStatusContent extends Omit<
  ReservationContent,
  'status'
> {
  status: ReservationStatus;
}
