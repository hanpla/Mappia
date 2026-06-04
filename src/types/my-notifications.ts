import { ApiResponse } from './api';

export interface NotificationItem {
  id: number;
  teamId: string;
  userId: number;
  content: string;
  /** ISO 8601 형식의 날짜 문자열 (예: "2026-06-01T23:47:20.407Z") */
  createdAt: string;
  /** ISO 8601 형식의 날짜 문자열 (예: "2026-06-01T23:47:20.407Z") */
  updatedAt: string;
  /** 삭제된 날짜. 삭제되지 않은 경우 null (예: "2026-06-01T23:47:20.407Z") */
  deletedAt: string | null;
}

export interface MyNotificationsContent {
  /** 마지막 페이지일 경우 null */
  cursorId: number | null;
  notifications: NotificationItem[];
  totalCount: number;
}

// ==========================================
// API 응답 타입 정의
// ==========================================

// 1. 내 알림 리스트 조회
export type GetMyNotificationsResponse = ApiResponse<MyNotificationsContent>;

// 2. 내 알림 삭제
export type DeleteNotificationResponse = ApiResponse;
