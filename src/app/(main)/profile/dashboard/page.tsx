import { Suspense } from 'react';

import ReservationsContent from '@/components/profile-dashboard/ReservationsContent';
import ReservationsSkeleton from '@/components/profile-dashboard/ReservationsSkeleton';
import Title from '@/components/profile-dashboard/Title';

export default function DashboardPage() {
  return (
    <div className="mt-6 md:mt-8">
      <Title />

      <Suspense fallback={<ReservationsSkeleton />}>
        <ReservationsContent />
      </Suspense>
    </div>
  );
}
