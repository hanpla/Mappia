'use client';

import useToastStore from '@/stores/toastStore';

import IconCopy from '../common/icon/IconCopy';
import KakaoMap from './KakaoMap';

interface ActivityMapProps {
  address: string;
}

export default function ActivityMap({ address }: ActivityMapProps) {
  const showToast = useToastStore((state) => state.showToast);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      showToast('success', '주소가 복사되었습니다.');
    } catch {
      showToast('error', '주소 복사에 실패했습니다.');
    }
  };

  return (
    <section className="space-y-2 border-b border-[#E0E0E5] pb-5 md:pb-7.5 lg:pb-10">
      <h3 className="textlg-bold md:text2lg-bold">오시는 길</h3>
      <div className="flex items-center gap-0.5">
        <button
          onClick={handleCopy}
          className="flex cursor-pointer items-center justify-center rounded-md p-1 transition-colors hover:bg-gray-100"
          title="주소 복사"
          aria-label="주소 복사"
        >
          <IconCopy size={16} />
        </button>
        <p className="textmd-semibold text-[#1A1A1A]">{address}</p>
      </div>
      <KakaoMap address={address} />
    </section>
  );
}
