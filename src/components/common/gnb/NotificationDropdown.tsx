import NotificationItem, { NotificationData } from './NotificationItem';

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
    <div className="bg-green-CED absolute top-full right-0 z-50 mt-2 w-96 rounded-lg p-4 shadow-[0px_2px_8px_rgba(120,116,134,0.25)]">
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
      <div className="scrollbar-custom flex max-h-96 flex-col gap-2 overflow-y-auto">
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
