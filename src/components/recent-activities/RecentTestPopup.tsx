import Link from 'next/link';

import { RecentActivity } from '@/stores/recentActivitiesStore';

interface RecentActivitiesPopupProps {
  activities: RecentActivity[];
}

export default function RecentTestPopup({
  activities,
}: RecentActivitiesPopupProps) {
  return (
    <div className="border-ivory-F2E pointer-events-auto w-80 rounded-2xl border bg-white p-4 md:w-90 lg:w-100">
      <div className="flex items-center justify-center pb-2">
        <span className="text2xl-bold">최근 본 체험</span>
      </div>

      {activities.length === 0 ? (
        <div className="py-6 text-center text-xs text-gray-400">
          최근 본 체험이 없습니다.
        </div>
      ) : (
        <ul className="mt-2 flex flex-col gap-1">
          {activities.map((activity) => (
            <li key={activity.id}>
              <Link
                href={`/activities/${activity.id}`}
                className="border-ivory-F2E hover:bg-gray-FAF hover:text-brown textmd-medium flex w-full min-w-0 cursor-pointer items-center justify-between rounded-lg border-2 px-2 py-3 text-left text-gray-700 transition-colors"
              >
                <span className="mr-4 flex-1 truncate">{activity.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
