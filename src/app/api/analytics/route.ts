import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { AuthService } from '@/lib/services/authService';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        socialSettings: true,
        scheduledPosts: {
          where: {
            status: 'posted',
          },
        },
      },
    });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    // Ensure tokens are valid before fetching analytics
    await AuthService.ensureValidTokens(user.id);

    // Refresh user data to get updated tokens
    const updatedUser = await prisma.user.findUnique({
      where: { id: user.id },
      include: { socialSettings: true },
    });

    if (!updatedUser?.socialSettings) {
      throw new Error('User settings not found');
    }

    // Get analytics data from social media platforms
    const instagramAnalytics = await fetch(
      `https://graph.instagram.com/me/insights?metric=engagement,impressions,reach&access_token=${updatedUser.socialSettings.instagramAccessToken}`
    ).then((res) => res.json());

    const twitterAnalytics = await fetch(
      `https://api.twitter.com/2/users/me/tweets?tweet.fields=public_metrics&max_results=100`,
      {
        headers: {
          Authorization: `Bearer ${updatedUser.socialSettings.twitterAccessToken}`,
        },
      }
    ).then((res) => res.json());

    // Calculate total engagement
    const totalEngagement =
      instagramAnalytics.data?.reduce(
        (acc: number, metric: any) => acc + metric.values[0].value,
        0
      ) || 0;

    // Calculate followers
    const followers = {
      instagram: instagramAnalytics.followers_count || 0,
      twitter: twitterAnalytics.data?.public_metrics?.followers_count || 0,
    };

    // Calculate engagement metrics
    const engagement = {
      likes:
        instagramAnalytics.data?.find(
          (metric: any) => metric.name === 'engagement'
        )?.values[0].value || 0,
      comments:
        twitterAnalytics.data?.reduce(
          (acc: number, tweet: any) =>
            acc + (tweet.public_metrics?.reply_count || 0),
          0
        ) || 0,
      shares:
        twitterAnalytics.data?.reduce(
          (acc: number, tweet: any) =>
            acc + (tweet.public_metrics?.retweet_count || 0),
          0
        ) || 0,
    };

    return NextResponse.json({
      totalPosts: user.scheduledPosts.length,
      totalEngagement,
      followers,
      engagement,
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 