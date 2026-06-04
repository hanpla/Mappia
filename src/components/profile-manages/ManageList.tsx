'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { MyActivity } from '@/types/my-activities';

import Card from './Card';

interface ManageListProps {
  activities: MyActivity[];
}

export default function ManageList({
  activities: initialActivities,
}: ManageListProps) {
  const [activities, setActivities] = useState<MyActivity[]>(initialActivities);
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
