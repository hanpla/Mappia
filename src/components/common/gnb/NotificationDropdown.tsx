import NotificationItem, { NotificationData } from './NotificationItem';

interface NotificationDropdownProps {
  notifications: NotificationData[];
  onDismiss: (id: number) => void;
  onDismissAll: () => void;
  onClose: () => void;
}

export default function NotificationDropdown({
  notifications,
  onDismiss,
  onDismissAll,
  onClose,
}: NotificationDropdownProps) {
  return (
    <div className="bg-green-CED absolute top-full right-0 z-50 mt-2 w-96 rounded-lg p-4 shadow-[0px_2px_8px_rgba(120,116,134,0.25)] max-md:fixed max-md:top-16 max-md:right-4 max-md:left-4 max-md:mx-auto max-md:mt-0 max-md:w-auto max-md:max-w-100">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-medium text-[#111322]">
            알림 {notifications.length}개
          </span>
          {notifications.length > 0 && (
            <button
              onClick={onDismissAll}
              aria-label="알림 전체 지우기"
              className="text-gray-797 text-xs font-normal underline hover:text-[#111322]"
            >
              전체 지우기
            </button>
          )}
        </div>
        <button
          onClick={onClose}
          aria-label="알림창 닫기"
          className="flex h-6 w-6 items-center justify-center text-2xl leading-none text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      </div>
      <div className="scrollbar-custom -m-2.5 flex max-h-96 flex-col gap-2 overflow-y-auto overscroll-contain p-2.5 max-md:max-h-72">
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
