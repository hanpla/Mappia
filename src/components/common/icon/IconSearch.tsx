import { IconProps } from '@/types/svg';

export default function IconSearch({ size = 24, color, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M21 21L15 15M17 10C17 13.8659 13.8659 17 10 17C6.13401 17 3 13.8659 3 10C3 6.13401 6.13401 3 10 3C13.8659 3 17 6.13401 17 10Z"
        stroke={color || '#4B4B4B'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
