import { notFound } from 'next/navigation';

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
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

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  try {
    await queryClient.prefetchQuery({
      queryKey: ['activityDetail', activityId],
      queryFn: () => getActivityDetail(activityId),
    });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      notFound();
    }
    throw error;
  }

  const state = dehydrate(queryClient);
  const prefetchedData = state.queries.find(
    (q) => q.queryKey[0] === 'activityDetail',
  )?.state.data;

  if (!prefetchedData) notFound();

  return (
    <HydrationBoundary state={state}>
      <ActivityContent activityId={activityId} currentPage={currentPage} />
    </HydrationBoundary>
  );
}
