import { Suspense } from 'react';

import ReservationsContent from '@/components/profile-reservations/ReservationsContent';
import ReservationsSkeleton from '@/components/profile-reservations/ReservationsSkeleton';
import Title from '@/components/profile-reservations/Title';

export default function ReservationsPage() {
  return (
    <div className="mt-6 md:mt-8">
      <Title />

      <Suspense fallback={<ReservationsSkeleton />}>
        <ReservationsContent />
      </Suspense>
    </div>
  );
}
