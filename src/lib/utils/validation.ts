const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateEmail = (value: string) => {
  if (!EMAIL_REGEX.test(value)) return '이메일 형식으로 작성해주세요';
  return '';
};

export const validatePassword = (value: string) => {
  if (value.length < 8) return '8자 이상으로 입력해주세요';
  return '';
};

export const validateNickname = (value: string) => {
  if (!value.trim()) return '닉네임을 입력해주세요';
  if (value.length > 10) return '열 자 이하로 입력해주세요';
  return '';
};

export const validatePasswordConfirm = (
  password: string,
  passwordConfirm: string,
) => {
  if (password !== passwordConfirm) return '비밀번호가 일치하지 않습니다';
  return '';
};
