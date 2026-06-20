'use client';

import Link from 'next/link';

import useHideOnScroll from '@/hooks/useHideOnScroll';

import { useIsLogin } from '@/providers/AuthProvider';

import LogoText from '../logo/LogoText';
import AuthButtons from './AuthButtons';
import UserSection from './UserSection';

export default function Gnb() {
  const isLogin = useIsLogin();
  const { isHidden } = useHideOnScroll();

  return (
    <div
      className={`border-gray-DDD sticky top-0 z-50 border-b bg-white transition-transform duration-300 ${
        isHidden ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="inner flex h-17.5 items-center justify-between">
        <Link href="/activities" className="cursor-pointer">
          <LogoText width={116} height={31} />
        </Link>
        {isLogin ? <UserSection /> : <AuthButtons />}
      </div>
    </div>
  );
}
