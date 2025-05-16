'use client';

import { useState } from 'react';

interface SocialShareProps {
  videoUrl: string;
  content: {
    title: string;
    description: string;
    hashtags: string[];
  };
}

export default function SocialShare({ videoUrl, content }: SocialShareProps) {
  const [isSharing, setIsSharing] = useState(false);
  const [shareStatus, setShareStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleShare = async (platform: 'twitter' | 'instagram') => {
    setIsSharing(true);
    setShareStatus('idle');

    try {
      // TODO: Implement actual social media sharing
      // This is a placeholder for the actual implementation
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setShareStatus('success');
    } catch (error) {
      setShareStatus('error');
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="glass-card rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
        Share to Social Media
      </h2>

      <div className="space-y-4">
        <div className="flex gap-4">
          <button
            onClick={() => handleShare('twitter')}
            disabled={isSharing}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold text-white transition-all transform hover:scale-[1.02]
              ${isSharing
                ? 'bg-gradient-to-r from-blue-400 to-purple-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#1DA1F2] to-[#1a8cd8] hover:from-[#1a8cd8] hover:to-[#1DA1F2]'
              }`}
          >
            {isSharing ? 'Sharing...' : 'Share on Twitter'}
          </button>

          <button
            onClick={() => handleShare('instagram')}
            disabled={isSharing}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold text-white transition-all transform hover:scale-[1.02]
              ${isSharing
                ? 'bg-gradient-to-r from-pink-400 to-purple-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90'
              }`}
          >
            {isSharing ? 'Sharing...' : 'Share on Instagram'}
          </button>
        </div>

        {shareStatus === 'success' && (
          <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-xl">
            <p className="text-green-500 text-sm text-center">
              Content shared successfully!
            </p>
          </div>
        )}

        {shareStatus === 'error' && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
            <p className="text-red-500 text-sm text-center">
              Failed to share content. Please try again.
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 