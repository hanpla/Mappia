'use client';

import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

import { getMyReservations } from '@/lib/api/my-reservations';
import { getEffectiveStatus } from '@/lib/utils/reservation';

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

  // '체험 완료(completed)' 필터는 날짜가 지나 자동으로 완료처리되는 'pending' 건도 포함해야 합니다.
  const statusParam =
    currentFilter === 'completed' ? undefined : (currentFilter ?? undefined);

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
        status: statusParam,
        cursorId: pageParam ?? undefined,
        size: 4,
      }),
    staleTime: 5 * 60 * 1000,
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

  // 날짜 연산을 통해 변경된 기기/예약 상태에 맞는 클라이언트 사이드 필터링 적용
  const filteredReservations = reservations.filter((item) => {
    if (!currentFilter) return true;
    return getEffectiveStatus(item) === currentFilter;
  });

  return (
    <div className="flex w-full flex-col">
      <Title title="예약 내역" action={<FilterDropdown filterKey="filter" />} />

      <div className="mt-6 flex flex-col gap-3">
        {filteredReservations.length === 0 ? (
          <ReservationsEmpty message="아직 예약한 체험이 없어요" />
        ) : (
          <>
            {filteredReservations.map((item) => (
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
