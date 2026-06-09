'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { MOCK_RECENT_ACTIVITIES } from '@/lib/mock-data/recent-activities';

import useClickOutside from '@/hooks/useClickOutside';

import IconLogs from '../common/icon/IconLogs';
import RecentActivitiesPopup from './RecentActivitiesPopup';

export default function RecentActivitiesButton() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // 버튼 바깥 영역 클릭 시 닫히도록 설정
  const containerRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

  if (pathname === '/') return null;

  return (
    <div
      ref={containerRef}
      className="fixed right-6 bottom-6 z-50 flex flex-col items-end gap-3 md:right-8 md:bottom-8"
    >
      {/* 플로팅 팝업 UI */}
      {isOpen && <RecentActivitiesPopup activities={MOCK_RECENT_ACTIVITIES} />}

      {/* 플로팅 버튼 */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="bg-khaki-6B5 hover:bg-brown flex size-12 cursor-pointer items-center justify-center rounded-full text-white opacity-50 shadow-[0_4px_20px_rgba(42,34,24,0.25)] transition-all duration-300 ease-out hover:-translate-y-1 hover:opacity-100 hover:shadow-[0_8px_30px_rgba(42,34,24,0.35)] active:translate-y-0 active:scale-95 md:size-14 xl:opacity-80"
        aria-label="최근 본 체험 보기"
      >
        <IconLogs size={24} className="md:hidden" />
        <IconLogs size={28} className="hidden md:block" />
      </button>
    </div>
  );
}
