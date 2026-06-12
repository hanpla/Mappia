export type TagStatus = 'approved' | 'rejected';

interface TagProps {
  status: TagStatus;
}

const TAG_STATUS: Record<TagStatus, { label: string; style: string }> = {
  approved: {
    label: '예약 승인',
    style: 'bg-orange-FFF text-[#FF7C1D]',
  },
  rejected: {
    label: '예약 거절',
    style: 'bg-red-FFE text-[#FF472E]',
  },
};

export default function Tag({ status }: TagProps) {
  const tag = TAG_STATUS[status];

  return (
    <div
      className={`text-md-bold w-max rounded-[26.5px] px-3.75 py-2.5 ${tag.style}`}
    >
      {tag.label}
    </div>
  );
}
