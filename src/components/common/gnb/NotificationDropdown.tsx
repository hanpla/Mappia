import NotificationItem, { NotificationData } from './NotificationItem';

export const INITIAL_NOTIFICATIONS: NotificationData[] = [
  {
    id: 1,
    teamId: 'team-1',
    userId: 1,
    content:
      '함께하면 즐거운 스트릿 댄스(2023-01-14 15:00~18:00) 예약이 승인되었어요.',
    createdAt: '2026-05-26T13:37:00.000Z',
    updatedAt: '2026-05-26T13:37:00.000Z',
    deletedAt: null,
  },
  {
    id: 2,
    teamId: 'team-1',
    userId: 1,
    content: '힙합 비트와 함께(2023-01-15 14:00~16:00) 예약이 거절되었어요.',
    createdAt: '2026-05-26T12:44:00.000Z',
    updatedAt: '2026-05-26T12:44:00.000Z',
    deletedAt: null,
  },
  {
    id: 3,
    teamId: 'team-1',
    userId: 1,
    content:
      '관심 카테고리의 비보이 배틀(2023-01-20 18:00~21:00) 공연이 새로 들어왔어요.',
    createdAt: '2026-05-26T11:44:00.000Z',
    updatedAt: '2026-05-26T11:44:00.000Z',
    deletedAt: null,
  },
  {
    id: 4,
    teamId: 'team-1',
    userId: 1,
    content: '비보이 입문 클래스(2023-01-16 13:00~15:00) 예약이 승인되었어요.',
    createdAt: '2026-05-26T10:44:00.000Z',
    updatedAt: '2026-05-26T10:44:00.000Z',
    deletedAt: null,
  },
  {
    id: 5,
    teamId: 'team-1',
    userId: 1,
    content: '팝핀 기초(2023-01-17 10:00~12:00) 예약이 거절되었어요.',
    createdAt: '2026-05-25T13:44:00.000Z',
    updatedAt: '2026-05-25T13:44:00.000Z',
    deletedAt: null,
  },
  {
    id: 6,
    teamId: 'team-1',
    userId: 1,
    content:
      '관심 카테고리의 락킹 댄스(2023-01-22 19:00~22:00) 공연이 새로 들어왔어요.',
    createdAt: '2026-05-24T13:44:00.000Z',
    updatedAt: '2026-05-24T13:44:00.000Z',
    deletedAt: null,
  },
];

interface NotificationDropdownProps {
  notifications: NotificationData[];
  onDismiss: (id: number) => void;
  onClose: () => void;
}

export default function NotificationDropdown({
  notifications,
  onDismiss,
  onClose,
}: NotificationDropdownProps) {
  return (
    <div
      className="absolute top-full right-0 z-50 mt-2 w-96 rounded-lg bg-[#CED8D5] p-4"
      style={{ boxShadow: '0px 2px 8px rgba(120, 116, 134, 0.25)' }}
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="font-medium text-[#111322]">
          알림 {notifications.length}개
        </span>
        <button
          onClick={onClose}
          aria-label="알림창 닫기"
          className="flex h-6 w-6 items-center justify-center text-2xl leading-none text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      </div>
      <div className="flex max-h-96 flex-col gap-2 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-2 [&::-webkit-scrollbar-thumb]:border-solid [&::-webkit-scrollbar-thumb]:border-transparent [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-thumb]:bg-clip-padding [&::-webkit-scrollbar-track]:bg-transparent">
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            data={notification}
            onDismiss={() => onDismiss(notification.id)}
          />
        ))}
      </div>
    </div>
  );
}
