'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Activity } from '@/types/activity';

import Card from './Card';

interface ManageListProps {
  activities: Activity[];
}

export default function ManageList({
  activities: initialActivities,
}: ManageListProps) {
  const [activities, setActivities] = useState<Activity[]>(initialActivities);
  const router = useRouter();

  const handleEdit = (id: number) => {
    router.push(`/profile/${id}/edit`);
  };

  const handleDelete = (id: number) => {
    setActivities((prev) => prev.filter((activity) => activity.id !== id));
  };

  return (
    <div className="mt-6 flex flex-col gap-3">
      {activities.map((activity) => (
        <Card
          key={activity.id}
          activity={activity}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
