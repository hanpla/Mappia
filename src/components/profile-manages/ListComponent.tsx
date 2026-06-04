'use client';

import { useSyncExternalStore } from 'react';

import { useQuery } from '@tanstack/react-query';

import { getMyActivities } from '@/lib/api/my-activities';

import EmptySpace from './EmptySpace';
import ListSkeleton from './ListSkeleton';
import ManageList from './ManageList';

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export default function ListComponent() {
  const isMounted = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const { data, isLoading } = useQuery({
    queryKey: ['my-activities'],
    queryFn: () => getMyActivities(),
    enabled: isMounted,
  });

  if (!isMounted || isLoading || !data) {
    return <ListSkeleton />;
  }

  const activities = data.activities;

  return (
    <div>
      {activities.length === 0 ? (
        <EmptySpace />
      ) : (
        <ManageList activities={activities} />
      )}
    </div>
  );
}
