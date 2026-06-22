export type ChipStatus = 'seat' | 'reservation' | 'complete' | 'confirmed';

interface ChipProps {
  status: ChipStatus;
  count: number;
}

const CHIP_STATUS: Record<ChipStatus, { label: string; style: string }> = {
  seat: {
    label: '잔여',
    style: 'bg-[#FFFFFF] text-[#0085FF]',
  },
  reservation: {
    label: '예약',
    style: 'bg-[#0085FF] text-[#FFFFFF]',
  },
  complete: {
    label: '완료',
    style: 'bg-[#DDDDDD] text-[#4B4B4B]',
  },
  confirmed: {
    label: '승인',
    style: 'bg-[#FFF4E8] text-[#FF7C1D]',
  },
};

export default function Chip({ status, count }: ChipProps) {
  const chip = CHIP_STATUS[status];

  return (
    <div
      className={`textxs-medium md:textmd-medium rounded-sm px-1 whitespace-nowrap ${chip.style}`}
    >
      {chip.label} {count}
    </div>
  );
}
