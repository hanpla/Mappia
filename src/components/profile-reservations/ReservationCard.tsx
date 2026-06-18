'use client';

import Image from 'next/image';
import { useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import useToastStore from '@/stores/toastStore';

import { getActivityReviews } from '@/lib/api/activities';
import {
  cancelReservation,
  createReview,
  updateReservationApplication,
} from '@/lib/api/my-reservations';
import { getEffectiveStatus } from '@/lib/utils/reservation';

import useMe from '@/hooks/useMe';

import { ReservationStatus } from '@/types/activities';
import { Review } from '@/types/activities';
import { MyReservationItem } from '@/types/my-reservations';

import Button from '@/components/common/button/Button';
import Textarea from '@/components/common/input/Textarea';
import ConfirmModal from '@/components/common/modal/ConfirmModal';
import StandardModal from '@/components/common/modal/StandardModal';
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
  const [rating, setRating] = useState<number>(0);
  const [reviewContent, setReviewContent] = useState<string>('');

  const showToast = useToastStore((state) => state.showToast);

  const reviewMutation = useMutation({
    mutationFn: () => createReview(item.id, { rating, content: reviewContent }),
    onSuccess: () => {
      showToast('success', '후기가 성공적으로 저장되었습니다!');
      setIsReviewModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ['myReservations'] });
    },
    onError: (error) => {
      showToast(
        'error',
        error instanceof Error ? error.message : '후기 등록에 실패했습니다.',
      );
    },
  });

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

  const isSubmitting =
    reviewMutation.isPending ||
    cancelMutation.isPending ||
    editMutation.isPending;

  const isRealCompleted = item.status === 'completed';
  const isWriteReview = item.status === 'completed' && !isReviewSubmitted;
  const isViewReview = isRealCompleted && isReviewSubmitted;

  const handleReviewClick = () => {
    setRating(0);
    setReviewContent('');
    setIsReviewModalOpen(true);
  };

  const handleReviewSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    if (rating === 0) {
      showToast('error', '별점을 선택해 주세요.');
      return;
    }
    if (!reviewContent.trim()) {
      showToast('error', '후기 내용을 입력해 주세요.');
      return;
    }

    reviewMutation.mutate();
  };

  return (
    <>
      <ReservationCardContainer
        imageUrl={activity.bannerImageUrl}
        className="h-42"
      >
        <div className="pl-1 md:pl-0">
          <span className={`text-sm font-semibold ${currentStatus.className}`}>
            {currentStatus.label}
          </span>
          <h3 className="text-black-1B1 textlg-bold mt-1 mb-1 line-clamp-1 text-sm md:mt-1.5 md:mb-2 md:text-base">
            {activity.title}
          </h3>
          <p className="md:textlg-medium text-xs text-gray-500 md:text-sm">
            {date} • {startTime}~{endTime} • {headCount}명
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-1 pl-1 md:pl-0">
          <span className="text-black-1B1 textxl-bold shrink-0 pt-1 pb-2 text-sm md:text-base">
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
                onClick={handleReviewClick}
                disabled={isSubmitting}
                hasHover={false}
                className="h-8 w-16 shrink-0 rounded-md px-3 text-sm md:h-10 md:w-24 md:rounded-xl md:px-4 md:text-base lg:h-11 lg:w-28 lg:rounded-2xl lg:px-5"
              >
                후기 작성
              </Button>
            )}
            {isViewReview && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsReviewModalOpen(true)} // 혹은 별도 뷰 모달
                hasHover={false}
                className="h-8 w-16 shrink-0 rounded-md px-3 text-sm md:h-10 md:w-24 md:rounded-xl md:px-4 md:text-base lg:h-11 lg:w-28 lg:rounded-2xl lg:px-5"
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

      <StandardModal
        isOpen={isReviewModalOpen}
        onClose={() => !isSubmitting && setIsReviewModalOpen(false)}
      >
        <div className="w-full max-w-[480px] p-2 text-center">
          <div className="mb-6">
            <h2 className="text-black-1B1 text-lg font-bold sm:text-xl">
              {activity.title}
            </h2>
            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
              {date} / {startTime}~{endTime} ({headCount}명)
            </p>
            <p className="mt-2 text-xs text-red-400">
              ※ 작성한 후기는 수정 및 삭제가 불가합니다.
            </p>
          </div>

          <div className="mb-6 flex justify-center gap-1.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                disabled={isSubmitting}
                onClick={() => setRating(star)}
                aria-label={`${star}점 부여`}
                className="transition-transform outline-none active:scale-95 disabled:opacity-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className={`h-12 w-12 transition-colors duration-150 ${
                    star <= rating ? 'fill-[#FFC107]' : 'fill-[#E0E0E0]'
                  }`}
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              </button>
            ))}
          </div>

          <form onSubmit={handleReviewSubmit} className="text-left">
            <div className="mb-3 w-full">
              <label
                htmlFor="review-text"
                className="text-black-1B1 mb-2 block text-base font-bold"
              >
                소중한 경험을 들려주세요
              </label>
              <div className="relative">
                <Textarea
                  id="review-text"
                  placeholder="체험에서 느낀 경험을 자유롭게 남겨주세요"
                  rows={6}
                  value={reviewContent}
                  disabled={isSubmitting}
                  maxLength={100}
                  onChange={(e) => setReviewContent(e.target.value)}
                  className="w-full resize-none rounded-xl border border-gray-200 p-4"
                />
                <div className="mt-1 text-right text-xs text-gray-400">
                  {reviewContent.length}/100
                </div>
              </div>
            </div>

            <Button
              type="submit"
              variant="solid"
              size="lg"
              hasHover={false}
              disabled={isSubmitting}
              className="text-white-FFF mt-4 h-13.5 w-full rounded-xl font-bold"
            >
              {isSubmitting ? '작성 중...' : '작성하기'}
            </Button>
          </form>
        </div>
      </StandardModal>

      {isEditModalOpen && (
        <ReservationEditModal
          item={item}
          isOpen={isEditModalOpen}
          isSubmitting={editMutation.isPending}
          price={totalPrice / headCount}
          onClose={() => setIsEditModalOpen(false)}
          onConfirm={(scheduleId, headCount) =>
            editMutation.mutate({ scheduleId, headCount })
          }
        />
      )}
    </>
  );
}
