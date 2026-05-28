import Logo from '@/components/common/logo/Logo';
import LoginForm from '@/components/login/LoginForm';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-3 py-10">
      <div className="flex w-full max-w-160 flex-col items-center gap-10">
        <Logo />
        <LoginForm />
      </div>
    </main>
  );
}
