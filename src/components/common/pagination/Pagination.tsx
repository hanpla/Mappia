'use client';

import Link from 'next/link';

import { usePaginationUrl } from '@/hooks/usePaginationUrl';

import IconPaginationLeft from '../icon/IconPaginationLeft';
import IconPaginationRight from '../icon/IconPaginationRight';

interface PaginationProps {
  totalCount: number;
  pageSize: number;
  visiblePageCount?: number;
}

export default function Pagination({
  totalCount,
  pageSize,
  visiblePageCount = 5,
}: PaginationProps) {
  const { currentPage, createPageUrl } = usePaginationUrl();

  const totalPages = pageSize > 0 ? Math.ceil(totalCount / pageSize) : 0;
  if (totalPages <= 1) return null;

  const clampedPage = Math.min(Math.max(1, currentPage), totalPages);
  const currentGroupIndex = Math.floor((clampedPage - 1) / visiblePageCount);
  const startPage = currentGroupIndex * visiblePageCount + 1;
  const endPage = Math.min(startPage + visiblePageCount - 1, totalPages);

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  const prevPage = clampedPage - 1;
  const nextPage = clampedPage + 1;

  const isFirstPage = clampedPage === 1;
  const isLastPage = clampedPage === totalPages;

  const commonButton =
    'flex items-center justify-center w-[40px] h-[40px] md:w-[55px] md:h-[55px] rounded-[15px] border';
  const baseButton = `${commonButton} bg-[#FFFFFF] border-[#6B5747] text-[#6B5747] text-[18px]/[26px] font-normal`;
  const activeButton = `${commonButton} bg-[#8B7355] border-[#8B7355] text-[#FFFFFF] text-[18px]/[26px] font-medium`;
  const disabledButton = `${commonButton} bg-[#FFFFFF] border-[#DDDDDD] cursor-not-allowed`;

  return (
    <div className="flex items-center gap-[10px] select-none">
      {isFirstPage ? (
        <div className={disabledButton} aria-label="이전 페이지 비활성화">
          <IconPaginationLeft color="#A1A1A1" />
        </div>
      ) : (
        <Link
          href={createPageUrl(prevPage)}
          scroll={false}
          className={baseButton}
          aria-label="이전 페이지"
        >
          <IconPaginationLeft color="#6B5747" />
        </Link>
      )}

      {pageNumbers.map((page) => {
        const isActive = page === currentPage;

        return (
          <Link
            key={page}
            href={createPageUrl(page)}
            scroll={false}
            className={isActive ? activeButton : baseButton}
            aria-current={isActive ? 'page' : undefined}
          >
            {page}
          </Link>
        );
      })}

      {isLastPage ? (
        <div className={disabledButton} aria-label="다음 페이지 비활성화">
          <IconPaginationRight color="#A1A1A1" />
        </div>
      ) : (
        <Link
          href={createPageUrl(nextPage)}
          scroll={false}
          className={baseButton}
          aria-label="다음 페이지"
        >
          <IconPaginationRight color="#6B5747" />
        </Link>
      )}
    </div>
  );
}
