import LogoSad from '../common/logo/LogoSad';

export default function Empty() {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <LogoSad size={182} />
      <p className="textlg-medium text-gray-4B4">아직 등록한 체험이 없어요</p>
    </div>
  );
}
