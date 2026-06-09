'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import useToastStore from '@/stores/toastStore';

import { cancelReservation, createReview } from '@/lib/api/my-reservations';

import { ReservationStatus } from '@/types/activities';
import { MyReservationItem } from '@/types/my-reservations';

import Button from '@/components/common/button/Button';
import Textarea from '@/components/common/input/Textarea';
import ConfirmModal from '@/components/common/modal/ConfirmModal';
import StandardModal from '@/components/common/modal/StandardModal';

import Logo from '@/assets/logo/logo.svg';
import LogoHead from '@/assets/logo/logo_head-1.svg';

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
  const [rating, setRating] = useState<number>(0);
  const [reviewContent, setReviewContent] = useState<string>('');
  const [buttonSize, setButtonSize] = useState<'sm' | 'md' | 'lg'>('lg');
  const [isImageError, setIsImageError] = useState(false);

  const showToast = useToastStore((state) => state.showToast);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 768) setButtonSize('sm');
      else if (window.innerWidth < 1024) setButtonSize('md');
      else setButtonSize('lg');
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  const reviewMutation = useMutation({
    mutationFn: () =>
      createReview(item?.id, { rating, content: reviewContent }),
    onSuccess: () => {
      showToast('success', '후기가 성공적으로 저장되었습니다!');
      setIsReviewModalOpen(false);
      queryClient.invalidateQueries({
        queryKey: ['myReservations'],
        refetchType: 'none',
      });
    },
    onError: (error) => {
      showToast(
        'error',
        error instanceof Error ? error.message : '후기 등록에 실패했습니다.',
      );
    },
  });

  const cancelMutation = useMutation({
    mutationFn: () => cancelReservation(item?.id),
    onSuccess: () => {
      showToast(
        'success',
        `[${item?.activity?.title}] 예약 취소가 완료되었습니다.`,
      );
      setIsCancelModalOpen(false);
      queryClient.invalidateQueries({
        queryKey: ['myReservations'],
        refetchType: 'none',
      });
    },
    onError: (error) => {
      showToast(
        'error',
        error instanceof Error ? error.message : '예약 취소에 실패했습니다.',
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
    id: reservationId,
    status,
    activity,
    date,
    startTime,
    endTime,
    headCount,
    totalPrice,
    reviewSubmitted: isReviewSubmitted,
  } = item;

  const currentStatus = STATUS_MAPPER[status] || {
    label: status,
    className: 'text-black-1B1',
  };

  const isSubmitting = reviewMutation.isPending || cancelMutation.isPending;

  const handleReviewClick = () => {
    setRating(0);
    setReviewContent('');
    setIsReviewModalOpen(true);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
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

  const handleCancelClick = () => {
    setIsCancelModalOpen(true);
  };

  return (
    <div className="bg-white-FFF border-gray-DDD hover:shadow-dropdown flex h-32 w-full rounded-2xl border transition-all md:h-[156px] lg:h-auto lg:min-h-[200px]">
      <div className="bg-gray-FAF relative w-24 flex-shrink-0 self-stretch overflow-hidden rounded-l-2xl md:w-[156px] lg:w-[200px]">
        {activity.bannerImageUrl && !isImageError ? (
          <Image
            src={activity.bannerImageUrl}
            alt={activity.title}
            fill
            sizes="(max-width: 768px) 96px, (max-width: 1024px) 156px, 200px"
            className="object-cover"
            priority
            onError={() => setIsImageError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <div className="relative h-14 w-14 md:h-16 md:w-16 lg:h-20 lg:w-20">
              <Image
                src={Logo}
                alt="Mappia Logo"
                fill
                className="object-contain opacity-40"
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-grow flex-col px-3 pt-3 pb-2.5 md:px-4 md:pt-4 md:pb-3">
        <div>
          <span className={`textsm-semibold ${currentStatus.className}`}>
            {currentStatus.label}
          </span>
          <h3 className="text-black-1B1 textlg-bold mt-1 mb-1 line-clamp-1 text-sm md:mt-1.5 md:mb-2 md:text-base">
            {activity.title}
          </h3>
          <p className="md:textlg-medium text-xs text-gray-500 md:text-sm">
            {date} • {startTime}~{endTime} • {headCount}명
          </p>
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-1 pt-2 lg:mt-6">
          <span className="text-black-1B1 textxl-bold flex-shrink-0 text-sm md:text-base">
            ₩{totalPrice.toLocaleString()}
          </span>
          <div className="flex items-center justify-end">
            {status === 'pending' && (
              <Button
                type="button"
                variant="outline"
                size={buttonSize}
                onClick={handleCancelClick}
                disabled={isSubmitting}
                hasHover={false}
                className="hover:bg-gray-FAF hover:text-brown-2A2 h-8 w-20 flex-shrink-0 rounded-md px-4 md:h-10 md:w-28 md:rounded-2xl md:px-4"
              >
                예약 취소
              </Button>
            )}

            {status === 'completed' && !isReviewSubmitted && (
              <Button
                type="button"
                variant="solid"
                size={buttonSize}
                onClick={handleReviewClick}
                disabled={isSubmitting}
                hasHover={false}
                className="h-8 w-20 flex-shrink-0 rounded-md px-4 md:h-10 md:w-28 md:rounded-2xl md:px-4"
              >
                후기 작성
              </Button>
            )}
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={isCancelModalOpen}
        onClose={() => !isSubmitting && setIsCancelModalOpen(false)}
        onConfirm={() => cancelMutation.mutate()}
        icon={
          <div className="relative h-[88px] w-[88px]">
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
              className="text-white-FFF mt-4 h-[54px] w-full rounded-xl font-bold"
            >
              {isSubmitting ? '작성 중...' : '작성하기'}
            </Button>
          </form>
        </div>
      </StandardModal>
    </div>
  );
}
