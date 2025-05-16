'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';

interface Props {
  defaultPlatforms?: string[];
}

export default function SchedulePost({ defaultPlatforms = [] }: Props) {
  const { data: session } = useSession();
  const [content, setContent] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [platforms, setPlatforms] = useState<string[]>(defaultPlatforms);
  const [scheduledFor, setScheduledFor] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/social/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          mediaUrl,
          platforms,
          scheduledFor,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to schedule post');
      }

      setSuccess(true);
      setContent('');
      setMediaUrl('');
      setPlatforms(defaultPlatforms);
      setScheduledFor('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Schedule Post
          </h3>
          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                rows={4}
                required
              />
            </div>

            <div>
              <label htmlFor="mediaUrl" className="block text-sm font-medium text-gray-700">
                Media URL (Optional)
              </label>
              <input
                type="url"
                id="mediaUrl"
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <label htmlFor="scheduledFor" className="block text-sm font-medium text-gray-700">
                Schedule For
              </label>
              <input
                type="datetime-local"
                id="scheduledFor"
                value={scheduledFor}
                onChange={(e) => setScheduledFor(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Platforms
              </label>
              <div className="mt-2 space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={platforms.includes('instagram')}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setPlatforms([...platforms, 'instagram']);
                      } else {
                        setPlatforms(platforms.filter(p => p !== 'instagram'));
                      }
                    }}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2">Instagram</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={platforms.includes('twitter')}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setPlatforms([...platforms, 'twitter']);
                      } else {
                        setPlatforms(platforms.filter(p => p !== 'twitter'));
                      }
                    }}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2">Twitter</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {success && (
        <div className="rounded-md bg-green-50 p-4">
          <p className="text-sm text-green-800">Post scheduled successfully!</p>
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading || platforms.length === 0}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {loading ? 'Scheduling...' : 'Schedule Post'}
        </button>
      </div>
    </form>
  );
}