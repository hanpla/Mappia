'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

import useToastStore from '@/stores/toastStore';

import { signup } from '@/lib/api/auth';
import { getKakaoAuthUrl } from '@/lib/utils/kakao';
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

type FieldName = 'email' | 'nickname' | 'password' | 'passwordConfirm';

interface FieldConfig {
  name: FieldName;
  label: string;
  placeholder: string;
  autoComplete: string;
  type?: React.HTMLInputTypeAttribute;
  secure?: boolean;
}

const FIELDS: FieldConfig[] = [
  {
    name: 'email',
    label: '이메일',
    placeholder: '이메일을 입력해 주세요',
    autoComplete: 'username',
    type: 'email',
  },
  {
    name: 'nickname',
    label: '닉네임',
    placeholder: '닉네임을 입력해 주세요',
    autoComplete: 'nickname',
  },
  {
    name: 'password',
    label: '비밀번호',
    placeholder: '비밀번호를 입력해주세요',
    autoComplete: 'new-password',
    secure: true,
  },
  {
    name: 'passwordConfirm',
    label: '비밀번호 확인',
    placeholder: '비밀번호를 한번 더 입력해주세요',
    autoComplete: 'new-password',
    secure: true,
  },
];

const EMPTY_FIELDS: Record<FieldName, string> = {
  email: '',
  nickname: '',
  password: '',
  passwordConfirm: '',
};

const validateField = (
  name: FieldName,
  vals: Record<FieldName, string>,
): string => {
  switch (name) {
    case 'email':
      return validateEmail(vals.email);
    case 'nickname':
      return validateNickname(vals.nickname);
    case 'password':
      return validatePassword(vals.password);
    case 'passwordConfirm':
      return validatePasswordConfirm(vals.password, vals.passwordConfirm);
  }
};

export default function SignupForm() {
  const router = useRouter();
  const showToast = useToastStore((state) => state.showToast);
  const [values, setValues] = useState(EMPTY_FIELDS);
  const [errors, setErrors] = useState(EMPTY_FIELDS);

  const { mutate: signupMutate, isPending } = useMutation({
    mutationFn: () => signup(values.email, values.nickname, values.password),
    onSuccess: () => {
      showToast('success', '회원가입에 성공했습니다. 로그인해 주세요.');
      router.push('/login');
    },
    onError: (err) => {
      const message = isAxiosError<{ message?: string }>(err)
        ? err.response?.data?.message
        : undefined;

      // 서버가 돌려준 중복 이메일 메시지는 이메일 필드 인라인 에러로 표시한다.
      if (message?.includes('이메일')) {
        setErrors((prev) => ({ ...prev, email: message }));
        return;
      }

      showToast('error', message ?? SIGNUP_ERROR_MESSAGE);
    },
  });

  const handleChange =
    (name: FieldName) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setValues((prev) => ({ ...prev, [name]: e.target.value }));

  const handleBlur = (name: FieldName) => () =>
    setErrors((prev) => {
      const shouldValidateConfirm =
        values.passwordConfirm || prev.passwordConfirm;
      const confirmError = shouldValidateConfirm
        ? validatePasswordConfirm(values.password, values.passwordConfirm)
        : '';
      return {
        ...prev,
        [name]:
          name === 'passwordConfirm'
            ? confirmError
            : validateField(name, values),
        ...(name === 'password' && { passwordConfirm: confirmError }),
      };
    });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isPending) return;
    const nextErrors: Record<FieldName, string> = {
      email: validateField('email', values),
      nickname: validateField('nickname', values),
      password: validateField('password', values),
      passwordConfirm: validateField('passwordConfirm', values),
    };
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;
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
          {FIELDS.map(
            ({ name, label, placeholder, autoComplete, type, secure }) => {
              const fieldProps = {
                id: name,
                placeholder,
                value: values[name],
                onChange: handleChange(name),
                onBlur: handleBlur(name),
                hasError: !!errors[name],
                autoComplete,
              };
              return (
                <InputField
                  key={name}
                  label={label}
                  htmlFor={name}
                  error={errors[name]}
                  className="textlg-regular"
                >
                  {secure ? (
                    <PasswordInput {...fieldProps} />
                  ) : (
                    <Input {...fieldProps} type={type} />
                  )}
                </InputField>
              );
            },
          )}

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

        <Link
          href={getKakaoAuthUrl({ state: 'signup', prompt: 'login' })}
          aria-label="카카오 회원가입"
        >
          <IconKakao size={72} />
        </Link>
      </div>
    </form>
  );
}
