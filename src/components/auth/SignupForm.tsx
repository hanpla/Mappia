'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

import useToastStore from '@/stores/toastStore';

import { signup } from '@/lib/api/auth';
import {
  validateEmail,
  validateNickname,
  validatePassword,
  validatePasswordConfirm,
} from '@/lib/utils/validation';

import Button from '@/components/common/button/Button';
import IconKakao from '@/components/common/icon/IconKakao';
import InputField from '@/components/common/input-field/InputField';
import Input from '@/components/common/input/Input';
import PasswordInput from '@/components/common/input/PasswordInput';

const SIGNUP_ERROR_MESSAGE = '회원가입에 실패했습니다. 정보를 확인해 주세요.';

export default function SignupForm() {
  const router = useRouter();
  const showToast = useToastStore((state) => state.showToast);
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [emailError, setEmailError] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState('');

  const { mutate: signupMutate, isPending } = useMutation({
    mutationFn: () => signup(email, nickname, password),
    onSuccess: () => {
      showToast('success', '회원가입에 성공했습니다. 로그인해 주세요.');
      router.push('/login');
    },
    onError: (err) => {
      const message = isAxiosError<{ message: string }>(err)
        ? (err.response?.data?.message ?? SIGNUP_ERROR_MESSAGE)
        : SIGNUP_ERROR_MESSAGE;
      showToast('error', message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailErr = validateEmail(email);
    const nicknameErr = validateNickname(nickname);
    const passwordErr = validatePassword(password);
    const passwordConfirmErr = validatePasswordConfirm(
      password,
      passwordConfirm,
    );
    setEmailError(emailErr);
    setNicknameError(nicknameErr);
    setPasswordError(passwordErr);
    setPasswordConfirmError(passwordConfirmErr);
    if (emailErr || nicknameErr || passwordErr || passwordConfirmErr) return;
    signupMutate();
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
              onChange={(e) => setEmail(e.target.value)}
              hasError={!!emailError}
              autoComplete="username"
            />
          </InputField>
          <InputField
            label="닉네임"
            htmlFor="nickname"
            error={nicknameError}
            className="textlg-regular"
          >
            <Input
              id="nickname"
              type="text"
              placeholder="닉네임을 입력해 주세요"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              hasError={!!nicknameError}
              autoComplete="nickname"
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
              onChange={(e) => setPassword(e.target.value)}
              hasError={!!passwordError}
              autoComplete="new-password"
            />
          </InputField>
          <InputField
            label="비밀번호 확인"
            htmlFor="passwordConfirm"
            error={passwordConfirmError}
            className="textlg-regular"
          >
            <PasswordInput
              id="passwordConfirm"
              placeholder="비밀번호를 한번 더 입력해주세요"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              hasError={!!passwordConfirmError}
              autoComplete="new-password"
            />
          </InputField>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? '회원가입 중...' : '회원가입 하기'}
          </Button>
        </div>

        <p className="textmd-regular text-gray-4B4 text-center">
          회원이신가요?{' '}
          <Link href="/login" className="text-brown-2A2 underline">
            로그인하기
          </Link>
        </p>
      </div>
      <div className="flex flex-col items-center gap-4">
        <div className="flex w-full items-center gap-3">
          <div className="bg-gray-CBC h-px flex-1" />
          <span className="textmd-regular text-gray-797 shrink-0">
            SNS 계정으로 회원가입하기
          </span>
          <div className="bg-gray-CBC h-px flex-1" />
        </div>

        <button type="button" aria-label="카카오 로그인">
          <IconKakao size={72} />
        </button>
      </div>
    </form>
  );
}
