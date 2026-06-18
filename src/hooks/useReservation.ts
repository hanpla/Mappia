'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import useToastStore from '@/stores/toastStore';

import { createReservation, getAvailableSchedules } from '@/lib/api/activities';

import { TimeSlot } from '@/types/activities';

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
  const [headCount, setHeadCount] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  const showToast = useToastStore((state) => state.showToast);

  const queryClient = useQueryClient();

  const yearStr = String(currentYear);
  const monthStr = String(currentMonth + 1).padStart(2, '0');

  const { data: availableSchedules = [] } = useQuery({
    queryKey: ['availableSchedules', activityId, yearStr, monthStr],
    queryFn: () => getAvailableSchedules(activityId, yearStr, monthStr),
    enabled: !!activityId,
  });

  const { mutate: reservationMutate, isPending } = useMutation({
    mutationFn: (scheduleId: number) =>
      createReservation(activityId, {
        scheduleId,
        headCount,
      }),
    onSuccess: () => {
      setIsModalOpen(true);
      setSelectedDateStr(null);
      setSelectedTimeSlot(null);
      setHeadCount(1);

      queryClient.invalidateQueries({
        queryKey: ['availableSchedules', activityId, yearStr, monthStr],
      });
    },
    onError: (error) => {
      const message =
        axios.isAxiosError<{ message?: string }>(error) &&
        error.response?.data?.message
          ? error.response.data.message
          : '체험 예약에 실패했습니다.';

      showToast('error', message);
    },
  });

  const totalPrice = initialPrice * headCount;

  const isSelectedDateInCurrentMonth = selectedDateStr
    ? selectedDateStr.startsWith(`${yearStr}-${monthStr}`)
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

  const handleReservation = () => {
    if (isPending) return;

    if (!selectedTimeSlot) {
      showToast('error', '예약할 시간을 선택해 주세요.');
      return;
    }

    reservationMutate(selectedTimeSlot.id);
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
