import { ReservationStatus } from '@/types/activities';
import { MyReservationItem } from '@/types/my-reservations';

export const getEffectiveStatus = (
  item: MyReservationItem,
): ReservationStatus => {
  const now = new Date();
  const endDateTime = new Date(`${item.date}T${item.endTime}:00+09:00`);
  const isPastEnd = now > endDateTime;

  if (item.status === 'pending' && isPastEnd) {
    return 'completed';
  }
  return item.status;
};
