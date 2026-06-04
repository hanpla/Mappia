'use client';

import Image from 'next/image';
import { useState } from 'react';

import Button from '@/components/common/button/Button';
import Textarea from '@/components/common/input/Textarea';
import ConfirmModal from '@/components/common/modal/ConfirmModal';
import StandardModal from '@/components/common/modal/StandardModal';

import LogoHead from '@/assets/logo/logo_head-1.svg';

export interface ReservationItem {
  id: number;
  status: 'pending' | 'canceled' | 'approved' | 'declined' | 'completed';
  activityName: string;
  date: string;
  time: string;
  headcount: number;
  price: number;
  imageUrl: string;
}

const STATUS_MAPPER = {
  pending: { label: '예약 완료', className: 'text-blue-500' },
  approved: { label: '예약 승인', className: 'text-yellow-FFC' },
  canceled: { label: '예약 취소', className: 'text-gray-797' },
  declined: { label: '예약 거절', className: 'text-red-FF4' },
  completed: {
    label: '체험 완료',
    className: 'text-gray-797 bg-gray-EEE px-2 py-0.5 rounded text-xs w-max',
  },
};

interface ReservationCardProps {
  item: ReservationItem;
  onRefresh?: () => void;
}

export default function ReservationCard({
  item,
  onRefresh,
}: ReservationCardProps) {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [reviewContent, setReviewContent] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!item) {
    console.warn('ReservationCard: 유효하지 않은 데이터가 넘어왔습니다.');
    return null;
  }

  const currentStatus = STATUS_MAPPER[item.status] || {
    label: item.status,
    className: 'text-black-1B1',
  };

  const handleReviewClick = () => {
    setRating(0);
    setReviewContent('');
    setIsReviewModalOpen(true);
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return alert('별점을 선택해 주세요.');
    if (!reviewContent.trim()) return alert('후기 내용을 입력해 주세요.');

    try {
      setIsSubmitting(true);
      alert('후기가 성공적으로 저장되었습니다!');
      setIsReviewModalOpen(false);
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error(error);
      alert('후기 등록에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelClick = () => {
    setIsCancelModalOpen(true);
  };

  const handleCancelConfirm = async () => {
    try {
      setIsSubmitting(true);
      alert(`[${item.activityName}] 예약 취소가 완료되었습니다.`);
      setIsCancelModalOpen(false);
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error(error);
      alert('예약 취소에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white-FFF border-gray-DDD hover:shadow-dropdown flex h-[200px] w-full overflow-hidden rounded-2xl border transition-all">
      <div className="bg-gray-FAF relative h-full w-[200px] flex-shrink-0">
        <Image
          src={item.imageUrl || '/default-thumbnail.png'}
          alt={item.activityName}
          fill
          sizes="200px"
          className="object-cover"
        />
      </div>

      <div className="flex flex-grow flex-col justify-between p-6">
        <div>
          <span className={`text-sm font-semibold ${currentStatus.className}`}>
            {currentStatus.label}
          </span>
          <h3 className="text-black-1B1 mt-1.5 truncate text-lg font-bold">
            {item.activityName}
          </h3>
          <p className="textlg-medium mt-1 text-sm text-gray-500">
            {item.date} • {item.time} • {item.headcount}명
          </p>
        </div>

        <div className="flex items-end justify-between gap-4">
          <span className="text-black-1B1 flex-shrink-0 text-xl font-bold">
            ₩{item.price.toLocaleString()}
          </span>

          <div className="flex flex-grow justify-end">
            {item.status === 'approved' && (
              <Button
                type="button"
                variant="outline"
                onClick={handleCancelClick}
                disabled={isSubmitting}
                hasHover={false}
                className="hover:bg-gray-FAF hover:text-brown-2A2"
              >
                예약 취소
              </Button>
            )}

            {item.status === 'completed' && (
              <Button
                type="button"
                variant="solid"
                onClick={handleReviewClick}
                disabled={isSubmitting}
                hasHover={false}
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
        onConfirm={handleCancelConfirm}
        icon={
          <div className="relative h-[88px] w-[88px]">
            <Image
              src={LogoHead.src || LogoHead}
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
        <div className="w-full max-w-[440px] px-1 py-1 text-left">
          <h2 className="text-black-1B1 mb-4 text-lg font-bold sm:mb-6 sm:text-2xl">
            후기 작성
          </h2>

          <div className="mb-6 flex gap-3 border-b border-gray-200 pb-6">
            <div className="relative h-[72px] w-[72px] flex-shrink-0 overflow-hidden rounded-xl sm:h-[100px] sm:w-[100px]">
              <Image
                src={item.imageUrl || '/default-thumbnail.png'}
                alt={item.activityName}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex min-w-0 flex-col justify-center">
              <h4 className="text-black-1B1 mb-0.5 line-clamp-1 text-xs font-bold sm:mb-1 sm:text-base">
                {item.activityName}
              </h4>
              <p className="mb-1 text-[11px] whitespace-nowrap text-gray-500 sm:mb-2 sm:text-sm">
                {item.date} • {item.time} • {item.headcount}명
              </p>
              <span className="text-black-1B1 text-base font-bold sm:text-xl">
                ₩{item.price.toLocaleString()}
              </span>
            </div>
          </div>

          <form
            onSubmit={handleReviewSubmit}
            className="flex flex-col items-center"
          >
            <div className="mb-6 flex justify-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => setRating(star)}
                  className="p-1 transition-transform outline-none active:scale-95 disabled:opacity-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className={`h-11 w-11 transition-colors duration-150 ${
                      star <= rating ? 'fill-[#FFC107]' : 'fill-[#E0E0E0]'
                    }`}
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                </button>
              ))}
            </div>

            <div className="mb-6 w-full">
              <Textarea
                id="review-text"
                placeholder="후기를 작성해주세요"
                rows={5}
                value={reviewContent}
                disabled={isSubmitting}
                onChange={(e) => setReviewContent(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              variant="solid"
              size="lg"
              hasHover={false}
              disabled={isSubmitting}
              className="text-white-FFF h-[54px] w-full rounded-xl font-bold"
            >
              {isSubmitting ? '작성 중...' : '작성하기'}
            </Button>
          </form>
        </div>
      </StandardModal>
    </div>
  );
}
