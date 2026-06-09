import Link from 'next/link';

import LoginForm from '@/components/auth/LoginForm';
import Logo from '@/components/common/logo/Logo';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-3 py-10">
      <div className="flex w-full max-w-160 flex-col items-center gap-10">
        <Link href="/activities">
          <Logo />
        </Link>
        <LoginForm />
      </div>
    </main>
  );
}
