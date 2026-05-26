import { IconProps } from '@/types/svg';

export default function IconX({ size = 40, color, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10 10L30 30"
        stroke={color || '#4B4B4B'}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M30 10L10 30"
        stroke={color || '#4B4B4B'}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
