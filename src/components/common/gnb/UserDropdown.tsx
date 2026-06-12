'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';

import useToastStore from '@/stores/toastStore';

import { clearAuthCookies } from '@/lib/actions/auth';

interface UserDropdownProps {
  onClose: () => void;
}

export default function UserDropdown({ onClose }: UserDropdownProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const showToast = useToastStore((state) => state.showToast);

  const handleLogout = async () => {
    await clearAuthCookies();
    queryClient.clear();
    onClose();
    showToast('error', '로그아웃 되었습니다.');
    router.refresh();
    router.push('/activities');
  };

  return (
    <div className="absolute top-full right-0 z-50 mt-2 w-32 rounded-lg border border-gray-200 bg-white shadow-sm">
      <Link
        href="/profile"
        onClick={onClose}
        className="block rounded-t-lg px-4 py-3 text-center text-sm text-gray-700 hover:bg-gray-50"
      >
        마이페이지
      </Link>
      <hr className="border-gray-200" />
      <button
        onClick={handleLogout}
        className="text-red-FF4 w-full rounded-b-lg px-4 py-3 text-center text-sm hover:bg-gray-50"
      >
        로그아웃
      </button>
    </div>
  );
}
