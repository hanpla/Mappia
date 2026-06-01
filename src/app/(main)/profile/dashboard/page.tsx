import { Suspense } from 'react';

import ReservationsContent from '@/components/profile-dashboard/ReservationsContent';
import ReservationsSkeleton from '@/components/profile-dashboard/ReservationsSkeleton';
import Title from '@/components/profile-title/Title';

export default function DashboardPage() {
  return (
    <div>
      <Title title="예약 현황" />
      <p className="text-gray-500">
        내 체험에 예약된 내역들을 한 눈에 확인할 수 있습니다.
      </p>

      <Suspense fallback={<ReservationsSkeleton />}>
        <ReservationsContent />
      </Suspense>
    </div>
  );
}
