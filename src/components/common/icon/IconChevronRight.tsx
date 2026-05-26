import { IconProps } from '@/types/svg';

export default function IconChevronRight({
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
        d="M16 11L26.2929 21.2929C26.6834 21.6834 26.6834 22.3166 26.2929 22.7071L16 33"
        stroke={color || '#4B4B4B'}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
