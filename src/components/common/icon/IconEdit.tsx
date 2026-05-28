import { IconProps } from '@/types/svg';

export default function IconEdit({ size = 16, color, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.6666 1.34131L12.6666 3.34131L11.142 4.86664L9.14196 2.86664L10.6666 1.34131ZM2.66663 9.33331V11.3333H4.66663L10.1993 5.80864L8.19929 3.80864L2.66663 9.33331ZM2.66663 13.3333H13.3333V14.6666H2.66663V13.3333Z"
        fill={color || '#3C3C43'}
      />
    </svg>
  );
}
