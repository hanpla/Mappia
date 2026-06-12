import KakaoMap from './KakaoMap';

interface ActivityMapProps {
  address: string;
}

export default function ActivityMap({ address }: ActivityMapProps) {
  return (
    <section className="space-y-2 border-b border-[#E0E0E5] pb-5 md:pb-7.5 lg:pb-10">
      <h3 className="textlg-bold md:text2lg-bold">오시는 길</h3>
      <p className="textmd-semibold">{address}</p>
      <KakaoMap address={address} />
    </section>
  );
}
