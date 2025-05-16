'use client';

import { useState } from 'react';
import { format } from 'date-fns';

interface Post {
  id: string;
  content: string;
  mediaUrl: string | null;
  platforms: string[];
  scheduledFor: Date;
  status: 'pending' | 'posted' | 'failed';
}

interface Props {
  posts: Post[];
}

export default function ScheduledPosts({ posts: initialPosts }: Props) {
  const [posts, setPosts] = useState(initialPosts);

  const handleDelete = async (postId: string) => {
    try {
      const response = await fetch(`/api/social/schedule/${postId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      setPosts(posts.filter(post => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {posts.map((post) => (
          <li key={post.id}>
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {post.content}
                  </p>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <span>
                      Scheduled for {format(new Date(post.scheduledFor), 'PPp')}
                    </span>
                    <span className="mx-2">•</span>
                    <span className="flex items-center">
                      {post.platforms.map((platform) => (
                        <span
                          key={platform}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mr-2"
                        >
                          {platform}
                        </span>
                      ))}
                    </span>
                  </div>
                </div>
                <div className="ml-4 flex-shrink-0 flex items-center space-x-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      post.status === 'posted'
                        ? 'bg-green-100 text-green-800'
                        : post.status === 'failed'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {post.status}
                  </span>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </div>
              </div>
              {post.mediaUrl && (
                <div className="mt-2">
                  <img
                    src={post.mediaUrl}
                    alt="Post media"
                    className="h-20 w-20 object-cover rounded"
                  />
                </div>
              )}
            </div>
          </li>
        ))}
        {posts.length === 0 && (
          <li className="px-4 py-4 sm:px-6 text-center text-gray-500">
            No scheduled posts
          </li>
        )}
      </ul>
    </div>
  );
} 