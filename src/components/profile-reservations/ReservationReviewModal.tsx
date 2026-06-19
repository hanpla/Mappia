'use client';

import { useEffect, useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import useToastStore from '@/stores/toastStore';

import { getActivityReviews } from '@/lib/api/activities';
import { createReview, getMyReservations } from '@/lib/api/my-reservations';

import useMe from '@/hooks/useMe';

import { Review } from '@/types/activities';

import Button from '@/components/common/button/Button';
import Textarea from '@/components/common/input/Textarea';
import StandardModal from '@/components/common/modal/StandardModal';
import ReservationReviewModalSkeleton from '@/components/profile-reservations/ReservationReviewModalSkeleton';

interface CompletedReservation {
  id: number;
  date: string;
  startTime: string;
  createdAt: string;
  activity: {
    id: number;
  };
  reviewSubmitted: boolean;
}

interface ReservationReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  reservationId: number;
  activityId: number;
  activityTitle: string;
  date: string;
  startTime: string;
  endTime: string;
  headCount: number;
  isSubmitted: boolean;
}
const getReservationDateTime = (res: { date: string; startTime: string }) => {
  const [year, month, day] = res.date.split('-').map(Number);
  const [hour, minute] = res.startTime.split(':').map(Number);
  return new Date(year, month - 1, day, hour, minute).getTime();
};

export default function ReservationReviewModal({
  isOpen,
  onClose,
  reservationId,
  activityId,
  activityTitle,
  date,
  startTime,
  endTime,
  headCount,
  isSubmitted,
}: ReservationReviewModalProps) {
  const queryClient = useQueryClient();
  const showToast = useToastStore((state) => state.showToast);
  const { data: me } = useMe();

  const [rating, setRating] = useState(0);
  const [reviewContent, setReviewContent] = useState('');
  const [myReview, setMyReview] = useState<Review | null>(null);
  const [isReviewLoading, setIsReviewLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  const { data: reservationsData } = useQuery({
    queryKey: ['myReservations', { status: 'completed' }],
    queryFn: () => getMyReservations({ status: 'completed' }),
    enabled: isOpen && !!me?.id,
  });

  useEffect(() => {
    if (!isOpen || !me?.id || !reservationsData) return;

    let isCancelled = false;

    const verifyOrderAndFetch = async () => {
      setIsReviewLoading(true);
      try {
        const completedReservations = (
          reservationsData.reservations as CompletedReservation[]
        )
          .filter((res) => res.activity.id === activityId)
          .sort(
            (a, b) =>
              getReservationDateTime(a) - getReservationDateTime(b) ||
              a.id - b.id,
          );

        if (!isSubmitted) {
          const currentReservation = completedReservations.find(
            (res) => res.id === reservationId,
          );
          const currentTargetTime = currentReservation
            ? getReservationDateTime(currentReservation)
            : 0;

          const hasOlderUnwritten = completedReservations.some((res) => {
            const resTime = getReservationDateTime(res);
            return !res.reviewSubmitted && resTime < currentTargetTime;
          });

          if (hasOlderUnwritten) {
            showToast('error', '이전 회차의 체험 후기를 먼저 작성해 주세요!');
            onClose();
            return;
          }
        }

        if (isSubmitted) {
          const { totalCount } = await getActivityReviews(activityId, 1, 1);
          if (isCancelled) return;

          let myAllReviews: Review[] = [];
          if (totalCount > 0) {
            const { reviews } = await getActivityReviews(
              activityId,
              1,
              totalCount,
            );
            myAllReviews = reviews
              .filter((r) => r.user.id === me.id && r.activityId === activityId)
              .sort(
                (a, b) =>
                  new Date(a.createdAt).getTime() -
                  new Date(b.createdAt).getTime(),
              );
          }
          if (isCancelled) return;

          const submittedReservations = completedReservations.filter(
            (res) => res.reviewSubmitted,
          );
          const reviewIdx = submittedReservations.findIndex(
            (res) => res.id === reservationId,
          );

          if (!isCancelled) {
            setMyReview(
              reviewIdx !== -1 && myAllReviews[reviewIdx]
                ? myAllReviews[reviewIdx]
                : null,
            );
          }
        }
      } catch (error) {
        if (!isCancelled) {
          showToast(
            'error',
            error instanceof Error
              ? error.message
              : '데이터를 불러오는 데 실패했습니다.',
          );
        }
      } finally {
        if (!isCancelled) {
          setIsReviewLoading(false);
          setHasFetched(true);
        }
      }
    };

    verifyOrderAndFetch();

    return () => {
      isCancelled = true;
    };
  }, [
    isOpen,
    isSubmitted,
    activityId,
    reservationId,
    me?.id,
    reservationsData,
    showToast,
    onClose,
  ]);

  const reviewMutation = useMutation({
    mutationFn: () =>
      createReview(reservationId, { rating, content: reviewContent }),
    onSuccess: () => {
      showToast('success', '후기가 성공적으로 저장되었습니다!');
      onClose();
      queryClient.invalidateQueries({ queryKey: ['myReservations'] });
    },
    onError: (error) => {
      showToast(
        'error',
        error instanceof Error ? error.message : '후기 등록에 실패했습니다.',
      );
    },
  });

  const handleClose = () => {
    if (reviewMutation.isPending) return;
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
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
    <StandardModal isOpen={isOpen} onClose={handleClose}>
      {isReviewLoading || !hasFetched ? (
        <ReservationReviewModalSkeleton />
      ) : (
        <div className="w-full max-w-[480px] p-2 text-center">
          <div className="mb-6">
            <h2 className="text-black-1B1 text-lg font-bold sm:text-xl">
              {activityTitle}
            </h2>
            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
              {date} / {startTime}~{endTime} ({headCount}명)
            </p>
            {!isSubmitted && (
              <p className="mt-2 text-xs text-red-400">
                ※ 작성한 후기는 수정 및 삭제가 불가합니다.
              </p>
            )}
          </div>

          {isSubmitted ? (
            myReview ? (
              <>
                <div className="mb-6 flex justify-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className={`h-12 w-12 ${
                        star <= myReview.rating
                          ? 'fill-[#FFC107]'
                          : 'fill-[#E0E0E0]'
                      }`}
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <div className="rounded-xl border border-gray-200 p-4 text-left text-sm whitespace-pre-wrap text-gray-700">
                  {myReview.content}
                </div>
              </>
            ) : (
              <p className="text-sm text-gray-400">후기를 찾을 수 없습니다.</p>
            )
          ) : (
            <>
              <div className="mb-6 flex justify-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    disabled={reviewMutation.isPending}
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

              <form onSubmit={handleSubmit} className="text-left">
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
                      disabled={reviewMutation.isPending}
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
                  disabled={reviewMutation.isPending}
                  className="text-white-FFF mt-4 h-13.5 w-full rounded-xl font-bold"
                >
                  {reviewMutation.isPending ? '작성 중...' : '작성하기'}
                </Button>
              </form>
            </>
          )}
        </div>
      )}
    </StandardModal>
  );
}
