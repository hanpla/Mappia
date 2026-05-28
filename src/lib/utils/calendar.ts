// utils/calendar.ts

export interface CalendarDate {
  day: number;
  currentMonth: boolean;
  year: number;
  month: number;
}

export const generateCalendarDates = (year: number, month: number) => {
  const dates: CalendarDate[] = [];

  const firstDay = new Date(year, month, 1).getDay();

  const lastDate = new Date(year, month + 1, 0).getDate();

  const prevLastDate = new Date(year, month, 0).getDate();

  const prevYear = month === 0 ? year - 1 : year;
  const prevMonth = month === 0 ? 11 : month - 1;

  const nextYear = month === 11 ? year + 1 : year;
  const nextMonth = month === 11 ? 0 : month + 1;

  for (let i = firstDay - 1; i >= 0; i--) {
    dates.push({
      day: prevLastDate - i,
      currentMonth: false,
      year: prevYear,
      month: prevMonth,
    });
  }

  for (let i = 1; i <= lastDate; i++) {
    dates.push({
      day: i,
      currentMonth: true,
      year: year,
      month: month,
    });
  }

  while (dates.length < 42) {
    dates.push({
      day: dates.length - (firstDay + lastDate) + 1,
      currentMonth: false,
      year: nextYear,
      month: nextMonth,
    });
  }

  return dates;
};
