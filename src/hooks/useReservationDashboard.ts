import { useMemo, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { getReservationDashboard } from '@/lib/api/my-activities';
import { getNextMonth, getPrevMonth } from '@/lib/utils/calendar';

import type { ReservationDashboardItem } from '@/types/my-activities';

import type {
  CalendarStatusData,
  ReservationEvent,
} from '@/components/common/calendar/CalendarStatus';

const mapApiDataToCalendarData = (
  apiData: ReservationDashboardItem[],
): CalendarStatusData => {
  const result: CalendarStatusData = {};
  apiData.forEach((item) => {
    const badges: ReservationEvent[] = [];
    if (item.reservations.completed > 0) {
      badges.push({ status: 'complete', count: item.reservations.completed });
    }
    if (item.reservations.confirmed > 0) {
      badges.push({ status: 'confirmed', count: item.reservations.confirmed });
    }
    if (item.reservations.pending > 0) {
      badges.push({ status: 'reservation', count: item.reservations.pending });
    }

    if (badges.length > 0) {
      result[item.date] = {
        badges,
      };
    }
  });
  return result;
};

const useReservationDashboard = (initialActivityId: string) => {
  const [selectedActivityId, setSelectedActivityId] =
    useState(initialActivityId);

  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());

  const { data: apiData = [], isPending } = useQuery({
    queryKey: [
      'reservation-dashboard',
      selectedActivityId,
      currentYear,
      currentMonth,
    ],
    queryFn: () =>
      getReservationDashboard(
        Number(selectedActivityId),
        String(currentYear),
        String(currentMonth + 1).padStart(2, '0'),
      ),
    enabled: !!selectedActivityId,
    staleTime: 1 * 60 * 1000,
  });

  const eventsData = useMemo(
    () => mapApiDataToCalendarData(apiData),
    [apiData],
  );

  const handlePrevMonth = () => {
    const { year, month } = getPrevMonth(currentYear, currentMonth);
    setCurrentYear(year);
    setCurrentMonth(month);
  };

  const handleNextMonth = () => {
    const { year, month } = getNextMonth(currentYear, currentMonth);
    setCurrentYear(year);
    setCurrentMonth(month);
  };

  return {
    selectedActivityId,
    setSelectedActivityId,
    currentYear,
    currentMonth,
    eventsData,
    isLoading: isPending,
    handlePrevMonth,
    handleNextMonth,
  };
};

export default useReservationDashboard;
