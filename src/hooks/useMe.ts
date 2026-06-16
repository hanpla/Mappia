import { type UseQueryOptions, useQuery } from '@tanstack/react-query';

import { getMe } from '@/lib/api/users';

import type { User } from '@/types/auth';

type UseMeOptions = Omit<UseQueryOptions<User>, 'queryKey' | 'queryFn'>;

export default function useMe(options?: UseMeOptions) {
  return useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    staleTime: 1000 * 60 * 5,
    ...options,
  });
}
