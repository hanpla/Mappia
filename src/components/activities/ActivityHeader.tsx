'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import useRecentActivitiesStore from '@/stores/recentActivitiesStore';

import EditDropdown from '../common/dropdown/EditDropdown';
import IconMap from '../common/icon/IconMap';
import IconMeatball from '../common/icon/IconMeatball';
import IconStarOn from '../common/icon/IconStarOn';

export default function ActivityHeader() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { addActivity } = useRecentActivitiesStore();
  const params = useParams();
  const id = params?.id ? Number(params.id) : null;

  useEffect(() => {
    if (id && !isNaN(id)) {
      addActivity({
        id,
        title: '함께 배우면 즐거운 스트릿 댄스',
        bannerImageUrl: '/img/activity-banner-image.png',
      });
    }
  }, [id, addActivity]);

  const handleDelete = () => {};

  return (
    <section className="flex justify-between border-b border-[#E0E0E5] pb-5 md:pb-[30px] lg:border-b-0 lg:pb-0">
      <div>
        <span className="textsm-medium md:textmd-medium mb-0 block md:mb-1">
          문화 · 예술
        </span>
        <h2 className="text2lg-bold md:text2xl-bold mb-3 md:mb-4">
          함께 배우면 즐거운 스트릿 댄스
        </h2>
        <div className="mb-1 flex items-center gap-[6px]">
          <IconStarOn size={16} />
          <span className="textmd-medium text-[#5D5D61]">4.9 (293)</span>
        </div>
        <div className="flex items-center gap-[2px]">
          <IconMap size={16} />
          <span className="textmd-medium text-[#5D5D61]">
            서울 중구 청계천로 100 10F
          </span>
        </div>
      </div>

      <div className="relative shrink-0">
        <button
          type="button"
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          className="hover:bg-gray-FAF flex size-8 items-center justify-center rounded-full transition-colors"
          aria-label="메뉴 열기"
        >
          <IconMeatball size={24} className="cursor-pointer" />
        </button>

        {isDropdownOpen && (
          <EditDropdown
            editUrl=""
            onDelete={handleDelete}
            onClose={() => setIsDropdownOpen(false)}
          />
        )}
      </div>
    </section>
  );
}
