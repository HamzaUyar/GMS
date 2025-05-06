import React, { useState, useEffect } from 'react';
import AddOutlierStudent from './addOutlierStudent';

interface TranscriptData {
  id: number; // Assuming transcript has an ID
  studentId: number;
  creditsCompleted: number;
  compulsoryCoursesCompleted: number;
  ects: number;
  details?: string; // Placeholder for more detailed transcript info
}

interface Student {
  id: number;
  name: string;
  email: string;
  studentId?: string; // Added for outlier students
  departmentId?: number;
  advisorId?: number;
  transcript?: TranscriptData | null; // To store fetched transcript data
}

interface StudentsTableProps {
  students: Student[];
}

export default function StudentsTable({ students: initialStudents }: StudentsTableProps) {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [isTranscriptModalOpen, setIsTranscriptModalOpen] = useState(false);
  const [isOutlierModalOpen, setIsOutlierModalOpen] = useState(false);
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null);
  const [transcriptLoading, setTranscriptLoading] = useState(false);
  const [transcriptError, setTranscriptError] = useState<string | null>(null);
  
  // Update students when initialStudents changes
  useEffect(() => {
    setStudents(initialStudents);
  }, [initialStudents]);

  // Handle checkbox selection
  const handleSelectStudent = (studentId: number) => {
    setSelectedStudents(prev => 
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId) // Remove if already selected
        : [...prev, studentId] // Add if not selected
    );
  };
  
  // Handle select all students
  const handleSelectAll = () => {
    if (selectedStudents.length === students.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(students.map(student => student.id));
    }
  };
  
  // Handle approve transcripts
  const handleApproveTranscripts = () => {
    if (selectedStudents.length === 0) {
      alert('Please select at least one student');
      return;
    }
    
    console.log('Approving transcripts for students:', selectedStudents);
    setSelectedStudents([]);
  };

  // Handle opening the transcript modal and fetching data
  const handleOpenTranscriptModal = async (student: Student) => {
    setViewingStudent(student);
    setIsTranscriptModalOpen(true);
    setTranscriptLoading(true);
    setTranscriptError(null);

    // Check if transcript data is already fetched for this student (basic caching)
    if (student.transcript) {
        setTranscriptLoading(false);
        return;
    }

    try {
      const response = await fetch(`/api/student/${student.id}/transcript`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to fetch transcript: ${response.statusText}`);
      }
      const data: TranscriptData = await response.json();
      
      const studentIndex = students.findIndex(s => s.id === student.id);
      if (studentIndex !== -1) {
        setViewingStudent(prev => prev ? { ...prev, transcript: data } : null);
      }
      
    } catch (error) {
      console.error("Error fetching transcript:", error);
      if (error instanceof Error) {
        setTranscriptError(error.message);
      } else {
        setTranscriptError('An unknown error occurred.');
      }
    } finally {
      setTranscriptLoading(false);
    }
  };

  // Handle closing the transcript modal
  const handleCloseTranscriptModal = () => {
    setIsTranscriptModalOpen(false);
    setViewingStudent(null); // Clear student data
    setTranscriptLoading(false);
    setTranscriptError(null);
  };

  // Open outlier student modal
  const handleOpenOutlierModal = () => {
    setIsOutlierModalOpen(true);
  };

  // Handle adding outlier student
  const handleAddOutlierStudent = (student: Student) => {
    // Check if the student already exists in the list to avoid duplicates
    const exists = students.some(s => s.id === student.id);
    if (!exists) {
      setStudents(prev => [...prev, student]);
    } else {
      alert('Bu öğrenci zaten eklenmiş.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-medium text-gray-700 mb-4">Students Graduation Statements</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-red-600 border-gray-300 rounded"
                  checked={students.length > 0 && selectedStudents.length === students.length}
                  onChange={handleSelectAll}
                />
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transcript</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.length > 0 ? (
              students.map((student, index) => (
                <tr key={student.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-red-600 border-gray-300 rounded"
                      checked={selectedStudents.includes(student.id)}
                      onChange={() => handleSelectStudent(student.id)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button 
                      onClick={() => handleOpenTranscriptModal(student)}
                      className="px-3 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700"
                    >
                      Transcript
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{"Pending"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">No students assigned to this advisor.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex space-x-3">
        <button 
          className={`px-4 py-2 text-white text-sm rounded ${selectedStudents.length > 0 ? 'bg-red-700 hover:bg-red-800' : 'bg-red-400 cursor-not-allowed'}`}
          onClick={handleApproveTranscripts}
        >
          Approve Transcripts ({selectedStudents.length})
        </button>
        <button 
          className="px-4 py-2 bg-red-700 text-white text-sm rounded hover:bg-red-800"
          onClick={handleOpenOutlierModal}
        >
          Add Outlier Student
        </button>
      </div>

      {/* Transcript Modal */}
      {isTranscriptModalOpen && viewingStudent && (
        <div className="fixed inset-0 z-50 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Transcript for {viewingStudent.name} (ID: {viewingStudent.studentId || viewingStudent.id})
              </h3>
              <button 
                onClick={handleCloseTranscriptModal}
                className="text-gray-400 hover:text-gray-600"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            <div className="text-sm text-gray-700 space-y-2">
              {transcriptLoading && <p>Loading transcript...</p>}
              {transcriptError && <p className="text-red-500">Error: {transcriptError}</p>}
              {!transcriptLoading && !transcriptError && viewingStudent.transcript && (
                <>
                  <p><strong>Email:</strong> {viewingStudent.email}</p>
                  <div className="mt-4 p-4 bg-gray-50 rounded border border-gray-200">
                    <h4 className="font-medium text-gray-800 mb-2">Transcript Details:</h4>
                    <p><strong>Transcript ID:</strong> {viewingStudent.transcript.id}</p>
                    <p><strong>Credits Completed:</strong> {viewingStudent.transcript.creditsCompleted}</p>
                    <p><strong>Compulsory Courses Completed:</strong> {viewingStudent.transcript.compulsoryCoursesCompleted}</p>
                    <p><strong>Total ECTS:</strong> {viewingStudent.transcript.ects}</p>
                    {viewingStudent.transcript.details && (
                        <pre className="whitespace-pre-wrap text-xs mt-2">
                            {viewingStudent.transcript.details}
                        </pre>
                    )}
                  </div>
                </>
              )}
              {!transcriptLoading && !transcriptError && !viewingStudent.transcript && (
                <p>No transcript data found for this student.</p>
              )}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleCloseTranscriptModal}
                className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Outlier Student Modal */}
      <AddOutlierStudent 
        isOpen={isOutlierModalOpen} 
        onClose={() => setIsOutlierModalOpen(false)} 
        onAddStudent={handleAddOutlierStudent} 
      />
    </div>
  );
}