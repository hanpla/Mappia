'use client';

import { useParams } from 'next/navigation';

import { useActivityDetail } from '@/hooks/useActivityDetail';

import ActivityRegisterForm from '@/components/my-activity-register/ActivityRegisterForm';

export default function ActivityEditPage() {
  const params = useParams<{ activityId: string }>();
  const activityId = Number(params.activityId);

  const { data, isLoading, isError } = useActivityDetail(activityId);

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center py-10">
        <p className="textlg-regular text-gray-4B4">불러오는 중...</p>
      </main>
    );
  }

  if (isError || !data) {
    return (
      <main className="flex min-h-screen items-center justify-center py-10">
        <p className="textlg-regular text-gray-4B4">
          체험 정보를 불러오지 못했습니다.
        </p>
      </main>
    );
  }

  return (
    <section className="pt-6">
      <ActivityRegisterForm
        key={activityId}
        mode="edit"
        activityId={activityId}
        initialData={data}
      />
    </section>
  );
}
