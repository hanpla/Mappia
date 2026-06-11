import { IconProps } from '@/types/svg';

export default function IconSun({ size = 24, color, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || 'currentColor'}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={color ? undefined : 'text-amber-500'}
      {...props}
    >
      <circle
        cx="12"
        cy="12"
        r="4"
        fill="currentColor"
        className={color ? undefined : 'text-amber-500'}
      />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}
