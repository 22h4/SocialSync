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
    if (state !== user.socialSettings.instagramAuthState) {
      return new NextResponse('Invalid state', { status: 400 });
    }

    // Exchange code for access token
    const tokenResponse = await fetch('https://api.instagram.com/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.INSTAGRAM_CLIENT_ID!,
        client_secret: process.env.INSTAGRAM_CLIENT_SECRET!,
        grant_type: 'authorization_code',
        redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/instagram`,
        code,
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error('Failed to exchange code for token');
    }

    const tokenData = await tokenResponse.json();

    // Get long-lived access token
    const longLivedTokenResponse = await fetch(
      `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${process.env.INSTAGRAM_CLIENT_SECRET}&access_token=${tokenData.access_token}`
    );

    if (!longLivedTokenResponse.ok) {
      throw new Error('Failed to get long-lived token');
    }

    const longLivedTokenData = await longLivedTokenResponse.json();

    // Update user settings with tokens
    await prisma.socialSettings.update({
      where: { userId: user.id },
      data: {
        instagramAccessToken: longLivedTokenData.access_token,
        instagramRefreshToken: longLivedTokenData.refresh_token,
        instagramTokenExpiry: new Date(Date.now() + longLivedTokenData.expires_in * 1000),
        instagramAuthState: null, // Clear the state
      },
    });

    // Redirect to success page
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/dashboard?connected=instagram`);
  } catch (error) {
    console.error('Error in Instagram callback:', error);
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/dashboard?error=instagram`);
  }
} 