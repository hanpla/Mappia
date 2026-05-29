const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(value: string) {
  if (!EMAIL_REGEX.test(value)) return '이메일 형식으로 작성해주세요';
  return '';
}

export function validatePassword(value: string) {
  if (value.length < 8) return '8자 이상으로 입력해주세요';
  return '';
}
