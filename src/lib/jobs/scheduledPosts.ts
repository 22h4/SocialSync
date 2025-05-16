import { prisma } from '@/lib/prisma';
import { postToInstagram } from '@/lib/instagram';
import { postToTwitter } from '@/lib/twitter';
import { AuthService } from '@/lib/services/authService';

export async function processScheduledPosts() {
  try {
    // Get all posts that are due to be posted
    const postsToProcess = await prisma.scheduledPost.findMany({
      where: {
        status: 'pending',
        scheduledFor: {
          lte: new Date(),
        },
      },
      include: {
        user: {
          include: {
            socialSettings: true,
          },
        },
      },
    });

    for (const post of postsToProcess) {
      try {
        // Update post status to processing
        await prisma.scheduledPost.update({
          where: { id: post.id },
          data: { status: 'processing' },
        });

        // Ensure tokens are valid before posting
        await AuthService.ensureValidTokens(post.userId);

        // Refresh user data to get updated tokens
        const updatedUser = await prisma.user.findUnique({
          where: { id: post.userId },
          include: { socialSettings: true },
        });

        if (!updatedUser?.socialSettings) {
          throw new Error('User settings not found');
        }

        const results = await Promise.allSettled([
          // Post to Instagram if enabled
          post.platforms.includes('instagram') && updatedUser.socialSettings.instagramAccessToken
            ? postToInstagram({
                content: post.content,
                mediaUrl: post.mediaUrl,
                accessToken: updatedUser.socialSettings.instagramAccessToken,
              })
            : Promise.resolve(null),

          // Post to Twitter if enabled
          post.platforms.includes('twitter') && updatedUser.socialSettings.twitterAccessToken
            ? postToTwitter({
                content: post.content,
                mediaUrl: post.mediaUrl,
                accessToken: updatedUser.socialSettings.twitterAccessToken,
              })
            : Promise.resolve(null),
        ]);

        // Check if all posts were successful
        const allSuccessful = results.every(
          (result) => result.status === 'fulfilled' && result.value !== null
        );

        // Update post status
        await prisma.scheduledPost.update({
          where: { id: post.id },
          data: {
            status: allSuccessful ? 'posted' : 'failed',
            postedAt: allSuccessful ? new Date() : null,
            error: allSuccessful
              ? null
              : results
                  .map((result) =>
                    result.status === 'rejected' ? result.reason : null
                  )
                  .filter(Boolean)
                  .join(', '),
          },
        });
      } catch (error) {
        console.error(`Error processing post ${post.id}:`, error);
        await prisma.scheduledPost.update({
          where: { id: post.id },
          data: {
            status: 'failed',
            error: error instanceof Error ? error.message : 'Unknown error',
          },
        });
      }
    }
  } catch (error) {
    console.error('Error in scheduled posts job:', error);
  }
} 