'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdvisorInfoCard from '../components/AdvisorInfoCard';
import StudentsTable from '../components/StudentsTable';
import Sidebar from '../components/Sidebar';

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
      {/* Using the new Sidebar component */}
      <Sidebar activePage="home" />

      {/* Main Content - updated margin to match new sidebar width */}
      <main className="flex-1 p-8 ml-64">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Graduation Management System (Advisor)</h1>

        {isLoading && <p>Loading advisor data...</p>}
        {error && <p className="text-red-600">Error: {error}</p>}

        {advisorData && <AdvisorInfoCard 
          name={advisorData.name} 
          email={advisorData.email} 
          department={advisorData.department} 
        />}

        {advisorData && <StudentsTable students={advisorData.students} />}
      </main>
    </div>
  );
} 