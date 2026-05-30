import { MOCK_ACTIVITIES } from '@/lib/mock-data/reservations';

import { Activity } from '@/types/activitiy';

import CalendarContent from './CalendarContent';
import EmptySpace from './EmptySpace';

const fetchActivities = async (): Promise<Activity[]> => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return MOCK_ACTIVITIES.activities;
};

export default async function ReservationsContent() {
  const res = await fetchActivities();
  const activities = res.map(({ id, title }) => ({ id, title }));

  return (
    <div className="mt-10">
      {res.length === 0 ? (
        <EmptySpace />
      ) : (
        <CalendarContent activities={activities} />
      )}
    </div>
  );
}
