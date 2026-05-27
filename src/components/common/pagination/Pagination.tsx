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
    const params = new URLSearchParams(searchParams?.toString());

    params.set('page', page.toString());
    router.push(`${baseUrl}?${params.toString()}`);
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
