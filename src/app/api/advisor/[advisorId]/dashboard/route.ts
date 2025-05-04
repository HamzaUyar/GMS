import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// TEMP: Disabled due to TypeScript/Next.js issues with dynamic route parameters
// Will revisit after initial build is fixed

export async function GET(request: NextRequest) {
  const segments = request.nextUrl.pathname.split('/');
  const advisorId = segments[segments.length - 2]; // Extract from URL path

  if (!advisorId) {
    return NextResponse.json({ error: 'Advisor ID is required' }, { status: 400 });
  }

  try {
    const id = parseInt(advisorId, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid Advisor ID format' }, { status: 400 });
    }

    const advisor = await prisma.advisor.findUnique({
      where: {
        id: id,
      },
      include: {
        students: { // Include the students associated with this advisor
          include: {
            // Optionally include related data for students if needed later
            // transcript: true,
          },
          orderBy: {
            id: 'asc', // Order students by ID instead of alphabetically
          },
        },
        department: true, // Include department info for the advisor
      },
    });

    if (!advisor) {
      return NextResponse.json({ error: 'Advisor not found' }, { status: 404 });
    }

    // We don't need to return the password hash or sensitive info
    const { ...advisorData } = advisor;

    return NextResponse.json(advisorData);

  } catch (error) {
    console.error(`Error fetching advisor dashboard data for ID ${advisorId}:`, error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 