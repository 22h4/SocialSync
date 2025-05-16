import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { socialSettings: true },
    });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    // Get the platform from the request
    const { platform } = await request.json();

    // Generate OAuth URLs based on platform
    let authUrl = '';
    let clientId = '';
    let redirectUri = '';

    switch (platform) {
      case 'instagram':
        clientId = process.env.INSTAGRAM_CLIENT_ID!;
        redirectUri = `${process.env.NEXTAUTH_URL}/api/auth/callback/instagram`;
        authUrl = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user_profile,user_media&response_type=code`;
        break;

      case 'twitter':
        clientId = process.env.TWITTER_CLIENT_ID!;
        redirectUri = `${process.env.NEXTAUTH_URL}/api/auth/callback/twitter`;
        authUrl = `https://twitter.com/i/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=tweet.read%20tweet.write%20users.read%20offline.access&response_type=code&code_challenge_method=S256&code_challenge=${generateCodeChallenge()}`;
        break;

      default:
        return new NextResponse('Invalid platform', { status: 400 });
    }

    // Store the state in the database for verification
    await prisma.socialSettings.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        [`${platform}AuthState`]: generateState(),
      },
      update: {
        [`${platform}AuthState`]: generateState(),
      },
    });

    return NextResponse.json({ authUrl });
  } catch (error) {
    console.error('Error in connect route:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

function generateState() {
  return Math.random().toString(36).substring(2, 15);
}

function generateCodeChallenge() {
  return Math.random().toString(36).substring(2, 15);
} 