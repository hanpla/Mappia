'use client';

import { useEffect, useRef, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import useToastStore from '@/stores/toastStore';

import { getMe } from '@/lib/api/users';
import { validatePasswordConfirm } from '@/lib/utils/validation';

import useUpdateMyInfo from '@/hooks/useUpdateMyInfo';

import type { UpdateMyInfoRequest } from '@/types/my-info';

import ProfileImageUpload from '@/components/common/image-upload/ProfileImageUpload';
import InputField from '@/components/common/input-field/InputField';
import Input from '@/components/common/input/Input';
import PasswordInput from '@/components/common/input/PasswordInput';

export const INFO_FORM_ID = 'info-form';

type FieldName = 'nickname' | 'email' | 'password' | 'passwordConfirm';

interface FieldConfig {
  name: FieldName;
  label: string;
  placeholder: string;
  autoComplete: string;
  type?: React.HTMLInputTypeAttribute;
  secure?: boolean;
  disabled?: boolean;
}

const FIELDS: FieldConfig[] = [
  {
    name: 'nickname',
    label: '닉네임',
    placeholder: '닉네임을 입력해 주세요',
    autoComplete: 'nickname',
  },
  {
    name: 'email',
    label: '이메일',
    placeholder: '이메일을 입력해 주세요',
    autoComplete: 'username',
    type: 'email',
    disabled: true,
  },
  {
    name: 'password',
    label: '비밀번호',
    placeholder: '비밀번호를 입력해 주세요',
    autoComplete: 'new-password',
    secure: true,
  },
  {
    name: 'passwordConfirm',
    label: '비밀번호 재입력',
    placeholder: '비밀번호를 한번 더 입력해 주세요',
    autoComplete: 'new-password',
    secure: true,
  },
];

const EMPTY_FIELDS: Record<FieldName, string> = {
  nickname: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

export default function InfoForm() {
  const { data: user } = useQuery({ queryKey: ['me'], queryFn: getMe });
  const { mutate: updateInfo, isPending } = useUpdateMyInfo();
  const showToast = useToastStore((state) => state.showToast);

  const [values, setValues] = useState(EMPTY_FIELDS);
  const [errors, setErrors] = useState(EMPTY_FIELDS);

  const initializedRef = useRef(false);
  useEffect(() => {
    if (!user || initializedRef.current) return;
    initializedRef.current = true;
    setValues((prev) => ({
      ...prev,
      nickname: user.nickname,
      email: user.email,
    }));
  }, [user]);

  const handleChange =
    (name: FieldName) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({ ...prev, [name]: e.target.value }));
      if (name === 'password' || name === 'passwordConfirm') {
        setErrors((prev) => ({ ...prev, passwordConfirm: '' }));
      }
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isPending) return;

    const passwordConfirmError = validatePasswordConfirm(
      values.password,
      values.passwordConfirm,
    );
    setErrors((prev) => ({ ...prev, passwordConfirm: passwordConfirmError }));
    if (passwordConfirmError) return;

    const payload: UpdateMyInfoRequest = {};
    if (user && values.nickname !== user.nickname) {
      payload.nickname = values.nickname;
    }
    if (values.password) {
      payload.newPassword = values.password;
    }

    if (Object.keys(payload).length === 0) {
      showToast('information', '변경된 내용이 없습니다.');
      return;
    }

    updateInfo(payload, {
      onSuccess: () => {
        setValues((prev) => ({ ...prev, password: '', passwordConfirm: '' }));
      },
    });
  };

  return (
    <form
      id={INFO_FORM_ID}
      noValidate
      onSubmit={handleSubmit}
      className="mt-6 flex flex-col gap-5"
    >
      <div className="flex flex-col items-center gap-1 md:hidden">
        <ProfileImageUpload
          name="profileImage"
          defaultSrc={user?.profileImageUrl}
          className="bg-white shadow-[0_6px_13px_rgba(0,0,0,0.06)]"
        />
        <div className="flex flex-col items-center gap-1">
          <p className="textxl-semibold text-black-1B1">{user?.nickname}</p>
          <p className="textxs-regular text-[#A3A3A3]">{user?.email}</p>
        </div>
      </div>

      <div className="flex flex-col gap-7">
        {FIELDS.map(
          ({
            name,
            label,
            placeholder,
            autoComplete,
            type,
            secure,
            disabled,
          }) => {
            const fieldProps = {
              id: name,
              placeholder,
              value: values[name],
              onChange: handleChange(name),
              autoComplete,
              disabled,
              hasError: !!errors[name],
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
                  <Input
                    {...fieldProps}
                    type={type}
                    className={disabled ? 'bg-gray-FAF text-gray-797' : ''}
                  />
                )}
              </InputField>
            );
          },
        )}
      </div>
    </form>
  );
}
