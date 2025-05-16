import { NextResponse } from 'next/server';
import { processScheduledPosts } from '@/lib/jobs/scheduledPosts';

export async function GET(request: Request) {
  try {
    // Verify the request is from a trusted source (e.g., Vercel Cron)
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Process scheduled posts
    await processScheduledPosts();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in scheduled posts cron job:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 