'use client';

import Link from 'next/link';

import { useIsLogin } from '@/providers/AuthProvider';

import LogoText from '../logo/LogoText';
import AuthButtons from './AuthButtons';
import UserSection from './UserSection';

export default function Gnb() {
  const isLogin = useIsLogin();

  return (
    <div className="border-gray-DDD border-b bg-white">
      <div className="inner flex h-17.5 items-center justify-between">
        <Link href="/activities" className="cursor-pointer">
          <LogoText width={116} height={31} />
        </Link>
        {isLogin ? <UserSection /> : <AuthButtons />}
      </div>
    </div>
  );
}
