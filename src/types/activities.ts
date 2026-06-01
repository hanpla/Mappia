import { ApiResponse } from './api';

export type ActivityCategory =
  | '문화 · 예술'
  | '식음료'
  | '스포츠'
  | '투어'
  | '관광'
  | '웰빙'
  | '댄스';

export interface SubImage {
  id: number;
  imageUrl: string;
}

export interface TimeSlot {
  id: number;
  /** "HH:mm" 형식 (예: "14:00") */
  startTime: string;
  /** "HH:mm" 형식 (예: "16:00") */
  endTime: string;
}

export interface ScheduleWithTimes {
  /** "YYYY-MM-DD" 형식 (예: "2026-06-01") */
  date: string;
  times: TimeSlot[];
}

export interface DetailSchedule {
  id: number;
  /** "YYYY-MM-DD" 형식 (예: "2026-06-01") */
  date: string;
  /** "HH:mm" 형식 (예: "14:00") */
  startTime: string;
  /** "HH:mm" 형식 (예: "16:00") */
  endTime: string;
}

export interface BaseActivity {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: ActivityCategory;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  /** ISO 8601 형식의 날짜 문자열 (예: "2026-05-29T06:57:23.882Z") */
  createdAt: string;
  /** ISO 8601 형식의 날짜 문자열 (예: "2026-05-29T06:57:23.882Z") */
  updatedAt: string;
}

export interface ActivityListContent {
  /** 마지막 페이지일 경우 null */
  cursorId: number | null;
  totalCount: number;
  activities: BaseActivity[];
}

export interface CreateActivityContent extends BaseActivity {
  subImages: SubImage[];
  schedules: ScheduleWithTimes[];
}

export interface ActivityDetailContent extends BaseActivity {
  subImages: SubImage[];
  schedules: DetailSchedule[];
}

export interface ReviewUser {
  id: number;
  nickname: string;
  profileImageUrl: string;
}

export interface Review {
  id: number;
  user: ReviewUser;
  activityId: number;
  rating: number;
  content: string;
  /** ISO 8601 형식의 날짜 문자열 (예: "2026-05-29T06:57:23.882Z") */
  createdAt: string;
  /** ISO 8601 형식의 날짜 문자열 (예: "2026-05-29T06:57:23.882Z") */
  updatedAt: string;
}

export interface ActivityReviewsContent {
  averageRating: number;
  totalCount: number;
  reviews: Review[];
}

export interface ReservationContent {
  id: number;
  teamId: string;
  userId: number;
  activityId: number;
  scheduleId: number;
  status: 'pending';
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

// ==========================================
// API 응답 타입 정의
// ==========================================

// 1. 체험 리스트 조회
export type GetActivitiesResponse = ApiResponse<ActivityListContent>;

// 2. 체험 등록
export type CreateActivityResponse = ApiResponse<CreateActivityContent>;

// 3. 체험 상세 조회
export type GetActivityDetailResponse = ApiResponse<ActivityDetailContent>;

// 4. 체험 예약 가능일 조회
export type GetAvailableSchedulesResponse = ApiResponse<ScheduleWithTimes[]>;

// 5. 체험 리뷰 조회
export type GetActivityReviewsResponse = ApiResponse<ActivityReviewsContent>;

// 6. 체험 예약 신청
export type CreateReservationResponse = ApiResponse<ReservationContent>;

// 7. 내 체험 수정
export type UpdateMyActivityResponse = ApiResponse<CreateActivityContent>;

// ==========================================
// API 요청 타입 정의
// ==========================================

// 2. 체험 등록 요청 바디
export type CreateActivityRequest = Omit<
  CreateActivityContent,
  'id' | 'userId' | 'createdAt' | 'updatedAt' | 'rating' | 'reviewCount'
>;

// 6. 체험 예약 신청 요청 바디
export type CreateReservationRequest = Pick<
  ReservationContent,
  'scheduleId' | 'headCount'
>;

// 7. 내 체험 수정 요청 바디
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
  /** 추가할 예약 일정 배열 (예: ["2026-06-01 14:00"]) */
  schedulesToAdd?: string[];
}
