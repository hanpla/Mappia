'use client';

import IconPaginationLeft from '../icon/IconPaginationLeft';
import IconPaginationRight from '../icon/IconPaginationRight';

interface PaginationViewProps {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  visiblePageCount?: number;
  onPageChange: (page: number) => void;
}

export default function PaginationView({
  totalCount,
  pageSize,
  currentPage,
  visiblePageCount = 5,
  onPageChange,
}: PaginationViewProps) {
  const totalPages = Math.ceil(totalCount / pageSize);

  if (totalPages <= 1) return null;

  const currentGroupIndex = Math.floor((currentPage - 1) / visiblePageCount);
  const startPage = currentGroupIndex * visiblePageCount + 1;
  const endPage = Math.min(startPage + visiblePageCount - 1, totalPages);

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const commonButton =
    'flex items-center justify-center w-[40px] h-[40px] md:w-[55px] md:h-[55px] rounded-[15px] border';
  const baseButton = `${commonButton} bg-[#FFFFFF] border-[#6B5747] text-[#6B5747] text-[18px]/[26px] font-normal cursor-pointer`;
  const activeButton = `${commonButton} bg-[#8B7355] border-[#8B7355] text-[#FFFFFF] text-[18px]/[26px] font-medium cursor-pointer`;
  const disabledButton = `${commonButton} bg-[#FFFFFF] border-[#DDDDDD]`;

  return (
    <div className="flex items-center gap-[10px] select-none">
      <button
        type="button"
        disabled={isFirstPage}
        onClick={() => onPageChange(prevPage)}
        className={isFirstPage ? disabledButton : baseButton}
      >
        <IconPaginationLeft color={isFirstPage ? '#A1A1A1' : '#6B5747'} />
      </button>

      {pageNumbers.map((page) => {
        const isActive = page === currentPage;

        return (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={isActive ? activeButton : baseButton}
          >
            {page}
          </button>
        );
      })}

      <button
        type="button"
        disabled={isLastPage}
        onClick={() => onPageChange(nextPage)}
        className={isLastPage ? disabledButton : baseButton}
      >
        <IconPaginationRight color={isLastPage ? '#A1A1A1' : '#6B5747'} />
      </button>
    </div>
  );
}
