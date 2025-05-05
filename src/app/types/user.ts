// Define user types and interfaces

export type UserRole = 'student' | 'advisor' | 'admin';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  userType?: UserRole;
  userData?: User;
  isFirstLogin?: boolean;
}

export interface OnboardResponse {
  success: boolean;
  message?: string;
  user?: User;
} 