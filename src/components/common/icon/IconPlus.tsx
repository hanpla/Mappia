import { IconProps } from '@/types/svg';

export default function IconPlus({ size = 24, color, ...props }: IconProps) {
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
        d="M12 5V19M5 12H19"
        stroke={color || '#3C3C43'}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
