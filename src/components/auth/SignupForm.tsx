'use client';

import Link from 'next/link';
import { useState } from 'react';

import Button from '@/components/common/button/Button';
import IconKakao from '@/components/common/icon/IconKakao';
import InputField from '@/components/common/input-field/InputField';
import Input from '@/components/common/input/Input';
import PasswordInput from '@/components/common/input/PasswordInput';

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-12">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-7">
            <InputField
              label="이메일"
              htmlFor="email"
              className="textlg-regular"
            >
              <Input
                id="email"
                type="email"
                placeholder="이메일을 입력해 주세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
                required
              />
            </InputField>
            <InputField
              label="닉네임"
              htmlFor="nickname"
              className="textlg-regular"
            >
              <Input
                id="nickname"
                type="text"
                placeholder="닉네임을 입력해 주세요"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                autoComplete="nickname"
                required
              />
            </InputField>
            <InputField
              label="비밀번호"
              htmlFor="password"
              className="textlg-regular"
            >
              <PasswordInput
                id="password"
                placeholder="비밀번호를 입력해주세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
            </InputField>
            <InputField
              label="비밀번호 확인"
              htmlFor="passwordConfirm"
              className="textlg-regular"
            >
              <PasswordInput
                id="passwordConfirm"
                placeholder="비밀번호를 한번 더 입력해주세요"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                autoComplete="new-password"
                required
              />
            </InputField>
          </div>

          <Button type="submit" className="w-full">
            회원가입 하기
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
