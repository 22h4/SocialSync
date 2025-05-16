"use client";

import SocialMediaPost from '@/components/SocialMediaPost';

export default function SocialMediaPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Social Media Manager
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Post to multiple social media platforms at once
          </p>
        </div>
        <div className="mt-12">
          <SocialMediaPost />
        </div>
      </div>
    </div>
  );
} 