import Link from 'next/link';

const NAV_LINKS = [
  { label: '체험 둘러보기', href: '/activities' },
  { label: '예약 내역', href: '/reservations' },
  { label: '내 프로필', href: '/profile' },
];

export default function Footer() {
  return (
    <footer className="bg-brown-2A2 mt-30 min-h-40 py-8">
      <div className="inner flex flex-col-reverse gap-4 md:flex-row md:justify-between">
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
