'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { MOCK_RESERVATIONS_DATA } from '@/lib/mock-data/reservations';

import { MyReservationItem } from '@/types/my-reservations';

import FilterDropdown from '@/components/common/dropdown/FilterDropdown';
import ReservationsEmpty from '@/components/profile-reservations/EmptySpace';
import Title from '@/components/profile-title/Title';

import ReservationCard from './ReservationCard';
import ReservationsSkeleton from './ReservationSkeleton';

export default function ReservationsContent() {
  const searchParams = useSearchParams();
  const [reservations, setReservations] = useState<MyReservationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const currentFilter = searchParams ? searchParams.get('filter') : '';

  useEffect(() => {
    const loadReservations = () => {
      setIsLoading(true);

      const rawReservations: MyReservationItem[] =
        MOCK_RESERVATIONS_DATA?.reservations || [];

      const filteredData = currentFilter
        ? rawReservations.filter(
            (item) => item && item.status === currentFilter,
          )
        : rawReservations.filter((item) => item !== null);

      setReservations(filteredData);
      setIsLoading(false);
    };

    loadReservations();
  }, [currentFilter]);

  if (isLoading) {
    return <ReservationsSkeleton />;
  }

  return (
    <div className="flex w-full flex-col">
      <Title title="예약 내역" action={<FilterDropdown filterKey="filter" />} />

      <div className="mt-6 flex flex-col gap-4 md:gap-6">
        {reservations.length === 0 ? (
          <ReservationsEmpty />
        ) : (
          reservations.map((item) => (
            <ReservationCard key={item.id} item={item} />
          ))
        )}
      </div>
    </div>
  );
}
