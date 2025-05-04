'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

// Define types for the fetched data
interface Advisor {
  id: number;
  name: string;
  email: string;
  type: string;
  departmentId: number;
}

interface Department {
  id: number;
  name: string;
}

interface Transcript {
  id?: number;
  studentId: number;
  creditsCompleted: number;
  compulsoryCoursesCompleted: number;
  ects: number;
}

interface StudentData {
  id: number;
  name: string;
  email: string;
  department: Department;
  advisorId: number;
  advisor: Advisor;
  transcript?: Transcript;
}

export default function StudentDashboard() {
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
        
        if (userType !== 'student') {
          // If not a student, redirect to appropriate dashboard
          router.push('/dashboard');
          return;
        }
        
        const userData = JSON.parse(sessionData);
        
        // Format the data as needed for the student dashboard
        setStudentData({
          id: userData.id,
          name: userData.name,
          email: userData.email,
          department: {
            id: userData.departmentId,
            name: 'Loading department...' // Will be populated from advisor data
          },
          advisorId: userData.advisorId,
          advisor: {
            id: userData.advisorId,
            name: 'Loading advisor name...', // Placeholder
            email: 'Loading advisor email...', // Placeholder
            type: 'Professor',
            departmentId: userData.departmentId
          }
        });
        
        // Fetch additional data like advisor details if needed
        fetchAdvisorDetails(userData.advisorId);
        fetchTranscript(userData.id);
        
      } catch (error) {
        console.error("Error retrieving user data:", error);
        setError("Unable to retrieve user session data.");
      }
    };

    getUserData();
  }, [router]);

  // Fetch advisor details
  const fetchAdvisorDetails = async (advisorId: number) => {
    if (!advisorId) return;
    
    try {
      const response = await fetch(`/api/advisor/${advisorId}/details`);
      if (response.ok) {
        const advisorData = await response.json();
        
        setStudentData(prevState => {
          if (!prevState) return null;
          return {
            ...prevState,
            advisor: {
              ...advisorData,
              departmentId: advisorData.departmentId
            },
            department: {
              id: prevState.department.id,
              name: advisorData.department?.name || 'Unknown Department'
            }
          };
        });
      }
    } catch (error) {
      console.error("Failed to fetch advisor details:", error);
      // Don't set error state here, just log it
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch transcript data
  const fetchTranscript = async (studentId: number) => {
    if (!studentId) return;
    
    try {
      setIsLoading(true);
      const response = await fetch(`/api/student/${studentId}/transcript`);
      if (response.ok) {
        const transcriptData = await response.json();
        console.log("Transcript data fetched:", transcriptData); // Add logging
        
        setStudentData(prevState => {
          if (!prevState) return null;
          return {
            ...prevState,
            transcript: transcriptData
          };
        });
      } else {
        console.error("Failed to fetch transcript data: ", await response.text());
      }
    } catch (error) {
      console.error("Failed to fetch transcript data:", error);
      // Don't set error state here, just log it
    } finally {
      setIsLoading(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('userType');
    // Redirect to login page
    router.push('/');
  };

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
          <Link href="/student-dashboard" className="px-3 py-2 rounded hover:bg-red-700">Home</Link>
          <Link href="#" className="px-3 py-2 rounded hover:bg-red-700">Graduation Status</Link>
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
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Graduation Management System (Student)</h1>

        {isLoading && <p>Loading student data...</p>}
        {error && <p className="text-red-600">Error: {error}</p>}

        {studentData && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-medium text-gray-700 mb-4">Student Information</h2>
            <div className="flex items-center space-x-4">
              {/* Placeholder for student picture */}
              <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-xl font-semibold text-gray-500">
                {studentData.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold">Name: {studentData.name}</p>
                <p className="text-sm text-gray-600">Email: {studentData.email}</p>
                <p className="text-sm text-gray-600">Student ID: {studentData.id}</p>
                <p className="text-sm text-gray-600">Department: {studentData.department.name}</p>
              </div>
            </div>
          </div>
        )}

        {studentData && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-medium text-gray-700 mb-4">Advisor Information</h2>
            <div className="flex items-center space-x-4">
              {/* Placeholder for advisor picture */}
              <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-xl font-semibold text-gray-500">
                {studentData.advisor.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold">Advisor: {studentData.advisor.name}</p>
                <p className="text-sm text-gray-600">Email: {studentData.advisor.email}</p>
                <p className="text-sm text-gray-600">Type: {studentData.advisor.type}</p>
              </div>
            </div>
          </div>
        )}

        {/* Debug data */}
        {studentData && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-4">
            <h2 className="text-xl font-medium text-gray-700 mb-4">Debug Info</h2>
            <p>Has transcript data: {studentData.transcript ? 'Yes' : 'No'}</p>
            {studentData.transcript && <pre className="bg-gray-100 p-2 text-xs">{JSON.stringify(studentData.transcript, null, 2)}</pre>}
          </div>
        )}

        {studentData && studentData.transcript && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-medium text-gray-700 mb-4">Transcript Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500">Credits Completed</div>
                <div className="text-2xl font-semibold text-gray-800">{studentData.transcript.creditsCompleted}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500">Compulsory Courses</div>
                <div className="text-2xl font-semibold text-gray-800">{studentData.transcript.compulsoryCoursesCompleted}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500">ECTS</div>
                <div className="text-2xl font-semibold text-gray-800">{studentData.transcript.ects}</div>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${Math.min(100, (studentData.transcript.creditsCompleted / 240) * 100)}%` }}
                  ></div>
                </div>
                <span className="ml-2 text-sm font-medium text-gray-700">{Math.floor((studentData.transcript.creditsCompleted / 240) * 100)}%</span>
              </div>
              <p className="mt-2 text-sm text-gray-600">Overall graduation progress based on credits completed</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 