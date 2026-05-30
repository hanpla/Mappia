import Link from 'next/link';

import LogoText from '../logo/LogoText';
import AuthButtons from './AuthButtons';

export default function Gnb() {
  return (
    <div className="border-gray-DDD border-b bg-white">
      <div className="inner flex h-17.5 items-center justify-between">
        <Link href="/activities" className="cursor-pointer">
          <LogoText width={116} height={31} />
        </Link>
        <AuthButtons />
      </div>
    </div>
  );
}
