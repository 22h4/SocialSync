import { TwitterApi } from 'twitter-api-v2';
import { config } from './config';

export class TwitterManager {
  private client: TwitterApi;
  private isAuthenticated: boolean = false;

  constructor() {
    this.client = new TwitterApi({
      appKey: config.twitter.apiKey!,
      appSecret: config.twitter.apiSecret!,
      accessToken: config.twitter.accessToken!,
      accessSecret: config.twitter.accessSecret!,
    });
  }

  async verifyCredentials() {
    if (!this.isAuthenticated) {
      await this.client.v2.me();
      this.isAuthenticated = true;
    }
  }

  async postTweet(text: string) {
    await this.verifyCredentials();
    return await this.client.v2.tweet(text);
  }

  async postMediaTweet(text: string, mediaBuffer: Buffer) {
    await this.verifyCredentials();
    
    // Upload media
    const mediaId = await this.client.v1.uploadMedia(mediaBuffer);
    
    // Post tweet with media
    return await this.client.v2.tweet({
      text: text,
      media: { media_ids: [mediaId] }
    });
  }
}

interface PostToTwitterParams {
  content: string;
  mediaUrl: string | null;
  accessToken: string;
}

export async function postToTwitter({
  content,
  mediaUrl,
  accessToken,
}: PostToTwitterParams) {
  try {
    // If there's media, first upload it
    let mediaId: string | null = null;
    if (mediaUrl) {
      const formData = new FormData();
      formData.append('media', mediaUrl);

      const mediaResponse = await fetch(
        'https://upload.twitter.com/1.1/media/upload.json',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        }
      );

      if (!mediaResponse.ok) {
        throw new Error('Failed to upload media to Twitter');
      }

      const mediaData = await mediaResponse.json();
      mediaId = mediaData.media_id_string;
    }

    // Create the tweet
    const tweetData = {
      text: content,
      ...(mediaId && { media: { media_ids: [mediaId] } }),
    };

    const response = await fetch('https://api.twitter.com/2/tweets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(tweetData),
    });

    if (!response.ok) {
      throw new Error('Failed to create tweet');
    }

    return await response.json();
  } catch (error) {
    console.error('Error posting to Twitter:', error);
    throw error;
  }
} 