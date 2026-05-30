import { Activity } from '@/types/activity';

import Card from './Card';

interface ManageListProps {
  activities: Activity[];
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export default function ManageList({ activities }: ManageListProps) {
  return (
    <div className="mt-6 flex flex-col gap-3">
      {activities.map((activity) => (
        <Card key={activity.id} activity={activity} />
      ))}
    </div>
  );
}
