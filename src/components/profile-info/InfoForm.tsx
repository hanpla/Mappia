'use client';

import { useState } from 'react';

import InputField from '@/components/common/input-field/InputField';
import Input from '@/components/common/input/Input';
import PasswordInput from '@/components/common/input/PasswordInput';

type FieldName = 'nickname' | 'email' | 'password' | 'passwordConfirm';

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
  const [values, setValues] = useState(EMPTY_FIELDS);

  const handleChange =
    (name: FieldName) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setValues((prev) => ({ ...prev, [name]: e.target.value }));

  return (
    <form
      noValidate
      onSubmit={(e) => e.preventDefault()}
      className="mt-6 flex flex-col gap-7"
    >
      {FIELDS.map(
        ({ name, label, placeholder, autoComplete, type, secure }) => {
          const fieldProps = {
            id: name,
            placeholder,
            value: values[name],
            onChange: handleChange(name),
            autoComplete,
          };
          return (
            <InputField
              key={name}
              label={label}
              htmlFor={name}
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
    </form>
  );
}
