'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

import axios from 'axios';

import useToastStore from '@/stores/toastStore';

import { createReservation, getAvailableSchedules } from '@/lib/api/activities';

import { ScheduleWithTimes, TimeSlot } from '@/types/activities';

export default function useReservation(
  activityId: number,
  initialPrice: number,
) {
  const [currentYear, setCurrentYear] = useState(() =>
    new Date().getFullYear(),
  );
  const [currentMonth, setCurrentMonth] = useState(() => new Date().getMonth());
  const [selectedDateStr, setSelectedDateStr] = useState<string | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(
    null,
  );
  const [availableSchedules, setAvailableSchedules] = useState<
    ScheduleWithTimes[]
  >([]);
  const [headCount, setHeadCount] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  const showToast = useToastStore((state) => state.showToast);

  const requestVersion = useRef(0);

  const loadAvailableSchedules = useCallback(async () => {
    const version = ++requestVersion.current;
    const year = String(currentYear);
    const month = String(currentMonth + 1).padStart(2, '0');

    const data = await getAvailableSchedules(activityId, year, month);
    if (version === requestVersion.current) {
      setAvailableSchedules(data);
    }
  }, [activityId, currentYear, currentMonth]);

  useEffect(() => {
    loadAvailableSchedules();
  }, [loadAvailableSchedules]);

  const totalPrice = initialPrice * headCount;

  const isSelectedDateInCurrentMonth = selectedDateStr
    ? selectedDateStr.startsWith(
        `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`,
      )
    : false;

  const selectedDateTimes =
    availableSchedules.find((s) => s.date === selectedDateStr)?.times ?? [];

  const handleDateChange = (date: string | null) => {
    setSelectedDateStr(date);
    setSelectedTimeSlot(null);
  };

  const handleMonthChange = (year: number, month: number) => {
    setCurrentYear(year);
    setCurrentMonth(month);
    setSelectedDateStr(null);
    setSelectedTimeSlot(null);
  };

  const handleDecrease = () => setHeadCount((prev) => Math.max(1, prev - 1));
  const handleIncrease = () => setHeadCount((prev) => prev + 1);

  const handleReservation = async () => {
    if (!selectedTimeSlot) {
      showToast('error', '예약할 시간을 선택해 주세요.');
      return;
    }

    try {
      await createReservation(activityId, {
        scheduleId: selectedTimeSlot.id,
        headCount: headCount,
      });

      setIsModalOpen(true);
      setSelectedDateStr(null);
      setSelectedTimeSlot(null);
      setHeadCount(1);

      await loadAvailableSchedules();
    } catch (error) {
      const message =
        axios.isAxiosError<{ message?: string }>(error) &&
        error.response?.data?.message
          ? error.response.data.message
          : '체험 예약에 실패했습니다.';

      showToast('error', message);
    }
  };

  const handleNavigation = () => {
    setIsModalOpen(false);

    router.push('/profile/reservations');
  };

  return {
    currentYear,
    currentMonth,
    availableSchedules,
    selectedDateStr,
    selectedTimeSlot,
    setSelectedTimeSlot,
    headCount,
    isModalOpen,
    setIsModalOpen,
    totalPrice,
    isSelectedDateInCurrentMonth,
    selectedDateTimes,
    handleDateChange,
    handleMonthChange,
    handleDecrease,
    handleIncrease,
    handleReservation,
    handleNavigation,
  };
}
