import { IgApiClient } from 'instagram-private-api';
import { config } from './config';

export class InstagramManager {
  private ig: IgApiClient;
  private isLoggedIn: boolean = false;

  constructor() {
    this.ig = new IgApiClient();
  }

  async login() {
    if (this.isLoggedIn) return;

    this.ig.state.generateDevice(config.instagram.username!);
    await this.ig.account.login(config.instagram.username!, config.instagram.password!);
    this.isLoggedIn = true;
  }

  async postImage(imageBuffer: Buffer, caption: string) {
    if (!this.isLoggedIn) {
      await this.login();
    }

    const publishResult = await this.ig.publish.photo({
      file: imageBuffer,
      caption: caption,
    });

    return publishResult;
  }

  async postVideo(videoBuffer: Buffer, caption: string) {
    if (!this.isLoggedIn) {
      await this.login();
    }

    const publishResult = await this.ig.publish.video({
      video: videoBuffer,
      coverImage: await this.ig.publish.cover({ file: videoBuffer }),
      caption: caption,
    });

    return publishResult;
  }
}

interface PostToInstagramParams {
  content: string;
  mediaUrl: string | null;
  accessToken: string;
}

export async function postToInstagram({
  content,
  mediaUrl,
  accessToken,
}: PostToInstagramParams) {
  try {
    // If there's media, first upload it
    let mediaId: string | null = null;
    if (mediaUrl) {
      const formData = new FormData();
      formData.append('image_url', mediaUrl);
      formData.append('access_token', accessToken);

      const mediaResponse = await fetch(
        'https://graph.instagram.com/me/media',
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!mediaResponse.ok) {
        throw new Error('Failed to upload media to Instagram');
      }

      const mediaData = await mediaResponse.json();
      mediaId = mediaData.id;
    }

    // Create the post
    const postData = {
      caption: content,
      access_token: accessToken,
      ...(mediaId && { media_id: mediaId }),
    };

    const response = await fetch('https://graph.instagram.com/me/media', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error('Failed to create Instagram post');
    }

    const data = await response.json();

    // Publish the post
    const publishResponse = await fetch(
      `https://graph.instagram.com/me/media_publish?creation_id=${data.id}&access_token=${accessToken}`,
      {
        method: 'POST',
      }
    );

    if (!publishResponse.ok) {
      throw new Error('Failed to publish Instagram post');
    }

    return await publishResponse.json();
  } catch (error) {
    console.error('Error posting to Instagram:', error);
    throw error;
  }
} 