'use client';

import { useSyncExternalStore } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';

import { getMyActivities } from '@/lib/api/my-activities';

import CalendarContent from './CalendarContent';
import EmptySpace from './EmptySpace';
import ReservationsSkeleton from './ReservationsSkeleton';

function ReservationsQueryContent() {
  const { data } = useSuspenseQuery({
    queryKey: ['my-activities', { size: 100 }],
    queryFn: () => getMyActivities({ size: 100 }),
    staleTime: 5 * 60 * 1000,
  });

  const activities =
    data?.activities.map(({ id, title }) => ({ id, title })) ?? [];

  return (
    <div className="mt-7.5">
      {activities.length === 0 ? (
        <EmptySpace />
      ) : (
        <CalendarContent activities={activities} />
      )}
    </div>
  );
}

const emptySubscribe = () => () => {};

export default function ReservationsContent() {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  if (!isMounted) {
    return <ReservationsSkeleton />;
  }

  return <ReservationsQueryContent />;
}
