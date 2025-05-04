import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const segments = request.nextUrl.pathname.split('/');
  const advisorId = segments[segments.length - 2]; // Extract advisorId from URL path

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
        department: true, // Include department info
      },
    });

    if (!advisor) {
      return NextResponse.json({ error: 'Advisor not found' }, { status: 404 });
    }

    // Return advisor data without sensitive information
    const { ...advisorData } = advisor;
    return NextResponse.json(advisorData);

  } catch (error) {
    console.error(`Error fetching advisor details for ID ${advisorId}:`, error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 