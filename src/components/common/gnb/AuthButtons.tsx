import Link from 'next/link';

export default function AuthButtons() {
  return (
    <ul className="flex items-center justify-between gap-6.25">
      <li>
        <Link href="/login" className="hover:underline">
          로그인
        </Link>
      </li>
      <li>
        <Link href="/signup" className="hover:underline">
          회원가입
        </Link>
      </li>
    </ul>
  );
}
