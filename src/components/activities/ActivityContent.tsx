import ActivityDescription from '@/components/activities/ActivityDescription';
import ActivityHeader from '@/components/activities/ActivityHeader';
import Map from '@/components/activities/Map';
import MobileReservation from '@/components/activities/MobileReservation';
import PhotoGallery from '@/components/activities/PhotoGallery';
import Reservation from '@/components/activities/Reservation';
import Review from '@/components/activities/Review';

export default function ActivityContent() {
  return (
    <div className="pt-[24px] lg:pt-[72px]">
      <div className="flex flex-col lg:grid lg:grid-cols-8 lg:gap-10">
        <div className="space-y-5 md:space-y-[30px] lg:col-span-5 lg:space-y-10">
          <PhotoGallery />
          <div className="block lg:hidden">
            <ActivityHeader />
          </div>
          <ActivityDescription />
          <Map />
          <Review />
        </div>

        <div className="hidden space-y-16 lg:col-span-3 lg:block">
          <ActivityHeader />
          <Reservation />
        </div>
      </div>

      <MobileReservation />
    </div>
  );
}
