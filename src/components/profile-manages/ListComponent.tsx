'use client';

import { useSyncExternalStore } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';

import { getMyActivities } from '@/lib/api/my-activities';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

import CardSkeleton from './CardSkeleton';
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

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['my-activities'],
      queryFn: ({ pageParam }) =>
        getMyActivities({ cursorId: pageParam, size: 6 }),
      initialPageParam: null as number | null,
      getNextPageParam: (lastPage) => lastPage.cursorId,
      enabled: isMounted,
    });

  const observerRef = useIntersectionObserver({
    onIntersect: () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    enabled: hasNextPage && !isFetchingNextPage,
  });

  if (!isMounted || isLoading || !data) {
    return <ListSkeleton />;
  }

  const activities = data.pages.flatMap((page) => page.activities);

  return (
    <div>
      {activities.length === 0 ? (
        <EmptySpace />
      ) : (
        <div className="flex flex-col gap-3">
          <ManageList activities={activities} />

          {(hasNextPage || isFetchingNextPage) && (
            <div ref={observerRef} className="w-full">
              {isFetchingNextPage && <CardSkeleton />}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
