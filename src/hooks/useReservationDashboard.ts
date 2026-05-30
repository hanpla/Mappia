import { useEffect, useState } from 'react';

import {
  MOCK_RESERVATION_DASHBOARD,
  ReservationDashboardItem,
} from '@/lib/mock-data/reservations';
import { getNextMonth, getPrevMonth } from '@/lib/utils/calendar';

import {
  CalendarStatusData,
  ReservationEvent,
} from '@/components/common/calendar/CalendarStatus';

const fetchMonthlyReservations = (
  activityId: number,
  year: number,
  month: number, // 1 ~ 12
): Promise<ReservationDashboardItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockData: ReservationDashboardItem[] = [];

      if (year === 2026 && month === 5) {
        const dashboardData = MOCK_RESERVATION_DASHBOARD[activityId] || [];
        mockData.push(...dashboardData);
      }

      resolve(mockData);
    }, 500);
  });
};

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

export default function useReservationDashboard(initialActivityId: string) {
  const [selectedActivityId, setSelectedActivityId] =
    useState(initialActivityId);

  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());

  const [eventsData, setEventsData] = useState<CalendarStatusData>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    const loadDashboardData = async () => {
      setIsLoading(true);
      try {
        const activityId = Number(selectedActivityId);
        const apiMonth = currentMonth + 1;
        const data = await fetchMonthlyReservations(
          activityId,
          currentYear,
          apiMonth,
        );

        if (!isCancelled) {
          const calendarData = mapApiDataToCalendarData(data);
          setEventsData(calendarData);
        }
      } catch (e) {
        console.error(e);
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    loadDashboardData();

    return () => {
      isCancelled = true;
    };
  }, [selectedActivityId, currentYear, currentMonth]);

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
    isLoading,
    handlePrevMonth,
    handleNextMonth,
  };
}
