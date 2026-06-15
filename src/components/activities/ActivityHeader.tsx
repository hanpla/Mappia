'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import axios from 'axios';

import useToastStore from '@/stores/toastStore';

import { deleteMyActivity } from '@/lib/api/my-activities';

import useClickOutside from '@/hooks/useClickOutside';
import useMe from '@/hooks/useMe';

import { ActivityDetailContent } from '@/types/activities';

import Dropdown from '../common/dropdown/Dropdown';
import IconMap from '../common/icon/IconMap';
import IconMeatball from '../common/icon/IconMeatball';
import IconStarOn from '../common/icon/IconStarOn';
import LogoSurprise from '../common/logo/LogoSurprise';
import ConfirmModal from '../common/modal/ConfirmModal';

interface ActivityHeaderProps {
  activity: ActivityDetailContent;
}

export default function ActivityHeader({ activity }: ActivityHeaderProps) {
  const { id, userId, title, category, address, rating, reviewCount } =
    activity;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  const showToast = useToastStore((state) => state.showToast);

  const { data: currentUser } = useMe({ retry: false });
  const isOwner = currentUser && currentUser.id === userId;

  const dropdownRef = useClickOutside<HTMLDivElement>(() => {
    setIsDropdownOpen(false);
  });

  const handleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleDeleteClick = () => {
    setIsDropdownOpen(false);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await deleteMyActivity(id);

      router.push('/activities');

      showToast('success', '체험이 삭제되었습니다.');
    } catch (error) {
      const message =
        axios.isAxiosError<{ message?: string }>(error) &&
        error.response?.data?.message
          ? error.response.data.message
          : '체험 삭제에 실패했습니다.';

      showToast('error', message);
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <section className="flex justify-between border-b border-[#E0E0E5] pb-5 md:pb-7.5 lg:border-b-0 lg:pb-0">
      <div>
        <span className="textsm-medium md:textmd-medium mb-0 block md:mb-1">
          {category}
        </span>
        <h2 className="text2lg-bold md:text2xl-bold mb-3 md:mb-4">{title}</h2>
        <div className="mb-1 flex items-center gap-1.5">
          <IconStarOn size={16} />
          <span className="textmd-medium text-[#5D5D61]">
            {rating} ({reviewCount})
          </span>
        </div>
        <div className="flex items-center gap-0.5">
          <IconMap size={16} />
          <span className="textmd-medium text-[#5D5D61]">{address}</span>
        </div>
      </div>

      {isOwner && (
        <div className="relative shrink-0" ref={dropdownRef}>
          <button
            type="button"
            onClick={handleDropdown}
            className="group hover:bg-beige-8B7 flex size-8 items-center justify-center rounded-full transition-colors hover:text-white"
            aria-label="메뉴 열기"
          >
            <IconMeatball
              size={24}
              color="currentColor"
              className="cursor-pointer"
            />
          </button>

          {isDropdownOpen && (
            <Dropdown
              type="edit"
              editUrl={`/my-activities/${id}/edit`}
              onDelete={handleDeleteClick}
              onClose={() => setIsDropdownOpen(false)}
            />
          )}
        </div>
      )}

      <ConfirmModal
        isOpen={isModalOpen}
        icon={<LogoSurprise className="h-13 w-13 md:h-20 md:w-20" />}
        message="체험을 삭제하시겠습니까?"
        cancelText="아니오"
        confirmText="삭제하기"
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
      />
    </section>
  );
}
