import Link from 'next/link';

interface UserDropdownProps {
  onClose: () => void;
}

export default function UserDropdown({ onClose }: UserDropdownProps) {
  return (
    <div className="absolute top-full right-0 z-50 mt-2 w-32 rounded-lg border border-gray-200 bg-white shadow-sm">
      <Link
        href="/profile"
        onClick={onClose}
        className="block px-4 py-3 text-center text-sm text-gray-700 hover:bg-gray-50"
      >
        마이페이지
      </Link>
      <hr className="border-gray-200" />
      <button
        onClick={onClose}
        className="w-full px-4 py-3 text-center text-sm text-[#ff472e] hover:bg-gray-50"
      >
        로그아웃
      </button>
    </div>
  );
}
