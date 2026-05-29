import IconEmpty from '../common/icon/IconEmpty';

export default function EmptySpace() {
  return (
    <div className="flex flex-col items-center justify-center">
      <IconEmpty />
      <p className="text2xl-medium text-gray-797">아직 등록한 체험이 없어요</p>
    </div>
  );
}
