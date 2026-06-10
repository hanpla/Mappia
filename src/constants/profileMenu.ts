import type { ComponentType } from 'react';

import IconSidemenuCalendar from '@/components/common/icon/IconSidemenuCalendar';
import IconSidemenuList from '@/components/common/icon/IconSidemenuList';
import IconSidemenuSetting from '@/components/common/icon/IconSidemenuSetting';
import IconSidemenuUser from '@/components/common/icon/IconSidemenuUser';

export interface ProfileMenuItem {
  name: string;
  href: string;
  icon: ComponentType<{ className?: string; color?: string }>;
}

// 데스크톱 SideMenu와 모바일 ProfileMenu가 공유하는 프로필 네비게이션 항목
export const profileMenuItems: ProfileMenuItem[] = [
  { name: '내 정보', href: '/profile/info', icon: IconSidemenuUser },
  { name: '예약내역', href: '/profile/reservations', icon: IconSidemenuList },
  { name: '내 체험 관리', href: '/profile/manages', icon: IconSidemenuSetting },
  { name: '예약 현황', href: '/profile/dashboard', icon: IconSidemenuCalendar },
];
