'use client';

import { ReactNode, createContext, useContext } from 'react';

interface Props {
  children: ReactNode;
  isLogin: boolean;
}

const AuthContext = createContext(false);

export function useIsLogin() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children, isLogin }: Props) {
  return (
    <AuthContext.Provider value={isLogin}>{children}</AuthContext.Provider>
  );
}
