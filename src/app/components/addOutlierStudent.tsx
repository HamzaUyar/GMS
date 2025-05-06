import React, { useState } from 'react';

interface OutlierStudent {
  id: number;
  name: string;
  email: string;
  studentId: string;
  departmentId: number;
  advisorId: number;
}

interface AddOutlierStudentProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStudent: (student: OutlierStudent) => void;
}

export default function AddOutlierStudent({ isOpen, onClose, onAddStudent }: AddOutlierStudentProps) {
  const [studentId, setStudentId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!studentId.trim()) {
      setError('Öğrenci numarası giriniz.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Call the API to get the outlier student by studentId
      const response = await fetch(`/api/student/outlier/${studentId}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Öğrenci bulunamadı');
      }

      const data = await response.json();
      
      if (data.success && data.student) {
        onAddStudent(data.student);
        onClose();
      } else {
        throw new Error('Öğrenci verisi bulunamadı');
      }
    } catch (error) {
      console.error('Error fetching outlier student:', error);
      setError(error instanceof Error ? error.message : 'Öğrenci bilgileri alınırken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Outlier Öğrenci Ekle</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-1">
              Öğrenci Numarası
            </label>
            <input
              type="text"
              id="studentId"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
              placeholder="Örn: 290201072"
              disabled={loading}
            />
          </div>

          {error && (
            <div className="mb-4 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              disabled={loading}
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-red-700 rounded-md hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              disabled={loading}
            >
              {loading ? 'Yükleniyor...' : 'Ekle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
