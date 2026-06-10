import { useEffect, useMemo, useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import useToastStore from '@/stores/toastStore';

import {
  getActivityDetail,
  getReservations,
  updateReservationStatus,
} from '@/lib/api/my-activities';

interface UseReservationModalProps {
  activityId: number;
  date: string;
  isOpen: boolean;
  onClose: () => void;
}

const useReservationModal = ({
  activityId,
  date,
  isOpen,
  onClose,
}: UseReservationModalProps) => {
  const queryClient = useQueryClient();
  const showToast = useToastStore((state) => state.showToast);

  const [activeTab, setActiveTab] = useState<
    'pending' | 'confirmed' | 'declined'
  >('pending');
  const [selectedScheduleIdState, setSelectedScheduleIdState] =
    useState<string>('');

  // 1. 체험 상세 데이터 조회 (schedules 목록 추출용)
  const { data: activityDetail, isLoading: isActivityLoading } = useQuery({
    queryKey: ['activity-detail', activityId],
    queryFn: () => getActivityDetail(activityId),
    enabled: !!activityId && isOpen,
  });

  // 해당 일자(date)에 설정된 일정 목록 필터링
  const filteredSchedules = useMemo(() => {
    if (!activityDetail?.schedules) return [];
    return activityDetail.schedules.filter((s) => s.date === date);
  }, [activityDetail, date]);

  // 드롭다운 옵션 가공
  const timeOptions = useMemo(() => {
    return filteredSchedules.map((s) => ({
      value: s.id.toString(),
      label: `${s.startTime} - ${s.endTime}`,
    }));
  }, [filteredSchedules]);

  // 필터링된 일정 중 현재 상태값이 존재하는지 확인
  const isScheduleExists = filteredSchedules.some(
    (s) => s.id.toString() === selectedScheduleIdState,
  );

  // 현재 상태가 유효하지 않고 일정이 있다면 첫 번째 일정을 사용, 일정이 없다면 빈 문자열 사용
  const selectedScheduleId = isScheduleExists
    ? selectedScheduleIdState
    : filteredSchedules.length > 0
      ? filteredSchedules[0].id.toString()
      : '';

  // 렌더링 중에 필요할 시 동기적으로 상태를 맞춰줍니다. (React 18+ 권장 패턴)
  if (selectedScheduleId !== selectedScheduleIdState) {
    setSelectedScheduleIdState(selectedScheduleId);
  }

  // 2. 예약 내역 조회 (상태별 3개 쿼리 병렬 처리)
  const scheduleIdNum = Number(selectedScheduleId);

  const { data: pendingData, isLoading: isPendingLoading } = useQuery({
    queryKey: ['reservations', activityId, scheduleIdNum, 'pending'],
    queryFn: () =>
      getReservations(activityId, {
        scheduleId: scheduleIdNum,
        status: 'pending',
        size: 100,
      }),
    enabled: !!selectedScheduleId && isOpen,
  });

  const { data: confirmedData, isLoading: isConfirmedLoading } = useQuery({
    queryKey: ['reservations', activityId, scheduleIdNum, 'confirmed'],
    queryFn: () =>
      getReservations(activityId, {
        scheduleId: scheduleIdNum,
        status: 'confirmed',
        size: 100,
      }),
    enabled: !!selectedScheduleId && isOpen,
  });

  const { data: declinedData, isLoading: isDeclinedLoading } = useQuery({
    queryKey: ['reservations', activityId, scheduleIdNum, 'declined'],
    queryFn: () =>
      getReservations(activityId, {
        scheduleId: scheduleIdNum,
        status: 'declined',
        size: 100,
      }),
    enabled: !!selectedScheduleId && isOpen,
  });

  // 3. 승인/거절 처리 Mutation
  const statusMutation = useMutation({
    mutationFn: ({
      reservationId,
      status,
    }: {
      reservationId: number;
      status: 'confirmed' | 'declined';
    }) => updateReservationStatus(activityId, reservationId, status),
    onSuccess: (_, variables) => {
      // 대시보드 달력 데이터 & 예약 건 리스트 쿼리 갱신
      queryClient.invalidateQueries({
        queryKey: ['reservation-dashboard'],
      });
      queryClient.invalidateQueries({
        queryKey: ['reservations', activityId, scheduleIdNum],
      });

      const actionText = variables.status === 'confirmed' ? '승인' : '거절';
      showToast('success', `예약이 성공적으로 ${actionText}되었습니다.`);
    },
    onError: (err: Error) => {
      const message =
        axios.isAxiosError<{ message?: string }>(err) &&
        err.response?.data?.message
          ? err.response.data.message
          : err.message || '예약 상태 업데이트에 실패했습니다.';
      showToast('error', message);
    },
  });

  const handleUpdateStatus = (
    reservationId: number,
    status: 'confirmed' | 'declined',
  ) => {
    statusMutation.mutate({ reservationId, status });
  };

  const pendingCount = pendingData?.totalCount ?? 0;
  const confirmedCount = confirmedData?.totalCount ?? 0;
  const declinedCount = declinedData?.totalCount ?? 0;

  const currentReservations = useMemo(() => {
    if (activeTab === 'pending') return pendingData?.reservations ?? [];
    if (activeTab === 'confirmed') return confirmedData?.reservations ?? [];
    return declinedData?.reservations ?? [];
  }, [activeTab, pendingData, confirmedData, declinedData]);

  const isReservationsLoading =
    isPendingLoading || isConfirmedLoading || isDeclinedLoading;

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return {
    activeTab,
    setActiveTab,
    selectedScheduleId,
    setSelectedScheduleId: setSelectedScheduleIdState,
    filteredSchedules,
    timeOptions,
    isActivityLoading,
    isReservationsLoading,
    pendingCount,
    confirmedCount,
    declinedCount,
    currentReservations,
    handleUpdateStatus,
    isMutationPending: statusMutation.isPending,
  };
};

export default useReservationModal;
