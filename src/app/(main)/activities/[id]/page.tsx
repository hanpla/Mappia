import { notFound } from 'next/navigation';

import axios from 'axios';

import { getActivityDetail } from '@/lib/api/activities';

import ActivityContent from '@/components/activities/ActivityContent';

interface ActivityPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}

export default async function ActivityPage({
  params,
  searchParams,
}: ActivityPageProps) {
  const { id } = await params;
  const { page } = await searchParams;

  if (!id || id.trim() === '') notFound();

  const activityId = Number(id);
  const currentPage = Number(page) > 0 ? Number(page) : 1;

  if (Number.isNaN(activityId) || activityId <= 0) notFound();

  let activity;

  try {
    activity = await getActivityDetail(activityId);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      notFound();
    }
    throw error;
  }

  if (!activity) notFound();

  return <ActivityContent activity={activity} currentPage={currentPage} />;
}
