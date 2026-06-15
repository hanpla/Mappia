import { uploadActivityImage } from '@/lib/api/activities';

import type {
  ActivityCategory,
  CreateActivityRequest,
  DetailSchedule,
} from '@/types/activities';

import type { ActivityFormValues } from './activityDiff';

export const buildCreateActivityBody = async (
  values: ActivityFormValues,
): Promise<CreateActivityRequest> => {
  const banner = values.bannerImages[0];
  let bannerImageUrl = '';
  if (banner instanceof File) {
    bannerImageUrl = await uploadActivityImage(banner);
  } else if (typeof banner === 'string') {
    bannerImageUrl = banner;
  }

  const subImageUrls = await Promise.all(
    values.introImages.map((img) =>
      img instanceof File ? uploadActivityImage(img) : Promise.resolve(img),
    ),
  );

  const schedules: Omit<DetailSchedule, 'id'>[] = values.schedules
    .filter((s) => s.date)
    .map((s) => ({
      date: s.date,
      startTime: s.startTime,
      endTime: s.endTime,
    }));

  return {
    title: values.title,
    category: values.category as ActivityCategory,
    description: values.description,
    price: Number(values.price),
    address: values.address,
    bannerImageUrl,
    subImageUrls,
    schedules,
  };
};
