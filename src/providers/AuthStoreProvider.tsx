'use client';

import { ReactNode, createContext, useContext, useEffect } from 'react';

import { useAuthStore } from '@/stores/authStore';

import type { User } from '@/types/auth';

interface Props {
  children: ReactNode;
  initialProps: { isLogin: boolean; user: User | null };
}

const AuthContext = createContext(false);

export function useIsLogin() {
  return useContext(AuthContext);
}

export default function AuthStoreProvider({ children, initialProps }: Props) {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    if (initialProps.isLogin && initialProps.user) {
      setUser(initialProps.user);
    }
  }, [setUser, initialProps.isLogin, initialProps.user?.id]);

  return (
    <AuthContext.Provider value={initialProps.isLogin}>
      {children}
    </AuthContext.Provider>
  );
}
