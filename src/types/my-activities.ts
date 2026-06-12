import {
  BaseActivity,
  CreateActivityContent,
  DetailSchedule,
  ReservationContent,
} from './activities';
import { ApiResponse } from './api';

// ==========================================
// 내 체험 리스트 조회 데이터
// ==========================================

export type MyActivity = BaseActivity;

export interface MyActivitiesContent {
  /** 마지막 페이지일 경우 null */
  cursorId: number | null;
  totalCount: number;
  activities: MyActivity[];
}

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
export interface UpdateMyActivityRequest extends Partial<
  Pick<
    BaseActivity,
    | 'title'
    | 'category'
    | 'description'
    | 'price'
    | 'address'
    | 'bannerImageUrl'
  >
> {
  subImageIdsToRemove?: number[];
  subImageUrlsToAdd?: string[];
  scheduleIdsToRemove?: number[];
  /** 추가할 예약 일정 배열 */
  schedulesToAdd?: Omit<DetailSchedule, 'id'>[];
}

// 2. 내 체험 예약 상태 업데이트 요청 바디
export interface UpdateReservationStatusRequest {
  status: 'confirmed' | 'declined';
}

// ==========================================
// 내 체험 일별 예약 현황 및 예약 조회 데이터 타입
// ==========================================

export interface ReservationDashboardItem {
  date: string;
  reservations: {
    completed: number;
    confirmed: number;
    pending: number;
  };
}

export interface ActivityReservationItem extends ReservationContent {
  nickname?: string;
  user: {
    id: number;
    nickname: string;
    profileImageUrl: string | null;
  };
}

export interface ActivityReservationsResponse {
  cursorId: number | null;
  totalCount: number;
  reservations: ActivityReservationItem[];
}
