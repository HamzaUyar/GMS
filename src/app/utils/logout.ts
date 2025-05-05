import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

/**
 * Centralized logout function that handles all cleanup operations
 * This function does not make API requests, only client-side cleanup
 */
export const handleLogout = (router?: ReturnType<typeof useRouter>) => {
  // Clear localStorage
  localStorage.removeItem('user');
  localStorage.removeItem('userType');
  
  // Clear cookies
  Cookies.remove('auth-token', { path: '/' });
  
  // Clear any session storage if used
  sessionStorage.clear();
  
  // Additional cleanup can be added here as needed
  // For example, reset any global state, etc.
  
  // Redirect to home/login page if router is provided
  if (router) {
    router.push('/');
  }
}; 