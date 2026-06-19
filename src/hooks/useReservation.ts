'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import useToastStore from '@/stores/toastStore';

import { createReservation, getAvailableSchedules } from '@/lib/api/activities';
import { buildLoginUrl } from '@/lib/utils/redirect';

import { TimeSlot } from '@/types/activities';

import { useIsLogin } from '@/providers/AuthProvider';

export default function useReservation(
  activityId: number,
  initialPrice: number,
  options?: {
    initialDate?: string;
    initialTimeSlot?: TimeSlot;
    initialHeadCount?: number;
  },
) {
  const [currentYear, setCurrentYear] = useState(() => {
    if (options?.initialDate) {
      return new Date(options.initialDate).getFullYear();
    }
    return new Date().getFullYear();
  });
  const [currentMonth, setCurrentMonth] = useState(() => {
    if (options?.initialDate) {
      return new Date(options.initialDate).getMonth();
    }
    return new Date().getMonth();
  });
  const [selectedDateStr, setSelectedDateStr] = useState<string | null>(
    options?.initialDate ?? null,
  );
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(
    options?.initialTimeSlot ?? null,
  );
  const [headCount, setHeadCount] = useState<number>(
    options?.initialHeadCount ?? 1,
  );
  const [modalType, setModalType] = useState<'success' | 'login' | null>(null);

  const router = useRouter();

  const showToast = useToastStore((state) => state.showToast);

  const queryClient = useQueryClient();

  const isLogin = useIsLogin();

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
      setModalType('success');
      setSelectedDateStr(null);
      setSelectedTimeSlot(null);
      setHeadCount(1);

      queryClient.invalidateQueries({
        queryKey: ['availableSchedules', activityId, yearStr, monthStr],
      });
    },
    onError: (error) => {
      let message = '체험 예약에 실패했습니다.';

      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 400) {
          message = '이미 지난 일정은 예약할 수 없습니다.';
        } else if (status === 409) {
          message = '확정 예약이 있는 일정은 예약할 수 없습니다.';
        }
      }

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

    if (!isLogin) {
      setModalType('login');
      return;
    }

    if (!selectedTimeSlot) {
      showToast('error', '예약할 시간을 선택해 주세요.');
      return;
    }

    reservationMutate(selectedTimeSlot.id);
  };

  const handleNavigationSuccess = () => {
    setModalType(null);

    router.push('/profile/reservations');
  };

  const handleNavigationLogin = () => {
    setModalType(null);

    router.push(
      buildLoginUrl(window.location.pathname + window.location.search),
    );
  };

  return {
    currentYear,
    currentMonth,
    availableSchedules,
    selectedDateStr,
    selectedTimeSlot,
    setSelectedTimeSlot,
    headCount,
    modalType,
    setModalType,
    totalPrice,
    isSelectedDateInCurrentMonth,
    selectedDateTimes,
    handleDateChange,
    handleMonthChange,
    handleDecrease,
    handleIncrease,
    handleReservation,
    handleNavigationSuccess,
    handleNavigationLogin,
  };
}
