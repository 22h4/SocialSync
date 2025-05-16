import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { InstagramManager } from '@/lib/instagram';
import { TwitterManager } from '@/lib/twitter';

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
    const { content, mediaUrl, platforms, scheduledFor } = data;

    // Create scheduled post
    const scheduledPost = await prisma.scheduledPost.create({
      data: {
        userId: user.id,
        content,
        mediaUrl,
        platforms,
        scheduledFor: new Date(scheduledFor),
      },
    });

    // If auto-post is enabled, schedule the post
    if (user.socialSettings?.autoPostEnabled) {
      const delay = new Date(scheduledFor).getTime() - Date.now();
      
      setTimeout(async () => {
        try {
          const results: Record<string, any> = {};

          if (platforms.includes('instagram') && mediaUrl) {
            const instagram = new InstagramManager();
            const response = await fetch(mediaUrl);
            const buffer = Buffer.from(await response.arrayBuffer());
            
            if (mediaUrl.match(/\.(jpg|jpeg|png|gif)$/i)) {
              results.instagram = await instagram.postImage(buffer, content);
            } else if (mediaUrl.match(/\.(mp4|mov|avi)$/i)) {
              results.instagram = await instagram.postVideo(buffer, content);
            }
          }

          if (platforms.includes('twitter')) {
            const twitter = new TwitterManager();
            if (mediaUrl) {
              const response = await fetch(mediaUrl);
              const buffer = Buffer.from(await response.arrayBuffer());
              results.twitter = await twitter.postMediaTweet(content, buffer);
            } else {
              results.twitter = await twitter.postTweet(content);
            }
          }

          // Update post status
          await prisma.scheduledPost.update({
            where: { id: scheduledPost.id },
            data: { status: 'posted' },
          });
        } catch (error) {
          console.error('Error posting scheduled content:', error);
          await prisma.scheduledPost.update({
            where: { id: scheduledPost.id },
            data: { status: 'failed' },
          });
        }
      }, delay);
    }

    return NextResponse.json({ success: true, scheduledPost });
  } catch (error) {
    console.error('Error scheduling post:', error);
    return NextResponse.json(
      { error: 'Failed to schedule post' },
      { status: 500 }
    );
  }
} 