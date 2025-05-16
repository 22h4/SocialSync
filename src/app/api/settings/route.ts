import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const settings = await prisma.userSettings.findUnique({
      where: { userId: session.user.id },
    });

    return NextResponse.json(settings);
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const body = await request.json();
    const { darkMode, notifications } = body;

    const settings = await prisma.userSettings.upsert({
      where: { userId: session.user.id },
      update: {
        darkMode,
        notifications,
      },
      create: {
        userId: session.user.id,
        darkMode,
        notifications,
      },
    });

    return NextResponse.json(settings);
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 