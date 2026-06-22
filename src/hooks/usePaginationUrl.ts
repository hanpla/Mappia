'use client';

import { usePathname, useSearchParams } from 'next/navigation';

export function usePaginationUrl() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams?.get('page')) || 1;

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams?.toString());

    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return {
    currentPage,
    createPageUrl,
  };
}
