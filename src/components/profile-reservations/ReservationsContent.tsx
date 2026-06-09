'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { getMyReservations } from '@/lib/api/my-reservations';

import { ReservationStatus } from '@/types/activities';
import { MyReservationItem } from '@/types/my-reservations';

import FilterDropdown from '@/components/common/dropdown/FilterDropdown';
import ReservationsEmpty from '@/components/common/empty-space/EmptySpace';
import Title from '@/components/profile-title/Title';

import ReservationCard from './ReservationCard';
import ReservationsSkeleton from './ReservationSkeleton';

export default function ReservationsContent() {
  const searchParams = useSearchParams();
  const [reservations, setReservations] = useState<MyReservationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const currentFilter = searchParams?.get('filter') as ReservationStatus | null;

  const loadReservations = async () => {
    setIsLoading(true);
    const data = await getMyReservations({
      status: currentFilter ?? undefined,
    });
    setReservations(data.reservations);
    setIsLoading(false);
  };

  // useEffect(() => {
  //   loadReservations();
  // }, [currentFilter]);

  // if (isLoading) {
  //   return <ReservationsSkeleton />;
  // }

  return (
    <div className="flex w-full flex-col">
      <Title title="예약 내역" action={<FilterDropdown filterKey="filter" />} />

      <div className="mt-10 flex flex-col gap-4 md:gap-6">
        {reservations.length === 0 ? (
          <ReservationsEmpty message="아직 예약한 체험이 없어요" />
        ) : (
          reservations.map((item) => (
            <ReservationCard
              key={item.id}
              item={item}
              onRefresh={loadReservations}
            />
          ))
        )}
      </div>
    </div>
  );
}
