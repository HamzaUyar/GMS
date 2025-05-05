'use client';

import { ReactNode, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

interface AuthGuardProps {
  children: ReactNode;
}

// Public routes that don't require authentication
const publicRoutes = ['/', '/login', '/register'];

export default function AuthGuard({ children }: AuthGuardProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Skip check for public routes
    if (publicRoutes.includes(pathname)) {
      setIsAuthorized(true);
      return;
    }

    // Check authentication
    if (!isLoading) {
      if (!user) {
        // No authenticated user found - redirect to login
        router.push('/');
      } else {
        // User is authenticated - allow access
        setIsAuthorized(true);
      }
    }
  }, [user, isLoading, router, pathname]);

  // Show loading indicator or nothing while checking auth
  if (isLoading || (!isAuthorized && !publicRoutes.includes(pathname))) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-800"></div>
      </div>
    );
  }

  // If public route or authorized, render children
  return <>{children}</>;
} 