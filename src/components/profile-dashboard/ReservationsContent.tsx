'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { getMyActivities } from '@/lib/api/my-activities';

import CalendarContent from './CalendarContent';
import EmptySpace from './EmptySpace';

export default function ReservationsContent() {
  const { data } = useSuspenseQuery({
    queryKey: ['my-activities', { size: 100 }],
    queryFn: () => getMyActivities({ size: 100 }),
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
