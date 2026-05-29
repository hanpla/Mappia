import { Activity } from '@/types/activitiy';

import CardFooter from './CardFooter';
import CardInfo from './CardInfo';
import CardTitle from './CardTitle';

interface CardProps {
  activity: Activity;
}

export default function Card({ activity }: CardProps) {
  const { rating = 0, reviewCount = 0, title = '', price = 0 } = activity;
  const bannerImageUrl = activity.bannerImageUrl || '/img/Card_curation.png';

  return (
    <div className="flex w-full rounded-2xl bg-white shadow-sm">
      <CardTitle bannerImageUrl={bannerImageUrl} title={title} />

      <div className="flex min-w-0 flex-1 flex-col justify-between p-3">
        <CardInfo rating={rating} reviewCount={reviewCount} title={title} />
        <CardFooter price={price} activityId={activity.id} />
      </div>
    </div>
  );
}
