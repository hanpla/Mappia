import { IconProps } from '@/types/svg';

export default function IconCloudy({ size = 24, color, ...props }: IconProps) {
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
      {/* 해 부분 */}
      <circle
        cx="16"
        cy="10"
        r="3"
        fill="currentColor"
        stroke="currentColor"
        className={color ? undefined : 'text-amber-500'}
      />
      <path
        d="M16 5v1M19.5 6.5l-.7.7M20 10h-1M18.8 12.8l.7.7"
        stroke="currentColor"
        strokeWidth="2"
        className={color ? undefined : 'text-amber-500'}
      />
      {/* 구름 부분 */}
      <path
        d="M15.5 17.5A2.5 2.5 0 0 0 13 14.2a4 4 0 0 0-7.8 1.3A2.5 2.5 0 0 0 7 20h8.5a2.5 2.5 0 0 0 0-5z"
        fill="currentColor"
        stroke="currentColor"
        className={color ? undefined : 'text-slate-300'}
      />
    </svg>
  );
}
