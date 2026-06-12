import { uploadActivityImage } from '@/lib/api/activities';

import type { ActivityDetailContent, DetailSchedule } from '@/types/activities';
import type { UpdateMyActivityRequest } from '@/types/my-activities';

import type { UploadImage } from '@/components/common/image-upload/ImageUploadField';
import type { Schedule } from '@/components/my-activity-register/ScheduleInput';

export interface ActivityFormValues {
  title: string;
  category: string;
  description: string;
  price: string;
  address: string;
  schedules: Schedule[];
  bannerImages: UploadImage[];
  introImages: UploadImage[];
}

const scheduleKey = (date: string, startTime: string, endTime: string) =>
  `${date}__${startTime}__${endTime}`;

export const buildUpdateActivityBody = async (
  original: ActivityDetailContent,
  values: ActivityFormValues,
): Promise<UpdateMyActivityRequest> => {
  const body: UpdateMyActivityRequest = {};

  if (values.title !== original.title) body.title = values.title;
  if (values.category !== original.category) {
    body.category = values.category as UpdateMyActivityRequest['category'];
  }
  if (values.description !== original.description) {
    body.description = values.description;
  }
  if (Number(values.price) !== original.price) {
    body.price = Number(values.price);
  }
  if (values.address !== original.address) body.address = values.address;

  const banner = values.bannerImages[0];
  if (banner instanceof File) {
    body.bannerImageUrl = await uploadActivityImage(banner);
  } else if (typeof banner === 'string' && banner !== original.bannerImageUrl) {
    body.bannerImageUrl = banner;
  }

  const keptUrls = values.introImages.filter(
    (img): img is string => typeof img === 'string',
  );

  const subImageIdsToRemove = original.subImages
    .filter((img) => !keptUrls.includes(img.imageUrl))
    .map((img) => img.id);

  if (subImageIdsToRemove.length > 0) {
    body.subImageIdsToRemove = subImageIdsToRemove;
  }

  const newFiles = values.introImages.filter(
    (img): img is File => img instanceof File,
  );
  if (newFiles.length > 0) {
    const uploadedUrls = await Promise.all(
      newFiles.map((file) => uploadActivityImage(file)),
    );
    body.subImageUrlsToAdd = uploadedUrls;
  }

  const originalKeys = new Set(
    original.schedules.map((s) => scheduleKey(s.date, s.startTime, s.endTime)),
  );
  const currentKeys = new Set(
    values.schedules
      .filter((s) => s.date)
      .map((s) => scheduleKey(s.date, s.startTime, s.endTime)),
  );

  const scheduleIdsToRemove = original.schedules
    .filter(
      (s) => !currentKeys.has(scheduleKey(s.date, s.startTime, s.endTime)),
    )
    .map((s) => s.id);
  if (scheduleIdsToRemove.length > 0) {
    body.scheduleIdsToRemove = scheduleIdsToRemove;
  }

  const schedulesToAdd: Omit<DetailSchedule, 'id'>[] = values.schedules
    .filter((s) => s.date)
    .filter(
      (s) => !originalKeys.has(scheduleKey(s.date, s.startTime, s.endTime)),
    )
    .map((s) => ({
      date: s.date,
      startTime: s.startTime,
      endTime: s.endTime,
    }));
  if (schedulesToAdd.length > 0) {
    body.schedulesToAdd = schedulesToAdd;
  }

  return body;
};
