import { getMyActivities } from '@/lib/api/my-activities';

import EmptySpace from './EmptySpace';
import ManageList from './ManageList';

export default async function ListComponent() {
  const res = await getMyActivities({ size: 6 });

  const activities = res.activities;

  return (
    <div>
      {activities.length === 0 ? (
        <EmptySpace />
      ) : (
        <div className="flex flex-col gap-3">
          <ManageList activities={activities} />
        </div>
      )}
    </div>
  );
}
