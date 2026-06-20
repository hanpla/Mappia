import Link from 'next/link';

import IconStarOn from '@/components/common/icon/IconStarOn';

interface CardInfoProps {
  rating: number;
  reviewCount: number;
  title: string;
  id: number;
}

export default function CardInfo({
  rating,
  reviewCount,
  title,
  id,
}: CardInfoProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-black-242 textmd-regular flex items-center gap-1">
        <IconStarOn size={16} />
        <span className="font-semibold">{rating.toFixed(1)}</span>
        <span className="text-gray-A4A">({reviewCount})</span>
      </div>

      <Link href={`/activities/${id}`} className="w-fit">
        <h3 className="textlg-bold md:text2lg-bold truncate hover:underline">
          {title}
        </h3>
      </Link>
    </div>
  );
}
