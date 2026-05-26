import { IconProps } from '@/types/icon';

export default function IconMeatball40px({
  size = 40,
  color,
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="20" cy="9" r="3" fill={color || '#79747E'} />
      <circle cx="20" cy="20" r="3" fill={color || '#79747E'} />
      <circle cx="20" cy="31" r="3" fill={color || '#79747E'} />
    </svg>
  );
}
