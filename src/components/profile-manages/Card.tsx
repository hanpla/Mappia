import { MyActivity } from '@/types/my-activities';

import CardFooter from './CardFooter';
import CardInfo from './CardInfo';
import CardTitle from './CardTitle';

interface CardProps {
  activity: MyActivity;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export default function Card({ activity, onEdit, onDelete }: CardProps) {
  const { rating = 0, reviewCount = 0, title = '', price = 0 } = activity;
  const bannerImageUrl = activity.bannerImageUrl;

  return (
    <div className="flex w-full rounded-2xl bg-white shadow-sm">
      <CardTitle bannerImageUrl={bannerImageUrl} title={title} />

      <div className="flex min-w-0 flex-1 flex-col justify-between p-3">
        <CardInfo rating={rating} reviewCount={reviewCount} title={title} />
        <CardFooter
          price={price}
          activityId={activity.id}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}
