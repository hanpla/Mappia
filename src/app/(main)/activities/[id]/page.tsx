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

  const activityId = Number(id);
  const currentPage = Number(page) > 0 ? Number(page) : 1;

  return <ActivityContent activityId={activityId} currentPage={currentPage} />;
}
