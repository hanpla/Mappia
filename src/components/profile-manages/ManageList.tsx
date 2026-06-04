'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

import useToastStore from '@/stores/toastStore';

import { deleteMyActivity } from '@/lib/api/my-activities';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useMyActivitiesInfinite } from '@/hooks/useMyActivitiesInfinite';

import ConfirmModal from '@/components/common/modal/ConfirmModal';

import LogoSurprise from '../common/logo/LogoSurprise';
import Card from './Card';
import CardSkeleton from './CardSkeleton';
import EmptySpace from './EmptySpace';
import ListSkeleton from './ListSkeleton';

export default function ManageList() {
  const [deletedIds, setDeletedIds] = useState<number[]>([]);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  const router = useRouter();
  const queryClient = useQueryClient();
  const showToast = useToastStore((state) => state.showToast);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useMyActivitiesInfinite();

  const observerRef = useIntersectionObserver({
    onIntersect: () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    enabled: hasNextPage,
  });

  const handleEdit = (id: number) => {
    router.push(`/profile/${id}/edit`);
  };

  const handleConfirmDelete = async () => {
    if (deleteTargetId === null) return;
    try {
      await deleteMyActivity(deleteTargetId);
      setDeletedIds((prev) => [...prev, deleteTargetId]);
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

  const allActivities = data?.pages.flatMap((page) => page.activities) ?? [];
  const visibleActivities = allActivities.filter(
    (activity) => !deletedIds.includes(activity.id),
  );

  if (isLoading) {
    return <ListSkeleton />;
  }

  if (visibleActivities.length === 0) {
    return (
      <div className="mt-10">
        <EmptySpace />
      </div>
    );
  }

  return (
    <div className="mt-6 flex flex-col gap-3">
      {visibleActivities.map((activity) => (
        <Card
          key={activity.id}
          activity={activity}
          onEdit={handleEdit}
          onDelete={setDeleteTargetId}
        />
      ))}

      {/* 추가 페이지 로딩 중 스켈레톤 노출 */}
      {isFetchingNextPage && (
        <div className="mt-3 flex flex-col gap-3">
          <CardSkeleton />
          <CardSkeleton />
        </div>
      )}

      {/* 무한스크롤 감지용 센티넬 요소 */}
      {hasNextPage && <div ref={observerRef} className="h-10" />}

      <ConfirmModal
        isOpen={deleteTargetId !== null}
        icon={<LogoSurprise size={80} />}
        message="정말로 삭제하시겠습니까?"
        cancelText="취소"
        confirmText="삭제"
        onClose={() => setDeleteTargetId(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
