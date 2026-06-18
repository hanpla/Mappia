import ActivityDescriptionSkeleton from './ActivityDescriptionSkeleton';
import ActivityHeaderSkeleton from './ActivityHeaderSkeleton';
import ActivityMapSkeleton from './ActivityMapSkeleton';
import ActivityWeatherSkeleton from './ActivityWeatherSkeleton';
import MobileReservationSkeleton from './MobileReservationSkeleton';
import PhotoGallerySkeleton from './PhotoGallerySkeleton';
import ReservationSkeleton from './ReservationSkeleton';
import ReviewSkeleton from './ReviewSkeleton';

export default function ActivityContentSkeleton() {
  return (
    <div suppressHydrationWarning className="animate-pulse pt-6 lg:pt-18">
      <div className="flex flex-col lg:grid lg:grid-cols-8 lg:gap-10">
        <div className="space-y-5 md:space-y-7.5 lg:col-span-5 lg:space-y-10">
          <PhotoGallerySkeleton />
          <div className="block lg:hidden">
            <ActivityHeaderSkeleton />
          </div>
          <ActivityDescriptionSkeleton />
          <ActivityMapSkeleton />
          <ActivityWeatherSkeleton />
          <ReviewSkeleton />
        </div>

        <div className="hidden space-y-16 lg:col-span-3 lg:block lg:self-start">
          <ActivityHeaderSkeleton />
          <ReservationSkeleton />
        </div>
      </div>

      <MobileReservationSkeleton />
    </div>
  );
}
