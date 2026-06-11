import Link from 'next/link';

export default function NotFoundLink() {
  return (
    <Link
      href="/activities"
      className="bg-brown-2A2 border-brown-2A2 text-white-FFF hover:text-brown-2A2 hover:bg-white-FFF textlg-bold inline-flex h-12 cursor-pointer items-center justify-center rounded-2xl border px-8 whitespace-nowrap transition-all duration-200"
    >
      체험 목록으로 돌아가기
    </Link>
  );
}
