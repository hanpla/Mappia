import IconStarOn from '@/components/common/icon/IconStarOn';

interface CardInfoProps {
  rating: number;
  reviewCount: number;
  title: string;
}

export default function CardInfo({
  rating,
  reviewCount,
  title,
}: CardInfoProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-black-242 textmd-regular flex items-center gap-1">
        <IconStarOn size={16} />
        <span className="font-semibold">{rating.toFixed(1)}</span>
        <span className="text-gray-A4A">({reviewCount})</span>
      </div>

      <h3 className="textlg-bold md:text2lg-bold">{title}</h3>
    </div>
  );
}
