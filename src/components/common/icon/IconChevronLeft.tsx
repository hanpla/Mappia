import { IconProps } from '@/types/svg';

export default function IconChevronLeft({
  size = 44,
  color,
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M27 11L16.7071 21.2929C16.3166 21.6834 16.3166 22.3166 16.7071 22.7071L27 33"
        stroke={color || '#4B4B4B'}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
