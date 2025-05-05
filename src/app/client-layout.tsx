'use client';

import { ReactNode } from 'react';
import { AuthProvider } from './context/AuthContext';
import AuthGuard from './components/auth/AuthGuard';

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <AuthProvider>
      <AuthGuard>
        {children}
      </AuthGuard>
    </AuthProvider>
  );
} 