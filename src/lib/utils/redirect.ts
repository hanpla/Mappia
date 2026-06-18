export const DEFAULT_REDIRECT = '/activities';

export const getSafeCallback = (raw: string | null | undefined): string => {
  if (
    !raw ||
    !raw.startsWith('/') ||
    raw.startsWith('//') ||
    raw.startsWith('/\\')
  ) {
    return DEFAULT_REDIRECT;
  }
  return raw;
};

export const buildLoginUrl = (currentPath: string): string =>
  currentPath.startsWith('/login')
    ? '/login'
    : `/login?callback=${encodeURIComponent(currentPath)}`;
