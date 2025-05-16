import { prisma } from '@/lib/prisma';

interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export class AuthService {
  private static async refreshInstagramToken(refreshToken: string): Promise<TokenResponse> {
    const response = await fetch('https://graph.instagram.com/refresh_access_token', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'ig_refresh_token',
        access_token: refreshToken,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh Instagram token');
    }

    return response.json();
  }

  private static async refreshTwitterToken(refreshToken: string): Promise<TokenResponse> {
    const response = await fetch('https://api.twitter.com/2/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: process.env.TWITTER_CLIENT_ID!,
        client_secret: process.env.TWITTER_CLIENT_SECRET!,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh Twitter token');
    }

    return response.json();
  }

  static async ensureValidTokens(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { socialSettings: true },
    });

    if (!user?.socialSettings) return;

    const now = new Date();
    const updates: any = {};

    // Check and refresh Instagram token if needed
    if (user.socialSettings.instagramRefreshToken) {
      const instagramExpiry = new Date(user.socialSettings.instagramTokenExpiry || 0);
      if (now >= instagramExpiry) {
        try {
          const newTokens = await this.refreshInstagramToken(user.socialSettings.instagramRefreshToken);
          updates.instagramAccessToken = newTokens.access_token;
          updates.instagramRefreshToken = newTokens.refresh_token;
          updates.instagramTokenExpiry = new Date(now.getTime() + newTokens.expires_in * 1000);
        } catch (error) {
          console.error('Error refreshing Instagram token:', error);
        }
      }
    }

    // Check and refresh Twitter token if needed
    if (user.socialSettings.twitterRefreshToken) {
      const twitterExpiry = new Date(user.socialSettings.twitterTokenExpiry || 0);
      if (now >= twitterExpiry) {
        try {
          const newTokens = await this.refreshTwitterToken(user.socialSettings.twitterRefreshToken);
          updates.twitterAccessToken = newTokens.access_token;
          updates.twitterRefreshToken = newTokens.refresh_token;
          updates.twitterTokenExpiry = new Date(now.getTime() + newTokens.expires_in * 1000);
        } catch (error) {
          console.error('Error refreshing Twitter token:', error);
        }
      }
    }

    // Update tokens if any were refreshed
    if (Object.keys(updates).length > 0) {
      await prisma.socialSettings.update({
        where: { userId },
        data: updates,
      });
    }
  }
} 