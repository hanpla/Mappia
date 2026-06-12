import { ActivityDetailContent } from '@/types/activities';

import ActivityDescription from '@/components/activities/ActivityDescription';
import ActivityHeader from '@/components/activities/ActivityHeader';
import ActivityMap from '@/components/activities/ActivityMap';
import MobileReservation from '@/components/activities/MobileReservation';
import PhotoGallery from '@/components/activities/PhotoGallery';
import Reservation from '@/components/activities/Reservation';
import Review from '@/components/activities/Review';

import ActivityWeather from './ActivityWeather';

interface ActivityContentProps {
  activity: ActivityDetailContent;
  currentPage: number;
}

export default function ActivityContent({
  activity,
  currentPage,
}: ActivityContentProps) {
  return (
    <div className="pt-6 lg:pt-18">
      <div className="flex flex-col lg:grid lg:grid-cols-8 lg:gap-10">
        <div className="space-y-5 md:space-y-7.5 lg:col-span-5 lg:space-y-10">
          <PhotoGallery activity={activity} />
          <div className="block lg:hidden">
            <ActivityHeader activity={activity} />
          </div>
          <ActivityDescription description={activity.description} />
          <ActivityMap address={activity.address} />
          <ActivityWeather address={activity.address} />
          <Review
            activityId={activity.id}
            currentPage={currentPage}
            title={activity.title}
            category={activity.category}
            description={activity.description}
          />
        </div>

        <div className="hidden space-y-16 lg:col-span-3 lg:block lg:items-start">
          <ActivityHeader activity={activity} />
          <Reservation activity={activity} />
        </div>
      </div>

      <MobileReservation activity={activity} />
    </div>
  );
}
