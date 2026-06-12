import { IconProps } from '@/types/svg';

export default function IconSnowy({ size = 24, color, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || 'currentColor'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* 구름 */}
      <path
        d="M17 14A5 5 0 1 0 7.8 12.2A4 4 0 1 0 7 20h10a3 3 0 0 0 0-6z"
        fill="currentColor"
        stroke="currentColor"
        className={color ? undefined : 'text-slate-400'}
      />
      {/* 눈송이 */}
      <path
        d="M8 22h.01M12 22h.01M16 22h.01"
        stroke="currentColor"
        strokeWidth="3"
        className={color ? undefined : 'text-blue-300'}
      />
    </svg>
  );
}
