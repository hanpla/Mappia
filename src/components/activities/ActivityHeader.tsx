'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import useRecentActivitiesStore from '@/stores/recentActivitiesStore';
import useToastStore from '@/stores/toastStore';

import { deleteMyActivity } from '@/lib/api/my-activities';

import useActivityOwner from '@/hooks/useActivityOwner';
import useClickOutside from '@/hooks/useClickOutside';

import { ActivityDetailContent } from '@/types/activities';

import Dropdown from '../common/dropdown/Dropdown';
import IconMap from '../common/icon/IconMap';
import IconMeatball from '../common/icon/IconMeatball';
import IconShare from '../common/icon/IconShare';
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

  const { addActivity } = useRecentActivitiesStore();

  const router = useRouter();
  const pathname = usePathname();

  const showToast = useToastStore((state) => state.showToast);

  const { isOwner } = useActivityOwner(userId);

  const dropdownRef = useClickOutside<HTMLDivElement>(() => {
    setIsDropdownOpen(false);
  });

  const { mutate: deleteActivityMutate, isPending: isDeleting } = useMutation({
    mutationFn: () => deleteMyActivity(id),
    onSuccess: () => {
      showToast('success', '체험이 삭제되었습니다.');

      router.push('/activities');

      setIsModalOpen(false);
    },
    onError: (error) => {
      const message =
        axios.isAxiosError<{ message?: string }>(error) &&
        error.response?.data?.message
          ? error.response.data.message
          : '체험 삭제에 실패했습니다.';

      showToast('error', message);
      setIsModalOpen(false);
    },
  });

  const handleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleDeleteClick = () => {
    setIsDropdownOpen(false);
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    if (isDeleting) return;

    deleteActivityMutate();
  };

  const handleShareClick = async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);
      showToast('success', '클립보드에 복사되었습니다.');
    } catch {
      showToast('error', '링크 복사에 실패했습니다.');
    }
  };

  useEffect(() => {
    if (id && !isNaN(id)) {
      addActivity({
        id,
        title,
      });
    }
  }, [id, addActivity, title]);

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

      <div className="flex shrink-0 items-start gap-1">
        <button
          type="button"
          onClick={handleShareClick}
          className="flex size-6 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-gray-100 md:size-8"
          title="링크 공유"
          aria-label="링크 공유"
        >
          <IconShare className="h-4 w-4 md:h-5 md:w-5" />
        </button>

        {isOwner && (
          <div className="relative shrink-0" ref={dropdownRef}>
            <button
              type="button"
              onClick={handleDropdown}
              className="group hover:bg-beige-8B7 flex size-6 cursor-pointer items-center justify-center rounded-full transition-colors hover:text-white md:size-8"
              aria-label="메뉴 열기"
            >
              <IconMeatball
                color="currentColor"
                className="h-5 w-5 md:h-6 md:w-6"
              />
            </button>

            {isDropdownOpen && (
              <Dropdown
                type="edit"
                editUrl={`/my-activities/${id}/edit?from=${encodeURIComponent(pathname)}`}
                onDelete={handleDeleteClick}
                onClose={() => setIsDropdownOpen(false)}
              />
            )}
          </div>
        )}
      </div>

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
