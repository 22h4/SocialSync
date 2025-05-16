import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { socialSettings: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const data = await req.json();

    // Update or create social settings
    const settings = await prisma.socialSettings.upsert({
      where: {
        userId: user.id,
      },
      update: {
        instagramUsername: data.instagramUsername,
        instagramPassword: data.instagramPassword,
        twitterApiKey: data.twitterApiKey,
        twitterApiSecret: data.twitterApiSecret,
        twitterAccessToken: data.twitterAccessToken,
        twitterAccessSecret: data.twitterAccessSecret,
        defaultPlatforms: data.defaultPlatforms,
        autoPostEnabled: data.autoPostEnabled,
      },
      create: {
        userId: user.id,
        instagramUsername: data.instagramUsername,
        instagramPassword: data.instagramPassword,
        twitterApiKey: data.twitterApiKey,
        twitterApiSecret: data.twitterApiSecret,
        twitterAccessToken: data.twitterAccessToken,
        twitterAccessSecret: data.twitterAccessSecret,
        defaultPlatforms: data.defaultPlatforms,
        autoPostEnabled: data.autoPostEnabled,
      },
    });

    return NextResponse.json({ success: true, settings });
  } catch (error) {
    console.error('Error saving social settings:', error);
    return NextResponse.json(
      { error: 'Failed to save settings' },
      { status: 500 }
    );
  }
} 