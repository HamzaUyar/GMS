import { AuthResponse, OnboardResponse, User, UserRole } from '../types/user';

// Authentication service functions

/**
 * Login user with email and password
 */
export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  try {
    const response = await fetch('/api/mock-auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    
    // If login successful, store user data
    if (response.ok && data.success) {
      storeUserData(data.userData, data.userType);
      
      // Handle first login if needed
      if (data.isFirstLogin && data.userData) {
        await onboardUser(data.userType, data.userData);
      }
    }
    
    return data;
  } catch (error) {
    console.error('Login failed:', error);
    return {
      success: false,
      message: 'An unexpected error occurred during login.'
    };
  }
}

/**
 * Onboard a new user
 */
export async function onboardUser(userType: UserRole, userData: User): Promise<OnboardResponse> {
  try {
    const response = await fetch('/api/user/onboard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userType,
        userData,
      }),
    });

    return await response.json();
  } catch (error) {
    console.error('Onboarding failed:', error);
    return {
      success: false,
      message: 'An error occurred during onboarding.'
    };
  }
}

/**
 * Get currently logged in user
 */
export function getCurrentUser(): User | null {
  try {
    const userData = localStorage.getItem('user');
    if (!userData) return null;
    
    return JSON.parse(userData);
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

/**
 * Get current user role
 */
export function getUserRole(): UserRole | null {
  try {
    const userType = localStorage.getItem('userType') as UserRole;
    return userType || null;
  } catch (error) {
    console.error('Error getting user role:', error);
    return null;
  }
}

/**
 * Store user data in localStorage
 */
export function storeUserData(userData: User, userType: UserRole): void {
  localStorage.setItem('user', JSON.stringify(userData));
  localStorage.setItem('userType', userType);
}

/**
 * Log out current user
 */
export function logoutUser(): void {
  localStorage.removeItem('user');
  localStorage.removeItem('userType');
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return !!getCurrentUser();
}

/**
 * Get dashboard URL based on user role
 */
export function getDashboardUrl(): string {
  const role = getUserRole();
  
  switch (role) {
    case 'student':
      return '/student-dashboard';
    case 'advisor':
      return '/dashboard';
    case 'admin':
      return '/admin-dashboard';
    default:
      return '/';
  }
} 