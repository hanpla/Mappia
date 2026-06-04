import { MOCK_ACTIVITIES } from '@/lib/mock-data/reservations';

import { MyActivity } from '@/types/my-activities';

import CalendarContent from './CalendarContent';
import EmptySpace from './EmptySpace';

const fetchActivities = async (): Promise<MyActivity[]> => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return MOCK_ACTIVITIES.activities;
};

export default async function ReservationsContent() {
  const res = await fetchActivities();
  const activities = res.map(({ id, title }) => ({ id, title }));

  return (
    <div className="mt-7.5">
      {res.length === 0 ? (
        <EmptySpace />
      ) : (
        <CalendarContent activities={activities} />
      )}
    </div>
  );
}
