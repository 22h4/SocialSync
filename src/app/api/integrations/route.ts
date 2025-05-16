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
    const integrations = await prisma.socialIntegration.findMany({
      where: { userId: session.user.id },
    });

    return NextResponse.json(integrations);
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const body = await request.json();
    const { platform, apiKey, apiSecret, accessToken } = body;

    const integration = await prisma.socialIntegration.upsert({
      where: {
        userId_platform: {
          userId: session.user.id,
          platform,
        },
      },
      update: {
        apiKey,
        apiSecret,
        accessToken,
        isConnected: true,
      },
      create: {
        userId: session.user.id,
        platform,
        apiKey,
        apiSecret,
        accessToken,
        isConnected: true,
      },
    });

    return NextResponse.json(integration);
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const platform = searchParams.get('platform');

    if (!platform) {
      return new NextResponse('Platform is required', { status: 400 });
    }

    await prisma.socialIntegration.delete({
      where: {
        userId_platform: {
          userId: session.user.id,
          platform,
        },
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 