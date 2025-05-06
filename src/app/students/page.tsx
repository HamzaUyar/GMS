'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import StudentsTable from '../components/StudentsTable';
import Sidebar from '../components/Sidebar';

// Define types for the fetched data
interface Student {
  id: number;
  name: string;
  email: string;
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
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
        const data = await response.json();
        setStudents(data.students || []);
      } catch (error: unknown) {
        console.error("Failed to fetch students data:", error);
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
      {/* Using the Sidebar component with students as active page */}
      <Sidebar activePage="students" />

      {/* Main Content */}
      <main className="flex-1 p-8 ml-64">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Students List</h1>

        {isLoading && <p>Loading students data...</p>}
        {error && <p className="text-red-600">Error: {error}</p>}

        {!isLoading && !error && <StudentsTable students={students} />}
      </main>
    </div>
  );
} 