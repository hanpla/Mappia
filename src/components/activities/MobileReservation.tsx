'use client';

import { useState } from 'react';

import useReservation from '@/hooks/useReservation';

import { ActivityDetailContent } from '@/types/activities';

import Button from '../common/button/Button';
import LogoJoy from '../common/logo/LogoJoy';
import ConfirmModal from '../common/modal/ConfirmModal';
import MobileReservationSheet from './MobileReservationSheet';

interface MobileReservationProps {
  activity: ActivityDetailContent;
}

export default function MobileReservation({
  activity,
}: MobileReservationProps) {
  const { id, price } = activity;

  const [isOpen, setIsOpen] = useState(false);

  const reservationState = useReservation(id, price);
  const {
    selectedDateStr,
    selectedTimeSlot,
    totalPrice,
    headCount,
    isModalOpen,
    setIsModalOpen,
    handleReservation,
    handleNavigation,
  } = reservationState;

  const formatSelectedText = () => {
    if (!selectedDateStr || !selectedTimeSlot) return '날짜 선택하기';

    const [yy, mm, dd] = selectedDateStr.split('-').map((s) => s.slice(-2));

    return `${yy}/${mm}/${dd} ${selectedTimeSlot.startTime} ~ ${selectedTimeSlot.endTime}`;
  };

  return (
    <>
      <div className="fixed right-0 bottom-0 left-0 z-50 border-t border-[#E6E6E6] bg-white p-[18px_24px] shadow-[0_-4px_12px_rgba(0,0,0,0.05)] lg:hidden">
        <div className="mb-3 flex flex-row items-center justify-between">
          <div className="flex flex-row items-baseline gap-1.5">
            <span className="text2lg-bold">
              ₩ {totalPrice.toLocaleString()}
            </span>
            <span className="textlg-medium text-gray-797">/ {headCount}명</span>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="textlg-bold text-brown-2A2 underline decoration-2 underline-offset-4"
          >
            {formatSelectedText()}
          </button>
        </div>
        <Button
          variant="solid"
          onClick={handleReservation}
          disabled={!selectedTimeSlot}
          hasHover={false}
          className="w-full"
        >
          예약하기
        </Button>
      </div>

      <MobileReservationSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        {...reservationState}
      />

      <ConfirmModal
        isOpen={isModalOpen}
        icon={<LogoJoy className="h-13 w-13 md:h-20 md:w-20" />}
        message="예약이 완료되었습니다."
        cancelText="닫기"
        confirmText="예약확인"
        onClose={() => {
          setIsModalOpen(false);
          setIsOpen(false);
        }}
        onConfirm={() => {
          setIsOpen(false);
          handleNavigation();
        }}
      />
    </>
  );
}
