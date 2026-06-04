'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';

import { useAuthStore } from '@/stores/authStore';
import useToastStore from '@/stores/toastStore';

import { login } from '@/lib/api/auth';
import { getApiErrorMessage } from '@/lib/utils/error';
import { getKakaoAuthUrl } from '@/lib/utils/kakao';
import { validateEmail, validatePassword } from '@/lib/utils/validation';

import Button from '@/components/common/button/Button';
import IconKakao from '@/components/common/icon/IconKakao';
import InputField from '@/components/common/input-field/InputField';
import Input from '@/components/common/input/Input';
import PasswordInput from '@/components/common/input/PasswordInput';

const LOGIN_ERROR_MESSAGE = '로그인에 실패했습니다. 정보를 확인해 주세요.';

export default function LoginForm() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const showToast = useToastStore((state) => state.showToast);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const { mutate: loginMutate, isPending } = useMutation({
    mutationFn: () => login(email, password),
    onSuccess: ({ data }) => {
      setAuth(data);
      showToast('success', '로그인에 성공했습니다.');
      router.refresh();
      router.push('/');
    },
    onError: (err) => {
      showToast('error', getApiErrorMessage(err, LOGIN_ERROR_MESSAGE));
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);
    setEmailError(emailErr);
    setPasswordError(passwordErr);
    if (emailErr || passwordErr) return;
    loginMutate();
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex w-full flex-col gap-12"
    >
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-7">
          <InputField
            label="이메일"
            htmlFor="email"
            error={emailError}
            className="textlg-regular"
          >
            <Input
              id="email"
              type="email"
              placeholder="이메일을 입력해 주세요"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError('');
              }}
              hasError={!!emailError}
              className="rounded-2xl"
              autoComplete="username"
            />
          </InputField>
          <InputField
            label="비밀번호"
            htmlFor="password"
            error={passwordError}
            className="textlg-regular"
          >
            <PasswordInput
              id="password"
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (passwordError) setPasswordError('');
              }}
              hasError={!!passwordError}
              autoComplete="current-password"
            />
          </InputField>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? '로그인 중...' : '로그인 하기'}
          </Button>
        </div>

        <p className="textmd-regular text-gray-4B4 text-center">
          회원이 아니신가요?{' '}
          <Link href="/signup" className="text-brown-2A2 underline">
            회원가입하기
          </Link>
        </p>
      </div>
      <div className="flex flex-col items-center gap-4">
        <div className="flex w-full items-center gap-3">
          <div className="bg-gray-CBC h-px flex-1" />
          <span className="textmd-regular text-gray-797 shrink-0">
            SNS 계정으로 로그인하기
          </span>
          <div className="bg-gray-CBC h-px flex-1" />
        </div>

        <Link href={getKakaoAuthUrl()} aria-label="카카오 로그인">
          <IconKakao size={72} />
        </Link>
      </div>
    </form>
  );
}
