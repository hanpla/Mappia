import Link from 'next/link';

import { RecentActivity } from '@/stores/recentActivitiesStore';

interface RecentActivitiesPopupProps {
  activities: RecentActivity[];
}

export default function RecentActivitiesPopup({
  activities,
}: RecentActivitiesPopupProps) {
  return (
    <div className="pointer-events-auto w-70 rounded-2xl border border-gray-100 bg-white p-4 shadow-[0_8px_30px_rgba(42,34,24,0.12)]">
      <div className="flex items-center justify-between border-b border-gray-100 pb-2">
        <span className="text-xs font-bold text-gray-400">최근 본 체험</span>
        <span className="text-[10px] text-gray-400">최근 5개</span>
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
                className="hover:bg-gray-FAF hover:text-brown block w-full cursor-pointer truncate rounded-lg px-2 py-1.5 text-left text-xs text-gray-700 transition-colors"
              >
                {activity.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
