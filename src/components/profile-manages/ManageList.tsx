'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

import useToastStore from '@/stores/toastStore';

import { deleteMyActivity } from '@/lib/api/my-activities';

import { MyActivity } from '@/types/my-activities';

import ConfirmModal from '@/components/common/modal/ConfirmModal';

import Card from './Card';

interface ManageListProps {
  activities: MyActivity[];
}

export default function ManageList({
  activities: initialActivities,
}: ManageListProps) {
  const [activities, setActivities] = useState<MyActivity[]>(initialActivities);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  const router = useRouter();
  const queryClient = useQueryClient();
  const showToast = useToastStore((state) => state.showToast);

  const handleEdit = (id: number) => {
    router.push(`/profile/${id}/edit`);
  };

  const handleConfirmDelete = async () => {
    if (deleteTargetId === null) return;
    try {
      await deleteMyActivity(deleteTargetId);
      setActivities((prev) =>
        prev.filter((activity) => activity.id !== deleteTargetId),
      );
      showToast('success', '체험이 삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['my-activities'] });
    } catch (error) {
      const message = isAxiosError<{ message: string }>(error)
        ? (error.response?.data?.message ?? '체험 삭제에 실패했습니다.')
        : '체험 삭제에 실패했습니다.';
      showToast('error', message);
    } finally {
      setDeleteTargetId(null);
    }
  };

  return (
    <div className="mt-6 flex flex-col gap-3">
      {activities.map((activity) => (
        <Card
          key={activity.id}
          activity={activity}
          onEdit={handleEdit}
          onDelete={setDeleteTargetId}
        />
      ))}

      <ConfirmModal
        isOpen={deleteTargetId !== null}
        message="정말로 삭제하시겠습니까?"
        cancelText="취소"
        confirmText="삭제"
        onClose={() => setDeleteTargetId(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
