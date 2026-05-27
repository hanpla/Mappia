'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import PaginationView from './PaginationView';

interface PaginationProps {
  totalCount: number;
  pageSize: number;
  visiblePageCount?: number;
  baseUrl: string;
}

export default function Pagination({
  totalCount,
  pageSize,
  visiblePageCount = 5,
  baseUrl,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams?.get('page')) || 1;

  const handlePageChange = (page: number) => {
    const [pathname, queryString] = baseUrl.split('?');
    const params = new URLSearchParams(queryString);

    searchParams?.forEach((value, key) => {
      params.set(key, value);
    });

    params.set('page', page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <PaginationView
      totalCount={totalCount}
      pageSize={pageSize}
      currentPage={currentPage}
      visiblePageCount={visiblePageCount}
      onPageChange={handlePageChange}
    />
  );
}
