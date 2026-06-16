import { isAxiosError } from 'axios';

// Axios 에러면 서버가 보낸 message를, 그 외에는 fallback을 반환한다.
export const getApiErrorMessage = (
  error: unknown,
  fallback: string,
): string => {
  if (isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message ?? fallback;
  }
  return fallback;
};
