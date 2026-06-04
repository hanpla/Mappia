'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { MOCK_RESERVATIONS_DATA } from '@/lib/mock-data/reservations';

import FilterDropdown from '@/components/common/dropdown/FilterDropdown';
import ReservationsEmpty from '@/components/profile-reservations/EmptySpace';

import ReservationCard, { ReservationItem } from './ReservationCard';
import ReservationsSkeleton from './ReservationSkeleton';

export default function ReservationsContent() {
  const searchParams = useSearchParams();
  const [reservations, setReservations] = useState<ReservationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const currentFilter = searchParams ? searchParams.get('filter') : '';

  useEffect(() => {
    const loadReservations = () => {
      setIsLoading(true);

      const rawReservations = MOCK_RESERVATIONS_DATA?.reservations || [];

      const mappedReservations: ReservationItem[] = rawReservations
        .map((item) => {
          if (!item) return null;

          return {
            id: item.id,
            status: item.status || 'pending',
            activityName: item.activity?.title || '정보 없음',
            date: item.date ? item.date.replace(/-/g, '. ') : '',
            time:
              item.startTime && item.endTime
                ? `${item.startTime} - ${item.endTime}`
                : '',
            headcount: item.headCount || 0,
            price: item.totalPrice || 0,
            imageUrl: item.activity?.bannerImageUrl || '/default-thumbnail.png',
          };
        })
        .filter((item): item is ReservationItem => item !== null);

      const filteredData = currentFilter
        ? mappedReservations.filter((item) => item.status === currentFilter)
        : mappedReservations;

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
      <div className="mb-6 flex justify-end">
        <FilterDropdown filterKey="filter" />
      </div>

      <div className="flex flex-col gap-6">
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
