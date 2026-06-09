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

// 폼이 페이지의 '저장하기' 버튼(form 바깥)과 form 어트리뷰트로 연결되는 식별자.
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
    // 이메일은 내 정보 수정 대상이 아니므로 보여주기만 하고 비활성화한다.
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

  // 불러온 내 정보로 닉네임·이메일 인풋 초기값을 한 번만 채운다(이후 사용자 입력을 덮어쓰지 않도록).
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
      // 비밀번호 관련 입력을 고치면 재입력 에러를 즉시 지운다.
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

    // 원래 값과 달라진 항목만 추려서 보낸다(이메일은 수정 대상이 아니다).
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
        // 저장 후 비밀번호 입력값은 비운다.
        setValues((prev) => ({ ...prev, password: '', passwordConfirm: '' }));
      },
    });
  };

  return (
    <form
      id={INFO_FORM_ID}
      noValidate
      onSubmit={handleSubmit}
      className="mt-6 flex flex-col"
    >
      {/* 모바일: 폼 위에 프로필 이미지 + 현재 닉네임/이메일 (md 이상에서는 사이드 메뉴가 대신 보여준다) */}
      <div className="mb-5 flex flex-col items-center md:hidden">
        <ProfileImageUpload
          name="profileImage"
          defaultSrc={user?.profileImageUrl}
        />
        <div className="mt-4 flex flex-col items-center gap-1">
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
