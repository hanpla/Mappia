'use client';

import useReservationModal from '@/hooks/useReservationModal';

import Dropdown from '@/components/common/dropdown/Dropdown';
import IconX from '@/components/common/icon/IconX';

import ReservationItem from './ReservationItem';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: string; // YYYY-MM-DD
  activityId: number;
}

const formatModalTitle = (dateStr: string): string => {
  const [year, month, day] = dateStr.split('-');
  const shortYear = year.slice(-2);
  return `${shortYear}년 ${parseInt(month, 10)}월 ${parseInt(day, 10)}일`;
};

// --- Local Helper Subcomponents ---
interface TabButtonProps {
  label: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
}

function TabButton({ label, count, isActive, onClick }: TabButtonProps) {
  const activeClass = 'border-nomad-112 text-nomad-112 border-b-2 font-bold';
  const inactiveClass = 'text-gray-A4A hover:text-black-1B1';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 cursor-pointer pb-2 text-center text-sm font-medium transition-colors md:text-base ${
        isActive ? activeClass : inactiveClass
      }`}
    >
      {label} {count}
    </button>
  );
}

export default function ReservationModal({
  isOpen,
  onClose,
  date,
  activityId,
}: ReservationModalProps) {
  const {
    activeTab,
    setActiveTab,
    selectedScheduleId,
    setSelectedScheduleId,
    filteredSchedules,
    timeOptions,
    isActivityLoading,
    isReservationsLoading,
    pendingCount,
    confirmedCount,
    declinedCount,
    currentReservations,
    handleUpdateStatus,
    isMutationPending,
  } = useReservationModal({ activityId, date, isOpen, onClose });

  if (!isOpen) return null;

  const hasSchedules = filteredSchedules.length > 0;

  return (
    <div
      onClick={onClose}
      className="animate-fade-in fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 lg:items-center lg:p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-slide-up font-pretendard lg:animate-zoom-in relative flex w-full max-w-full flex-col rounded-t-[24px] bg-white p-6 pb-10 shadow-xl lg:max-w-[429px] lg:rounded-[30px] lg:p-[50px_30px_40px]"
      >
        {/* 모바일 바텀시트 손잡이 */}
        <div className="bg-gray-DDD mx-auto mb-4 h-1 w-9 rounded-full lg:hidden" />

        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-6 z-50 cursor-pointer md:top-[26px] md:right-[30px] lg:top-[26px] lg:right-[30px]"
          aria-label="모달 닫기"
        >
          <IconX size={24} color="#1b1b1b" />
        </button>

        {/* 모달 헤더 */}
        <h2 className="text-black-1B1 text-left text-xl font-bold md:text-2xl">
          {formatModalTitle(date)}
        </h2>

        {/* 탭 헤더 */}
        <div className="border-gray-EEE mt-5 flex border-b">
          <TabButton
            label="신청"
            count={pendingCount}
            isActive={activeTab === 'pending'}
            onClick={() => setActiveTab('pending')}
          />
          <TabButton
            label="승인"
            count={confirmedCount}
            isActive={activeTab === 'confirmed'}
            onClick={() => setActiveTab('confirmed')}
          />
          <TabButton
            label="거절"
            count={declinedCount}
            isActive={activeTab === 'declined'}
            onClick={() => setActiveTab('declined')}
          />
        </div>

        {/* 예약 시간 드롭다운 */}
        <div className="mt-6">
          <span className="text-black-1B1 text-sm font-bold md:text-base">
            예약 시간
          </span>
          <div className="mt-2">
            {isActivityLoading ? (
              <div className="border-gray-DDD flex h-14 w-full items-center justify-center rounded-2xl border bg-gray-50 text-xs text-gray-400">
                시간대를 불러오는 중...
              </div>
            ) : hasSchedules ? (
              <Dropdown
                type="select"
                options={timeOptions}
                value={selectedScheduleId}
                onChange={setSelectedScheduleId}
                placeholder="시간대 선택"
              />
            ) : (
              <div className="border-gray-DDD flex h-14 w-full items-center justify-center rounded-2xl border bg-gray-50 text-xs text-gray-400">
                등록된 시간대가 없습니다.
              </div>
            )}
          </div>
        </div>

        {/* 예약 내역 리스트 */}
        <div className="mt-6 flex flex-col">
          <span className="text-black-1B1 text-sm font-bold md:text-base">
            예약 내역
          </span>

          <div className="mt-3 min-h-[120px]">
            {!hasSchedules ? (
              <div className="flex min-h-[120px] items-center justify-center text-xs text-gray-400 md:text-sm">
                해당 날짜에 등록된 일정이 없습니다.
              </div>
            ) : isReservationsLoading ? (
              <div className="flex min-h-[120px] items-center justify-center text-xs text-gray-400 md:text-sm">
                예약 내역을 불러오는 중...
              </div>
            ) : currentReservations.length === 0 ? (
              <div className="flex min-h-[120px] items-center justify-center text-xs text-gray-400 md:text-sm">
                예약 내역이 없습니다.
              </div>
            ) : (
              <div className="max-h-[280px] space-y-3 overflow-y-auto pr-1">
                {currentReservations.map((resItem) => (
                  <ReservationItem
                    key={resItem.id}
                    item={resItem}
                    showActionButtons={activeTab === 'pending'}
                    onUpdateStatus={handleUpdateStatus}
                    isMutationPending={isMutationPending}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
