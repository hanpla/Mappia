import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return (
    <main className="bg-ivory-F2E flex min-h-dvh items-center justify-center">
      <div className="mb-20 flex flex-col items-center justify-center">
        {children}
      </div>
    </main>
  );
}
