'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation for App Router
import Image from 'next/image';

// Add these styles at the top of the file, below the imports
const inputStyles = `
  .login-input::placeholder {
    color: #9CA3AF;
    opacity: 1;
  }
`;

export default function HomePage() { // Renamed function to HomePage
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const authResponse = await fetch('/api/mock-auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const authData = await authResponse.json();

      if (authResponse.ok && authData.success) {
        console.log('Login successful, user type:', authData.userType);
        
        // Save user data to localStorage for session management
        localStorage.setItem('user', JSON.stringify(authData.userData));
        localStorage.setItem('userType', authData.userType);

        if (authData.isFirstLogin && authData.userData) {
          console.log('Attempting to onboard user:', authData.userData.email);
          try {
            const onboardResponse = await fetch('/api/user/onboard', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                userType: authData.userType,
                userData: authData.userData,
              }),
            });

            const onboardData = await onboardResponse.json();

            if (onboardResponse.ok && onboardData.success) {
              console.log('User onboarding successful:', onboardData.user.email);
              // Onboarding successful, proceed to redirect
            } else {
              // Handle onboarding failure
              console.error('Onboarding failed:', onboardData.message);
              setError(`Onboarding failed: ${onboardData.message || 'Unknown error'}`);
              setIsLoading(false);
              return; // Stop execution
            }
          } catch (onboardErr) {
            console.error('Onboarding request failed:', onboardErr);
            setError('An error occurred during onboarding. Please try again.');
            setIsLoading(false);
            return; // Stop execution
          }
        }
        // Redirect after successful login/onboarding
        if (authData.userType === 'student') {
          router.push('/student-dashboard');
        } else if (authData.userType === 'advisor') {
          router.push('/dashboard');
        } else {
          console.error('Unknown user type:', authData.userType);
          setError('Unknown user type. Please contact system administrator.');
          setIsLoading(false);
        }
      } else {
        setError(authData.message || 'Invalid credentials or server error.');
      }
    } catch (err) {
      console.error('Login request failed:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
         style={{ backgroundImage: "url('/images/login_background.jpg')" }}>
      {/* Add style tag for input placeholders */}
      <style jsx>{inputStyles}</style>
      
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black opacity-30"></div>

      {/* Login Box */}
      <div className="relative z-10 bg-white p-8 rounded-lg shadow-xl w-full max-w-md mx-4">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/images/iyte_logo.png" // Assuming png format
            alt="IYTE Logo"
            width={80} // Adjust size as needed
            height={80} // Adjust size as needed
            priority // Load logo quickly
          />
        </div>

        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-2">Graduation Management System</h1>
        <p className="text-sm text-center text-gray-600 mb-6">iyte.edu.tr Etki Alanı Kullanıcı Bilgileri</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Kullanıcı E-postası</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 login-input"
              placeholder="E-posta Adresi"
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Şifre</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 login-input"
              placeholder="Şifre"
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                disabled={isLoading}
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">Beni Hatırla</label>
            </div>
            {/* Optional: Add Forgot Password link here */}
          </div>

          {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isLoading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-75`}
            >
              {isLoading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
