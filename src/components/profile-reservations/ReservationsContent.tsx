'use client';

import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

import { getMyReservations } from '@/lib/api/my-reservations';

import { useCursorInfiniteQuery } from '@/hooks/useCursorInfiniteQuery';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

import { ReservationStatus } from '@/types/activities';

import FilterDropdown from '@/components/common/dropdown/FilterDropdown';
import ReservationsEmpty from '@/components/profile-ui/EmptySpace';
import Title from '@/components/profile-ui/Title';

import ReservationCard from './ReservationCard';
import ReservationsSkeleton from './ReservationSkeleton';

export default function ReservationsContent() {
  const searchParams = useSearchParams();
  const currentFilter = searchParams?.get('filter') as ReservationStatus | null;

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCursorInfiniteQuery({
    queryKey: ['myReservations', currentFilter],
    queryFn: (pageParam) =>
      getMyReservations({
        status: currentFilter ?? undefined,
        cursorId: pageParam ?? undefined,
        size: 2,
      }),
    staleTime: 0,
  });

  const handleIntersect = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  const observerRef = useIntersectionObserver({
    onIntersect: handleIntersect,
    enabled: !!hasNextPage && !isFetchingNextPage,
    threshold: 0,
    rootMargin: '0px',
  });

  if (isLoading) {
    return <ReservationsSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex w-full flex-col items-center justify-center py-20 text-center">
        <p className="text-lg font-medium text-red-500">
          데이터를 불러오는 중 오류가 발생했습니다.
        </p>
        <p className="mt-2 text-sm text-gray-400">
          {error instanceof Error ? error.message : '알 수 없는 오류'}
        </p>
        <button
          onClick={() => refetch()}
          className="bg-main-color mt-4 rounded-lg px-4 py-2 text-sm text-white"
        >
          다시 시도하기
        </button>
      </div>
    );
  }

  const reservations = data?.pages.flatMap((page) => page.reservations) ?? [];

  return (
    <div className="flex w-full flex-col">
      <Title title="예약 내역" action={<FilterDropdown filterKey="filter" />} />

      <div className="mt-6 flex flex-col gap-3">
        {reservations.length === 0 ? (
          <ReservationsEmpty message="아직 예약한 체험이 없어요" />
        ) : (
          <>
            {reservations.map((item) => (
              <ReservationCard key={item.id} item={item} />
            ))}

            {hasNextPage && !isFetchingNextPage && (
              <div ref={observerRef} className="h-1 w-full" />
            )}
          </>
        )}
      </div>
    </div>
  );
}
