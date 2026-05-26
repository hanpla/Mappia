export type TagStatus = 'approved' | 'rejected';

interface TagProps {
  status: TagStatus;
}

const TAG_STATUS = {
  approved: {
    label: '예약 승인',
    style: 'bg-[#FFF4E8] text-[#FF7C1D]',
  },
  rejected: {
    label: '예약 거절',
    style: 'bg-[#FFE4E0] text-[#FF472E]',
  },
};

export default function Tag({ status }: TagProps) {
  const tag = TAG_STATUS[status];

  return (
    <div
      className={`w-max rounded-[26.5px] p-[10px_15px] text-[14px]/[24px] font-bold ${tag.style}`}
    >
      {tag.label}
    </div>
  );
}
