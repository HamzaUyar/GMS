'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

// Define types for the fetched data (based on Prisma schema + included relations)
interface Student {
  id: number;
  name: string;
  email: string;
  // Add other student fields if needed later
}

interface AdvisorData {
  id: number;
  name: string;
  email: string;
  type: string;
  department: {
    id: number;
    name: string;
  };
  students: Student[];
}

export default function AdvisorDashboard() {
  const [advisorData, setAdvisorData] = useState<AdvisorData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [advisorId, setAdvisorId] = useState<number | null>(null);
  const router = useRouter();

  // Get the logged-in user from session storage
  useEffect(() => {
    const getUserData = () => {
      try {
        const sessionData = localStorage.getItem('user');
        const userType = localStorage.getItem('userType');
        
        if (!sessionData) {
          setError("No user data found. Please log in again.");
          return;
        }
        
        if (userType !== 'advisor') {
          // If not an advisor, redirect to appropriate dashboard
          router.push('/student-dashboard');
          return;
        }
        
        const userData = JSON.parse(sessionData);
        if (userData && userData.id) {
          setAdvisorId(userData.id);
        } else {
          setError("User data doesn't contain an ID");
        }
      } catch (error) {
        console.error("Error retrieving user data:", error);
        setError("Unable to retrieve user session data.");
      }
    };

    getUserData();
  }, [router]);

  // Handle logout
  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('userType');
    // Redirect to login page
    router.push('/');
  };

  useEffect(() => {
    if (!advisorId) return; // Wait until we have the advisorId

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/advisor/${advisorId}/dashboard`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }
        const data: AdvisorData = await response.json();
        setAdvisorData(data);
      } catch (error: unknown) {
        console.error("Failed to fetch dashboard data:", error);
        if (error instanceof Error) {
            setError(error.message || "Failed to load data.");
        } else {
            setError("An unknown error occurred while loading data.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [advisorId]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-60 bg-red-800 text-white flex flex-col p-4 fixed h-full">
        <div className="flex items-center justify-center mb-10">
          <Image
            src="/images/iyte_logo.png"
            alt="IYTE Logo"
            width={60}
            height={60}
            className="bg-white rounded-full p-1"
          />
        </div>
        <nav className="flex flex-col space-y-2">
          {/* TODO: Implement actual routing/active states */}
          <Link href="/dashboard" className="px-3 py-2 rounded hover:bg-red-700">Home</Link>
          <Link href="#" className="px-3 py-2 rounded hover:bg-red-700">Students list</Link>
        </nav>
        
        {/* Add logout button before the footer */}
        <div className="mt-auto mb-6">
          <button 
            onClick={handleLogout}
            className="w-full px-3 py-2 bg-red-900 text-white rounded hover:bg-red-950 flex items-center justify-center"
          >
            <span>Logout</span>
          </button>
        </div>
        
        <div className="text-center text-xs">
          © İzmir Yüksek Teknoloji Enstitüsü
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 ml-60"> {/* Add margin-left to offset sidebar width */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Graduation Management System (Advisor)</h1>

        {isLoading && <p>Loading advisor data...</p>}
        {error && <p className="text-red-600">Error: {error}</p>}

        {advisorData && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-medium text-gray-700 mb-4">Advisor Information</h2>
             <div className="flex items-center space-x-4">
                {/* Placeholder for advisor picture */}
                <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-xl font-semibold text-gray-500">?
                    {/* <Image src="/path/to/advisor/image.jpg" alt="Advisor" width={64} height={64} className="rounded-full" /> */}
                </div>
                <div>
                    <p className="font-semibold">Advisor name: {advisorData.name}</p>
                    <p className="text-sm text-gray-600">{advisorData.email}</p>
                    <p className="text-sm text-gray-600">Department: {advisorData.department.name}</p>
                 </div>
             </div>
          </div>
        )}

        {advisorData && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-medium text-gray-700 mb-4">Students Graduation Statements</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transcript</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {advisorData.students.length > 0 ? (
                    advisorData.students.map((student, index) => (
                      <tr key={student.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.id}</td> {/* Using DB ID */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="px-3 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700">Transcript</button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{"Pending"}</td> {/* Placeholder Status */}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">No students assigned to this advisor.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex space-x-3">
                <button className="px-4 py-2 bg-red-700 text-white text-sm rounded hover:bg-red-800">Approve Transcripts</button>
                <button className="px-4 py-2 bg-red-700 text-white text-sm rounded hover:bg-red-800">Add Outlier Student</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 