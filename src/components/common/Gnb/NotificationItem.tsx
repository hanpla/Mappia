import { formatTimeAgo } from '@/lib/utils/date';

type NotificationType = 'approved' | 'rejected' | 'new';

export interface NotificationData {
  id: number;
  teamId: string;
  userId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface NotificationResponse {
  cursorId: number;
  notifications: NotificationData[];
  totalCount: number;
}

const KEYWORD_MAP: Record<NotificationType, string> = {
  approved: '승인',
  rejected: '거절',
  new: '새로 들어왔어요',
};

const COLOR_MAP: Record<NotificationType, string> = {
  approved: '#0080FF',
  rejected: '#FF472E',
  new: '#00AC07',
};

function detectType(content: string): NotificationType {
  if (content.includes('승인')) return 'approved';
  if (content.includes('거절')) return 'rejected';
  return 'new';
}

interface NotificationItemProps {
  data: NotificationData;
  onDismiss: () => void;
}

export default function NotificationItem({
  data,
  onDismiss,
}: NotificationItemProps) {
  const type = detectType(data.content);
  const keyword = KEYWORD_MAP[type];
  const color = COLOR_MAP[type];
  const parts = data.content.split(keyword);

  return (
    <div
      className="rounded-lg border border-[#E5E4E7] bg-white p-4"
      style={{ boxShadow: '0px 2px 8px rgba(125, 121, 134, 0.25)' }}
    >
      <div className="mb-2 flex items-center justify-between">
        <div
          className="h-1.25 w-1.25 rounded-full"
          style={{ backgroundColor: color }}
        />
        <button
          onClick={onDismiss}
          aria-label="알림 닫기"
          className="flex h-6 w-6 items-center justify-center text-2xl leading-none text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      </div>
      <p className="mb-1 pr-6 text-sm font-normal text-[#111322]">
        {parts[0]}
        <span style={{ color }}>{keyword}</span>
        {parts.slice(1).join(keyword)}
      </p>
      <p className="text-xs font-normal text-[#A4A1AA]">
        {formatTimeAgo(data.createdAt)}
      </p>
    </div>
  );
}
