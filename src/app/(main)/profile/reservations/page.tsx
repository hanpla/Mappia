import { Suspense } from 'react';

import ReservationsSkeleton from '@/components/profile-reservations/ReservationSkeleton';
import ReservationsContent from '@/components/profile-reservations/ReservationsContent';
import Title from '@/components/profile-title/Title';

export default function ReservationsPage() {
  return (
    <div className="mt-[0px] min-h-screen p-0">
      <div className="mx-auto max-w-4xl">
        <Title title="예약 내역" />
        <Suspense fallback={<ReservationsSkeleton />}>
          <ReservationsContent />
        </Suspense>
      </div>
    </div>
  );
}
