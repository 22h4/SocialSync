import { NextRequest, NextResponse } from 'next/server';
import { InstagramManager } from '@/lib/instagram';
import { TwitterManager } from '@/lib/twitter';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const text = formData.get('text') as string;
    const platforms = formData.get('platforms') as string;
    const media = formData.get('media') as File | null;

    const results: Record<string, any> = {};

    if (platforms.includes('instagram') && media) {
      const instagram = new InstagramManager();
      const buffer = Buffer.from(await media.arrayBuffer());
      
      if (media.type.startsWith('image/')) {
        results.instagram = await instagram.postImage(buffer, text);
      } else if (media.type.startsWith('video/')) {
        results.instagram = await instagram.postVideo(buffer, text);
      }
    }

    if (platforms.includes('twitter')) {
      const twitter = new TwitterManager();
      if (media) {
        const buffer = Buffer.from(await media.arrayBuffer());
        results.twitter = await twitter.postMediaTweet(text, buffer);
      } else {
        results.twitter = await twitter.postTweet(text);
      }
    }

    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error('Error posting to social media:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to post to social media' },
      { status: 500 }
    );
  }
} 