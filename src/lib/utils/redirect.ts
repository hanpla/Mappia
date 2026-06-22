export const DEFAULT_REDIRECT = '/activities';

const isSafeInternalPath = (raw: string | null | undefined): raw is string =>
  !!raw &&
  raw.startsWith('/') &&
  !raw.startsWith('//') &&
  !raw.startsWith('/\\');

export const getSafePath = (
  raw: string | null | undefined,
  fallback: string,
): string => (isSafeInternalPath(raw) ? raw : fallback);

export const getSafeCallback = (raw: string | null | undefined): string =>
  getSafePath(raw, DEFAULT_REDIRECT);

export const buildLoginUrl = (currentPath: string): string =>
  currentPath.startsWith('/login')
    ? '/login'
    : `/login?callback=${encodeURIComponent(currentPath)}`;
