'use client';

import { ReactNode, createContext, useContext, useEffect } from 'react';

import { useAuthStore } from '@/stores/authStore';

import type { User } from '@/types/auth';

interface Props {
  children: ReactNode;
  user: User | null;
}

const AuthContext = createContext(false);

export function useIsLogin() {
  return useContext(AuthContext);
}

export default function AuthStoreProvider({ children, user }: Props) {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [setUser, user?.id]);

  return <AuthContext.Provider value={!!user}>{children}</AuthContext.Provider>;
}
