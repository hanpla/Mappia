import Link from 'next/link';

import AuthButtons from './AuthButtons';

export default function Gnb() {
  return (
    <div className="flex h-17.5 items-center justify-center border-b border-[#DDDDDD] p-6 max-md:p-5">
      <div className="flex w-full max-w-300 items-center justify-between">
        <Link href="/" className="cursor-pointer">
          <span>Logo</span>
        </Link>
        <AuthButtons />
      </div>
    </div>
  );
}
