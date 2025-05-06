import { NextResponse } from 'next/server';

// Mock data from the main auth file
const mockOutlierStudents = [
  { "id": 181, "name": "Outlier Student 1", "studentId": "290201072", "email": "student.outlier1@example.com", "departmentId": 19, "advisorId": 19, "password": "password_student_181" },
  { "id": 182, "name": "Outlier Student 2", "studentId": "290202082", "email": "student.outlier2@example.com", "departmentId": 19, "advisorId": 19, "password": "password_student_182" },
  { "id": 183, "name": "Outlier Student 3", "studentId": "280201001", "email": "student.outlier3@example.com", "departmentId": 19, "advisorId": 19, "password": "password_student_183" },
  { "id": 184, "name": "Outlier Student 4", "studentId": "280201002", "email": "student.outlier4@example.com", "departmentId": 19, "advisorId": 19, "password": "password_student_184" },
  { "id": 185, "name": "Outlier Student 5", "studentId": "280201003", "email": "student.outlier5@example.com", "departmentId": 19, "advisorId": 19, "password": "password_student_185" },
  { "id": 186, "name": "Outlier Student 6", "studentId": "280201004", "email": "student.outlier6@example.com", "departmentId": 19, "advisorId": 19, "password": "password_student_186" },
  { "id": 187, "name": "Outlier Student 7", "studentId": "280201005", "email": "student.outlier7@example.com", "departmentId": 19, "advisorId": 19, "password": "password_student_187" },
  { "id": 188, "name": "Outlier Student 8", "studentId": "280201006", "email": "student.outlier8@example.com", "departmentId": 19, "advisorId": 19, "password": "password_student_188" },
];

export async function GET(
  request: Request,
  { params }: { params: { studentId: string } }
) {
  const studentId = params.studentId;

  if (!studentId) {
    return NextResponse.json(
      { success: false, message: 'Student ID is required' },
      { status: 400 }
    );
  }

  // Find the outlier student by studentId
  const student = mockOutlierStudents.find(s => s.studentId === studentId);

  if (!student) {
    return NextResponse.json(
      { success: false, message: 'Öğrenci bulunamadı' },
      { status: 404 }
    );
  }

  // Remove password before sending to client
  const { password, ...studentData } = student;

  return NextResponse.json({
    success: true,
    student: studentData
  });
} 