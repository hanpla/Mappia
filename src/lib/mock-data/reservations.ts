// src/lib/mock-data/reservations.ts
import { MyActivitiesContent } from '@/types/my-activities';
import { MyReservationItem } from '@/types/my-reservations';

export const MOCK_ACTIVITIES: MyActivitiesContent = {
  cursorId: 0,
  totalCount: 3,
  activities: [
    {
      id: 1,
      userId: 101,
      title: '함께 배우면 즐거운 스트릿 댄스',
      description: '즐겁게 배우는 스트릿 댄스 클래스입니다.',
      category: '댄스',
      price: 10000,
      address: '서울시 서초구',
      bannerImageUrl: '',
      rating: 4.8,
      reviewCount: 290,
      createdAt: '2026-05-29T06:57:23.882Z',
      updatedAt: '2026-05-29T06:57:23.882Z',
    },
    {
      id: 2,
      userId: 101,
      title: 'B-boy 댄스 배우기',
      description: '비보잉 기초부터 실전 기술까지 배워보세요.',
      category: '댄스',
      price: 10000,
      address: '서울시 강남구',
      bannerImageUrl: '',
      rating: 4.0,
      reviewCount: 200,
      createdAt: '2026-05-29T06:57:23.882Z',
      updatedAt: '2026-05-29T06:57:23.882Z',
    },
    {
      id: 3,
      userId: 101,
      title: '발레 배우기',
      description: '아름다운 선과 자세를 잡는 클래식 발레입니다.',
      category: '댄스',
      price: 10000,
      address: '서울시 마포구',
      bannerImageUrl: '',
      rating: 4.9,
      reviewCount: 290,
      createdAt: '2026-05-29T06:57:23.882Z',
      updatedAt: '2026-05-29T06:57:23.882Z',
    },
  ],
};

export interface ReservationDashboardItem {
  date: string;
  reservations: {
    completed: number;
    confirmed: number;
    pending: number;
  };
}

export const MOCK_RESERVATION_DASHBOARD: Record<
  number,
  ReservationDashboardItem[]
> = {
  1: [
    {
      date: '2026-05-08',
      reservations: { completed: 10, confirmed: 0, pending: 0 },
    },
    {
      date: '2026-05-10',
      reservations: { completed: 0, confirmed: 0, pending: 2 },
    },
    {
      date: '2026-05-11',
      reservations: { completed: 0, confirmed: 6, pending: 0 },
    },
    {
      date: '2026-05-12',
      reservations: { completed: 0, confirmed: 10, pending: 0 },
    },
    {
      date: '2026-06-02',
      reservations: { completed: 0, confirmed: 3, pending: 1 },
    },
    {
      date: '2026-06-15',
      reservations: { completed: 4, confirmed: 2, pending: 2 },
    },
    {
      date: '2026-06-25',
      reservations: { completed: 0, confirmed: 0, pending: 5 },
    },
  ],
  2: [
    {
      date: '2026-05-05',
      reservations: { completed: 5, confirmed: 3, pending: 1 },
    },
    {
      date: '2026-05-15',
      reservations: { completed: 2, confirmed: 0, pending: 4 },
    },
    {
      date: '2026-05-20',
      reservations: { completed: 0, confirmed: 8, pending: 0 },
    },
    {
      date: '2026-06-10',
      reservations: { completed: 1, confirmed: 2, pending: 3 },
    },
    {
      date: '2026-06-20',
      reservations: { completed: 5, confirmed: 5, pending: 5 },
    },
  ],
  3: [
    {
      date: '2026-05-01',
      reservations: { completed: 12, confirmed: 4, pending: 2 },
    },
    {
      date: '2026-05-14',
      reservations: { completed: 0, confirmed: 5, pending: 5 },
    },
    {
      date: '2026-05-25',
      reservations: { completed: 7, confirmed: 0, pending: 0 },
    },
    {
      date: '2026-06-05',
      reservations: { completed: 3, confirmed: 6, pending: 1 },
    },
    {
      date: '2026-06-18',
      reservations: { completed: 0, confirmed: 4, pending: 2 },
    },
  ],
};

export interface MockReservationsResponse {
  cursorId: number;
  reservations: MyReservationItem[];
  totalCount: number;
}

export const MOCK_RESERVATIONS_DATA: MockReservationsResponse = {
  cursorId: 0,
  totalCount: 5,
  reservations: [
    {
      id: 1,
      teamId: 'team-1',
      userId: 101,
      scheduleId: 1001,
      status: 'pending',
      reviewSubmitted: false,
      totalPrice: 35000,
      headCount: 1,
      date: '2026-06-15',
      startTime: '14:00',
      endTime: '16:00',
      createdAt: '2026-06-02T06:29:10.250Z',
      updatedAt: '2026-06-02T06:29:10.250Z',
      activity: {
        id: 101,
        title: '함께 배우면 즐거운 스트릿 댄스',
        bannerImageUrl: '',
      },
    },
    {
      id: 2,
      teamId: 'team-1',
      userId: 101,
      scheduleId: 1002,
      status: 'confirmed',
      reviewSubmitted: false,
      totalPrice: 100000,
      headCount: 2,
      date: '2026-06-20',
      startTime: '11:00',
      endTime: '12:30',
      createdAt: '2026-06-02T06:29:10.250Z',
      updatedAt: '2026-06-02T06:29:10.250Z',
      activity: {
        id: 102,
        title: '나만의 수제 향수 만들기 원데이 클래스',
        bannerImageUrl: '',
      },
    },
    {
      id: 3,
      teamId: 'team-1',
      userId: 101,
      scheduleId: 1003,
      status: 'completed',
      reviewSubmitted: false,
      totalPrice: 40000,
      headCount: 4,
      date: '2026-05-25',
      startTime: '18:00',
      endTime: '20:00',
      createdAt: '2026-06-02T06:29:10.250Z',
      updatedAt: '2026-06-02T06:29:10.250Z',
      activity: {
        id: 103,
        title: 'B-boy 댄스 배우기 기초반',
        bannerImageUrl: '',
      },
    },
    {
      id: 4,
      teamId: 'team-1',
      userId: 101,
      scheduleId: 1004,
      status: 'canceled',
      reviewSubmitted: false,
      totalPrice: 15000,
      headCount: 1,
      date: '2026-05-10',
      startTime: '10:00',
      endTime: '11:30',
      createdAt: '2026-06-02T06:29:10.250Z',
      updatedAt: '2026-06-02T06:29:10.250Z',
      activity: {
        id: 104,
        title: '발레 배우기 자세 교정 클래스',
        bannerImageUrl: '',
      },
    },
    {
      id: 5,
      teamId: 'team-1',
      userId: 101,
      scheduleId: 1005,
      status: 'declined',
      reviewSubmitted: false,
      totalPrice: 60000,
      headCount: 2,
      date: '2026-05-08',
      startTime: '09:00',
      endTime: '12:00',
      createdAt: '2026-06-02T06:29:10.250Z',
      updatedAt: '2026-06-02T06:29:10.250Z',
      activity: {
        id: 105,
        title: '한강 한 바퀴 로드 바이크 투어',
        bannerImageUrl: '',
      },
    },
  ],
};
