'use client';

import { ReactNode, createContext, useContext } from 'react';

import type { User } from '@/types/auth';

interface Props {
  children: ReactNode;
  user: User | null;
}

const AuthContext = createContext(false);

export function useIsLogin() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children, user }: Props) {
  return <AuthContext.Provider value={!!user}>{children}</AuthContext.Provider>;
}
