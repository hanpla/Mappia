'use client';

import useReservationDashboard from '@/hooks/useReservationDashboard';

import { MyActivity } from '@/types/my-activities';

import CalendarStatus from '../common/calendar/CalendarStatus';
import Dropdown from '../common/dropdown/Dropdown';

interface CalendarContentProps {
  activities: Pick<MyActivity, 'id' | 'title'>[];
}

export default function CalendarContent({ activities }: CalendarContentProps) {
  const options = activities.map((activity) => ({
    value: activity.id.toString(),
    label: activity.title,
  }));

  const {
    selectedActivityId,
    setSelectedActivityId,
    currentYear,
    currentMonth,
    eventsData,
    isLoading,
    handlePrevMonth,
    handleNextMonth,
  } = useReservationDashboard(options[0].value);

  return (
    <div className="space-y-6">
      <Dropdown
        type="select"
        options={options}
        value={selectedActivityId}
        onChange={setSelectedActivityId}
      />
      <div
        className={`transition-opacity duration-200 ${isLoading ? 'opacity-50' : 'opacity-100'}`}
      >
        <CalendarStatus
          eventsData={eventsData}
          currentYear={currentYear}
          currentMonth={currentMonth}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
        />
      </div>
    </div>
  );
}
