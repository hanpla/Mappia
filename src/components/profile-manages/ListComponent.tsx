import { Activity } from '@/types/activity';

import EmptySpace from './EmptySpace';
import ManageList from './ManageList';

const MOCK_DATA = {
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
      bannerImageUrl: '/img/Card_curation.png',
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
      bannerImageUrl: '/img/Card_curation.png',
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
      bannerImageUrl: '/img/Card_curation.png',
      rating: 4.9,
      reviewCount: 290,
      createdAt: '2026-05-29T06:57:23.882Z',
      updatedAt: '2026-05-29T06:57:23.882Z',
    },
  ],
};

const fetchActivities = async (): Promise<Activity[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return MOCK_DATA.activities;
};

export default async function ListComponent() {
  const activities = await fetchActivities();

  return (
    <div>
      {activities.length === 0 ? (
        <EmptySpace />
      ) : (
        <ManageList activities={activities} />
      )}
    </div>
  );
}
