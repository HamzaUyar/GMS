import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Import shared Prisma client

export async function POST(request: Request) {
  let requestEmail: string | undefined = undefined; // Variable to hold email for error reporting
  try {
    const body = await request.json();
    const { userType, userData } = body;

    // Store email early for potential error reporting
    requestEmail = userData?.email;

    if (!userType || !userData || !userData.email || !userData.name) {
      return NextResponse.json(
        { success: false, message: 'Missing required userType or userData fields (email, name)' },
        { status: 400 }
      );
    }

    console.log(`Onboarding attempt for ${userType}:`, userData.email);

    if (userType === 'advisor') {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id: _mockId, email, name, type, departmentId, students: studentsToOnboard } = userData;

      if (!type || !departmentId) {
         return NextResponse.json({ success: false, message: 'Missing required advisor fields (type, departmentId)' }, { status: 400 });
      }

      // 1. Upsert Advisor
      const advisor = await prisma.advisor.upsert({
        where: { email: email },
        update: { name, type, departmentId },
        create: { email, name, type, departmentId },
      });
      console.log('Advisor onboarded/updated:', advisor.email);

      // 2. Upsert associated students (if any)
      if (studentsToOnboard && Array.isArray(studentsToOnboard)) {
        console.log(`Attempting to onboard ${studentsToOnboard.length} students for advisor ${advisor.email}...`);
        for (const studentData of studentsToOnboard) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { id: _studentMockId, email: studentEmail, name: studentName, departmentId: studentDeptId, advisorId: _studentAdvisorMockId, transcript } = studentData;

          if (!studentEmail || !studentName || !studentDeptId) {
            console.warn('Skipping student due to missing data:', studentData);
            continue; // Skip if essential student data is missing
          }

          let transcriptCreateData = undefined;
          if (transcript && transcript.creditsCompleted !== undefined && transcript.compulsoryCoursesCompleted !== undefined && transcript.ects !== undefined) {
            transcriptCreateData = { ...transcript };
          }

          try {
            await prisma.student.upsert({
              where: { email: studentEmail },
              update: { name: studentName, departmentId: studentDeptId, advisorId: advisor.id /* Use DB Advisor ID */ },
              create: {
                email: studentEmail,
                name: studentName,
                departmentId: studentDeptId,
                advisorId: advisor.id, // Link to the actual DB advisor ID
                ...(transcriptCreateData && { transcript: { create: transcriptCreateData } }),
              },
            });
            console.log(`  Student onboarded/updated: ${studentEmail}`);
          } catch (studentError) {
            console.error(`  Failed to onboard student ${studentEmail}:`, studentError);
            // Decide if you want to stop the whole process or just skip this student
          }
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _password, students: _students, ...returnData } = userData;
      return NextResponse.json({ success: true, user: returnData });

    } else if (userType === 'student') {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id: _mockId, email, name, departmentId, advisorId, transcript } = userData;

      if (!departmentId || !advisorId) {
        return NextResponse.json({ success: false, message: 'Missing required student fields (departmentId, advisorId)' }, { status: 400 });
      }

      let transcriptCreateData = undefined;
      if (transcript && transcript.creditsCompleted !== undefined && transcript.compulsoryCoursesCompleted !== undefined && transcript.ects !== undefined) {
         transcriptCreateData = { ...transcript };
      }

      // Upsert Student (and potentially transcript)
      await prisma.student.upsert({
        where: { email: email },
        update: { name, departmentId, advisorId },
        create: {
          email,
          name,
          departmentId,
          advisorId, // This assumes the advisor ALREADY exists from the mock/seed data
          ...(transcriptCreateData && { transcript: { create: transcriptCreateData } }),
        },
        include: { transcript: true },
      });
      console.log('Student onboarded/updated:', email);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _password, ...returnData } = userData;
      return NextResponse.json({ success: true, user: returnData });

    } else {
      return NextResponse.json({ success: false, message: 'Invalid userType' }, { status: 400 });
    }

  } catch (error: unknown) {
    console.error('Onboarding Error:', error);
    if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2002') {
       return NextResponse.json(
         { success: false, message: `User with email ${requestEmail || '(unknown)'} already exists.` },
         { status: 409 }
       );
    } else if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2003') {
      // Handle potential foreign key errors more specifically if needed
      return NextResponse.json(
         { success: false, message: `Foreign key constraint failed during onboarding for ${requestEmail || '(unknown)'}. Ensure related records (department/advisor) exist.` },
         { status: 400 } // Bad Request might be appropriate
       );
    }
    return NextResponse.json(
      { success: false, message: 'Internal server error during onboarding' },
      { status: 500 }
    );
  }
} 