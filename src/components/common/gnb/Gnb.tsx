'use client';

import Link from 'next/link';

import { useIsLogin } from '@/providers/AuthStoreProvider';

import LogoText from '../logo/LogoText';
import AuthButtons from './AuthButtons';
import UserSection from './UserSection';

export default function Gnb() {
  const isLogin = useIsLogin();

  return (
    <div className="flex h-17.5 items-center justify-center border-b border-[#DDDDDD] px-6 max-md:p-5">
      <div className="flex w-full max-w-300 items-center justify-between">
        <Link href="/activities" className="cursor-pointer">
          <LogoText width={116} height={31} />
        </Link>
        {isLogin ? <UserSection /> : <AuthButtons />}
      </div>
    </div>
  );
}
