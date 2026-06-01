export interface CalendarDate {
  day: number;
  currentMonth: boolean;
  year: number;
  month: number;
  dateStr: string;
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

  const formatDate = (y: number, m: number, d: number) =>
    `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

  for (let i = firstDay - 1; i >= 0; i--) {
    const day = prevLastDate - i;
    dates.push({
      day,
      currentMonth: false,
      year: prevYear,
      month: prevMonth,
      dateStr: formatDate(prevYear, prevMonth, day),
    });
  }

  for (let i = 1; i <= lastDate; i++) {
    dates.push({
      day: i,
      currentMonth: true,
      year,
      month,
      dateStr: formatDate(year, month, i),
    });
  }

  let nextMonthDay = 1;
  while (dates.length < 42) {
    dates.push({
      day: nextMonthDay,
      currentMonth: false,
      year: nextYear,
      month: nextMonth,
      dateStr: formatDate(nextYear, nextMonth, nextMonthDay),
    });
    nextMonthDay++;
  }

  return dates;
};

export const getPrevMonth = (year: number, month: number) => {
  if (month === 0) {
    return { year: year - 1, month: 11 };
  }
  return { year, month: month - 1 };
};

export const getNextMonth = (year: number, month: number) => {
  if (month === 11) {
    return { year: year + 1, month: 0 };
  }
  return { year, month: month + 1 };
};
