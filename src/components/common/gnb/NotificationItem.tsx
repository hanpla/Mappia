import { formatTimeAgo } from '@/lib/utils/date';

import IconX from '../icon/IconX';

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

const DOT_CLASS_MAP: Record<NotificationType, string> = {
  approved: 'bg-[#0080FF]',
  rejected: 'bg-[#FF472E]',
  new: 'bg-[#00AC07]',
};

const TEXT_CLASS_MAP: Record<NotificationType, string> = {
  approved: 'text-[#0080FF]',
  rejected: 'text-[#FF472E]',
  new: 'text-[#00AC07]',
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
  const hasKeyword = data.content.includes(keyword);
  const parts = hasKeyword ? data.content.split(keyword) : [data.content];

  return (
    <div className="rounded-lg border border-[#E5E4E7] bg-white px-3 py-4 shadow-[0px_2px_8px_rgba(125,121,134,0.25)]">
      <div className="mb-2 flex items-center justify-between">
        <div className={`h-1.25 w-1.25 rounded-full ${DOT_CLASS_MAP[type]}`} />
        <button
          onClick={onDismiss}
          aria-label="알림 닫기"
          className="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-600"
        >
          <IconX size={24} color="currentColor" />
        </button>
      </div>
      <p className="mb-1 pr-6 text-sm font-normal text-[#111322]">
        {hasKeyword ? (
          <>
            {parts[0]}
            <span className={TEXT_CLASS_MAP[type]}>{keyword}</span>
            {parts.slice(1).join(keyword)}
          </>
        ) : (
          data.content
        )}
      </p>
      <p className="text-xs font-normal text-[#A4A1AA]">
        {formatTimeAgo(data.createdAt)}
      </p>
    </div>
  );
}
