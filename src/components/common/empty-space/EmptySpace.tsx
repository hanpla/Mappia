import LogoSad from '@/components/common/logo/LogoSad';

export default function Empty({ message = '아직 등록한 체험이 없어요' }) {
  return (
    <div className="flex flex-col items-center justify-center opacity-60">
      <LogoSad size={182} />
      <p className="textlg-medium text-gray-4B4">{message}</p>
    </div>
  );
}
