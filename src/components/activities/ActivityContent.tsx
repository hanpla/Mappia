'use client';

import { notFound } from 'next/navigation';

import { useSuspenseQuery } from '@tanstack/react-query';

import { getActivityDetail } from '@/lib/api/activities';

import ActivityDescription from '@/components/activities/ActivityDescription';
import ActivityHeader from '@/components/activities/ActivityHeader';
import ActivityMap from '@/components/activities/ActivityMap';
import MobileReservation from '@/components/activities/MobileReservation';
import PhotoGallery from '@/components/activities/PhotoGallery';
import Reservation from '@/components/activities/Reservation';
import Review from '@/components/activities/Review';

import ActivityWeather from './ActivityWeather';

interface ActivityContentProps {
  activityId: number;
  currentPage: number;
}

export default function ActivityContent({
  activityId,
  currentPage,
}: ActivityContentProps) {
  const { data: activity, isError } = useSuspenseQuery({
    queryKey: ['activityDetail', activityId],
    queryFn: () => getActivityDetail(activityId),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  if (isError) {
    notFound();
  }

  if (!activity) return null;

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

        <div className="hidden space-y-16 lg:col-span-3 lg:block lg:self-start">
          <ActivityHeader activity={activity} />
          <Reservation activity={activity} />
        </div>
      </div>

      <MobileReservation activity={activity} />
    </div>
  );
}
