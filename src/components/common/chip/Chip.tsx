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
      className={`rounded-[4px] px-1 text-[12px]/[20px] font-medium whitespace-nowrap md:text-[14px]/[23px] ${chip.style}`}
    >
      {chip.label} {count}
    </div>
  );
}
