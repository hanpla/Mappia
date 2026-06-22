import { ReactNode } from 'react';

interface TitleProps {
  title: string;
  action?: ReactNode;
}

export default function Title({ title, action }: TitleProps) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="textxl-bold md:text2xl-bold text-black-1B1">{title}</h2>
      {action && <div>{action}</div>}
    </div>
  );
}
