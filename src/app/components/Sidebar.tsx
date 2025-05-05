import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface SidebarProps {
  activePage?: string;
}

export default function Sidebar({ activePage = 'home' }: SidebarProps) {
  const router = useRouter();

  // Handle logout
  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('userType');
    // Redirect to login page
    router.push('/');
  };

  return (
    <aside className="w-64 h-full bg-gradient-to-b from-red-800 to-red-900 text-white flex flex-col fixed">
      {/* Logo section */}
      <div className="flex items-center justify-center py-6 border-b border-red-700">
        <div className="bg-white p-1 rounded-full shadow-md">
          <Image
            src="/images/iyte_logo.png"
            alt="IYTE Logo"
            width={50}
            height={50}
            className="rounded-full"
          />
        </div>
        <div className="ml-3">
          <h2 className="text-lg font-semibold">IYTE GMS</h2>
          <p className="text-xs text-red-200">Advisor Panel</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6">
        <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-red-300 pl-2">
          Main Menu
        </div>
        <ul className="space-y-1">
          <li>
            <Link 
              href="/dashboard" 
              className={`flex items-center px-4 py-3 rounded-lg hover:bg-red-700 transition-colors ${
                activePage === 'home' ? 'bg-red-700 font-medium' : ''
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </Link>
          </li>
          <li>
            <Link 
              href="#" 
              className={`flex items-center px-4 py-3 rounded-lg hover:bg-red-700 transition-colors ${
                activePage === 'students' ? 'bg-red-700 font-medium' : ''
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Students List
            </Link>
          </li>
          <li>
            <Link 
              href="#" 
              className={`flex items-center px-4 py-3 rounded-lg hover:bg-red-700 transition-colors ${
                activePage === 'reports' ? 'bg-red-700 font-medium' : ''
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Reports
            </Link>
          </li>
        </ul>
      </nav>

      {/* Logout section - separated as requested */}
      <div className="border-t border-red-700 p-4">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-center px-4 py-3 bg-red-950 text-white rounded-lg hover:bg-red-900 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>

        <div className="mt-4 text-center text-xs text-red-300">
          © İzmir Yüksek Teknoloji Enstitüsü
        </div>
      </div>
    </aside>
  );
} 