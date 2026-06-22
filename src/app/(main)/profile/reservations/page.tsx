import { Suspense } from 'react';

import ReservationsSkeleton from '@/components/profile-reservations/ReservationSkeleton';
import ReservationsContent from '@/components/profile-reservations/ReservationsContent';

export default function ReservationsPage() {
  return (
    <div className="mx-auto min-h-screen max-w-4xl">
      <Suspense fallback={<ReservationsSkeleton />}>
        <ReservationsContent />
      </Suspense>
    </div>
  );
}
