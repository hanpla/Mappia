import type { ActivityReservationItem } from '@/types/my-activities';

import Button from '@/components/common/button/Button';

interface ReservationItemProps {
  item: ActivityReservationItem;
  showActionButtons: boolean;
  onUpdateStatus: (id: number, status: 'confirmed' | 'declined') => void;
  isMutationPending: boolean;
}

export default function ReservationItem({
  item,
  showActionButtons,
  onUpdateStatus,
  isMutationPending,
}: ReservationItemProps) {
  return (
    <div className="border-gray-EEE flex items-center justify-between rounded-2xl border bg-white p-4">
      <div className="flex flex-col gap-1 text-left text-xs md:text-sm">
        <div className="flex items-center">
          <span className="text-gray-CBC mr-2 shrink-0 font-medium">
            닉네임
          </span>
          <span className="text-black-1B1 font-semibold">
            {item.nickname || item.user?.nickname || '익명'}
          </span>
        </div>
        <div className="flex items-center">
          <span className="text-gray-CBC mr-2 shrink-0 font-medium">인원</span>
          <span className="text-black-1B1 font-semibold">
            {item.headCount}명
          </span>
        </div>
      </div>

      {showActionButtons && (
        <div className="flex shrink-0 flex-col gap-1">
          <Button
            type="button"
            variant="solid"
            onClick={() => onUpdateStatus(item.id, 'confirmed')}
            disabled={isMutationPending}
            className="border-gray-DDD bg-beige-8B7 hover:bg-beige-8B7 h-8 rounded-lg px-3 py-1.5 text-xs font-bold text-white hover:text-white"
          >
            승인하기
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => onUpdateStatus(item.id, 'declined')}
            disabled={isMutationPending}
            className="border-beige-8B7 text-beige-8B7 hover:text-beige-8B7 h-8 rounded-lg px-3 py-1.5 text-xs font-bold hover:bg-white"
          >
            거절하기
          </Button>
        </div>
      )}
    </div>
  );
}
