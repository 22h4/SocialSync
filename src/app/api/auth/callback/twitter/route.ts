import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (!code || !state) {
      return new NextResponse('Missing required parameters', { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { socialSettings: true },
    });

    if (!user?.socialSettings) {
      return new NextResponse('User settings not found', { status: 404 });
    }

    // Verify state
    if (state !== user.socialSettings.twitterAuthState) {
      return new NextResponse('Invalid state', { status: 400 });
    }

    // Exchange code for access token
    const tokenResponse = await fetch('https://api.twitter.com/2/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(
          `${process.env.TWITTER_CLIENT_ID}:${process.env.TWITTER_CLIENT_SECRET}`
        ).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/twitter`,
        code_verifier: user.socialSettings.twitterCodeVerifier!,
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error('Failed to exchange code for token');
    }

    const tokenData = await tokenResponse.json();

    // Update user settings with tokens
    await prisma.socialSettings.update({
      where: { userId: user.id },
      data: {
        twitterAccessToken: tokenData.access_token,
        twitterRefreshToken: tokenData.refresh_token,
        twitterTokenExpiry: new Date(Date.now() + tokenData.expires_in * 1000),
        twitterAuthState: null, // Clear the state
        twitterCodeVerifier: null, // Clear the code verifier
      },
    });

    // Redirect to success page
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/dashboard?connected=twitter`);
  } catch (error) {
    console.error('Error in Twitter callback:', error);
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/dashboard?error=twitter`);
  }
} 