'use client';

import { QueryKey, useInfiniteQuery } from '@tanstack/react-query';

interface PaginatedResponse {
  cursorId: number | null;
}

interface UseCursorInfiniteQueryProps<T extends PaginatedResponse> {
  queryKey: QueryKey;
  queryFn: (pageParam: number | null) => Promise<T>;
  staleTime?: number;
}

export const useCursorInfiniteQuery = <T extends PaginatedResponse>({
  queryKey,
  queryFn,
  staleTime = 1000 * 60, // 기본값 1분
}: UseCursorInfiniteQueryProps<T>) => {
  return useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => queryFn(pageParam),
    initialPageParam: null as number | null,
    getNextPageParam: (lastPage) => lastPage.cursorId ?? undefined,
    staleTime,
  });
};
