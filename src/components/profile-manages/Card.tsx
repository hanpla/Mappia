import { MyActivity } from '@/types/my-activities';

import ReservationCardContainer from '../profile-ui/ReservationCardContainer';
import CardFooter from './CardFooter';
import CardInfo from './CardInfo';

interface CardProps {
  activity: MyActivity;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export default function Card({ activity, onEdit, onDelete }: CardProps) {
  const { rating = 0, reviewCount = 0, title = '', price = 0 } = activity;
  const imageUrl = activity.bannerImageUrl;

  return (
    <ReservationCardContainer imageUrl={imageUrl}>
      <CardInfo rating={rating} reviewCount={reviewCount} title={title} />
      <CardFooter
        price={price}
        activityId={activity.id}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </ReservationCardContainer>
  );
}
