import Link from 'next/link';

const NAV_LINKS = [
  { label: '체험 둘러보기', href: '/activities' },
  { label: '예약 내역', href: '/reservations' },
  { label: '내 프로필', href: '/profile' },
];

export default function Footer() {
  return (
    <footer className="mt-30 flex h-40 items-start bg-[#2A2218] px-6 pt-8">
      <div className="mx-auto flex w-full max-w-300 justify-between">
        <p className="text-gray-DDD text-base font-normal">
          &copy; 2026 Mappia. All rights reserved.
        </p>
        <nav>
          <ul className="flex gap-4">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-gray-DDD text-base font-normal hover:underline"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
