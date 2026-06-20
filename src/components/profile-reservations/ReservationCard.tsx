'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import useToastStore from '@/stores/toastStore';

import {
  cancelReservation,
  updateReservationApplication,
} from '@/lib/api/my-reservations';
import { getEffectiveStatus } from '@/lib/utils/reservation';

import { ReservationStatus } from '@/types/activities';
import { MyReservationItem } from '@/types/my-reservations';

import Button from '@/components/common/button/Button';
import ConfirmModal from '@/components/common/modal/ConfirmModal';
import ReservationCardContainer from '@/components/profile-ui/ReservationCardContainer';

import LogoHead from '@/assets/logo/logo_head-1.svg';

import ReservationEditModal from './ReservationEditModal';
import ReservationReviewModal from './ReservationReviewModal';

const STATUS_MAPPER: Record<
  ReservationStatus,
  { label: string; className: string }
> = {
  pending: { label: '예약 완료', className: 'text-blue-500' },
  confirmed: { label: '예약 승인', className: 'text-yellow-FFC' },
  canceled: { label: '예약 취소', className: 'text-gray-797' },
  declined: { label: '예약 거절', className: 'text-red-FF4' },
  completed: {
    label: '체험 완료',
    className: 'text-gray-797 bg-gray-EEE px-2 py-0.5 rounded text-xs w-max',
  },
};

interface ReservationCardProps {
  item: MyReservationItem;
}

export default function ReservationCard({ item }: ReservationCardProps) {
  const queryClient = useQueryClient();

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const showToast = useToastStore((state) => state.showToast);

  const cancelMutation = useMutation({
    mutationFn: () => cancelReservation(item.id),
    onSuccess: () => {
      showToast(
        'success',
        `[${item.activity.title}] 예약 취소가 완료되었습니다.`,
      );
      setIsCancelModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ['myReservations'] });
    },
    onError: (error) => {
      showToast(
        'error',
        error instanceof Error ? error.message : '예약 취소에 실패했습니다.',
      );
    },
  });

  const editMutation = useMutation({
    mutationFn: ({
      scheduleId,
      headCount,
    }: {
      scheduleId: number;
      headCount: number;
    }) => updateReservationApplication(item.id, { scheduleId, headCount }),
    onSuccess: () => {
      showToast('success', '예약 정보가 성공적으로 수정되었습니다.');
      setIsEditModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ['myReservations'] });
    },
    onError: (error) => {
      showToast(
        'error',
        error instanceof Error
          ? error.message
          : '예약 정보 수정에 실패했습니다.',
      );
    },
  });

  if (!item || !item.activity) {
    console.warn(
      'ReservationCard: 유효하지 않거나 activity 데이터가 없는 아이템입니다.',
    );
    return null;
  }

  const {
    activity,
    date,
    startTime,
    endTime,
    headCount,
    totalPrice,
    reviewSubmitted: isReviewSubmitted,
  } = item;

  const effectiveStatus = getEffectiveStatus(item);

  const currentStatus = STATUS_MAPPER[effectiveStatus] ?? {
    label: effectiveStatus,
    className: 'text-black-1B1',
  };

  const isSubmitting = cancelMutation.isPending || editMutation.isPending;

  const isRealCompleted = item.status === 'completed';
  const isWriteReview = isRealCompleted && !isReviewSubmitted;
  const isViewReview = isRealCompleted && isReviewSubmitted;

  return (
    <>
      <ReservationCardContainer
        id={activity.id}
        imageUrl={activity.bannerImageUrl}
        className="min-h-40 md:h-48"
      >
        <div className="pl-1 md:pl-0">
          <span className={`text-sm font-semibold ${currentStatus.className}`}>
            {currentStatus.label}
          </span>
          <Link href={`/activities/${activity.id}`}>
            <h3 className="text-black-1B1 textlg-bold mt-1 mb-1 line-clamp-1 text-sm hover:underline md:mt-1.5 md:mb-2 md:text-base">
              {activity.title}{' '}
            </h3>
          </Link>
          <p className="md:textlg-medium text-xs text-gray-500 md:text-sm">
            {date} • {startTime}~{endTime} • {headCount}명
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-1 pl-1 md:pl-0">
          <span className="text-black-1B1 shrink-0 pt-1 pb-0 text-sm font-bold md:text-base">
            ₩{totalPrice.toLocaleString()}
          </span>
          <div className="flex items-center justify-end gap-2 md:gap-3">
            {effectiveStatus === 'pending' && (
              <>
                <Button
                  type="button"
                  variant="solid"
                  onClick={() => setIsEditModalOpen(true)}
                  disabled={isSubmitting}
                  hasHover={false}
                  className="h-8 w-16 shrink-0 rounded-md px-3 text-sm md:h-10 md:w-24 md:rounded-xl md:px-4 md:text-base lg:h-11 lg:w-28 lg:rounded-2xl lg:px-5"
                >
                  예약 변경
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCancelModalOpen(true)}
                  disabled={isSubmitting}
                  hasHover={false}
                  className="hover:bg-gray-FAF hover:text-brown-2A2 h-8 w-16 shrink-0 rounded-md px-3 text-sm md:h-10 md:w-24 md:rounded-xl md:px-4 md:text-base lg:h-11 lg:w-28 lg:rounded-2xl lg:px-5"
                >
                  예약 취소
                </Button>
              </>
            )}
            {isWriteReview && (
              <Button
                type="button"
                variant="solid"
                onClick={() => setIsReviewModalOpen(true)}
                disabled={isSubmitting}
                hasHover={false}
                className="textsm-bold h-8 w-16 shrink-0 rounded-md px-3 md:h-10 md:w-24 md:rounded-xl md:px-4 md:text-base lg:h-11 lg:w-28 lg:rounded-2xl lg:px-5"
              >
                후기 작성
              </Button>
            )}
            {isViewReview && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsReviewModalOpen(true)}
                hasHover={false}
                className="textsm-bold h-8 w-16 shrink-0 rounded-md px-3 md:h-10 md:w-24 md:rounded-xl md:px-4 md:text-base lg:h-11 lg:w-28 lg:rounded-2xl lg:px-5"
              >
                후기 보기
              </Button>
            )}
          </div>
        </div>
      </ReservationCardContainer>

      <ConfirmModal
        isOpen={isCancelModalOpen}
        onClose={() => !isSubmitting && setIsCancelModalOpen(false)}
        onConfirm={() => cancelMutation.mutate()}
        icon={
          <div className="relative size-22">
            <Image
              src={LogoHead}
              alt="Mappia Logo"
              fill
              className="object-contain"
            />
          </div>
        }
        message="예약을 취소하시겠습니까?"
        cancelText="아니오"
        confirmText={isSubmitting ? '처리 중...' : '취소하기'}
      />
      {isRealCompleted && isReviewModalOpen && (
        <ReservationReviewModal
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          reservationId={item.id}
          activityId={activity.id}
          activityTitle={activity.title}
          date={date}
          startTime={startTime}
          endTime={endTime}
          headCount={headCount}
          isSubmitted={isReviewSubmitted}
        />
      )}

      {isEditModalOpen && (
        <ReservationEditModal
          item={item}
          isOpen={isEditModalOpen}
          isSubmitting={editMutation.isPending}
          onClose={() => setIsEditModalOpen(false)}
          onConfirm={(scheduleId, headCount) =>
            editMutation.mutate({ scheduleId, headCount })
          }
        />
      )}
    </>
  );
}
