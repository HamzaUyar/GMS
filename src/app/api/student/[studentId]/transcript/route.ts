import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const segments = request.nextUrl.pathname.split('/');
  const studentId = segments[segments.length - 2]; // Extract studentId from URL path

  if (!studentId) {
    return NextResponse.json({ error: 'Student ID is required' }, { status: 400 });
  }

  try {
    const id = parseInt(studentId, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid Student ID format' }, { status: 400 });
    }

    const transcript = await prisma.transcript.findUnique({
      where: {
        studentId: id,
      },
    });

    if (!transcript) {
      return NextResponse.json({ error: 'Transcript not found' }, { status: 404 });
    }

    // Return transcript data
    return NextResponse.json(transcript);

  } catch (error) {
    console.error(`Error fetching transcript for student ID ${studentId}:`, error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 