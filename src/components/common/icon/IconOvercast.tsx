import { IconProps } from '@/types/svg';

export default function IconOvercast({
  size = 24,
  color,
  ...props
}: IconProps) {
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
      className={color ? undefined : 'text-slate-400'}
      {...props}
    >
      <path
        d="M17.5 18A3.5 3.5 0 0 0 15 13.5a5.5 5.5 0 0 0-10.7 1.8A3.5 3.5 0 0 0 7.5 21h10a3.5 3.5 0 0 0 0-7z"
        fill="currentColor"
        className={color ? undefined : 'text-slate-400'}
      />
    </svg>
  );
}
