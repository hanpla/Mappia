import {
  ActivityCategory,
  CreateActivityContent,
  ReservationContent,
} from './activities';
import { ApiResponse } from './api';

// ==========================================
// 내 체험 예약 상태 업데이트 데이터
// ==========================================

export type UpdateReservationStatusContent = ReservationContent;

// ==========================================
// API 응답 타입 정의
// ==========================================

// 1. 내 체험 수정
export type UpdateMyActivityResponse = ApiResponse<CreateActivityContent>;

// 2. 내 체험 예약 상태 업데이트
export type UpdateReservationStatusResponse =
  ApiResponse<UpdateReservationStatusContent>;

// ==========================================
// API 요청 타입 정의
// ==========================================

// 1. 내 체험 수정 요청 바디
export interface UpdateMyActivityRequest {
  title?: string;
  category?: ActivityCategory;
  description?: string;
  price?: number;
  address?: string;
  bannerImageUrl?: string;
  subImageIdsToRemove?: number[];
  subImageUrlsToAdd?: string[];
  scheduleIdsToRemove?: number[];
  /** 추가할 예약 일정 배열 */
  schedulesToAdd?: {
    /** "YYYY-MM-DD" 형식 (예: "2026-06-01") */
    date: string;
    /** "HH:mm" 형식 (예: "14:00") */
    startTime: string;
    /** "HH:mm" 형식 (예: "16:00") */
    endTime: string;
  }[];
}

// 2. 내 체험 예약 상태 업데이트 요청 바디
export interface UpdateReservationStatusRequest {
  status: 'confirmed' | 'declined';
}
