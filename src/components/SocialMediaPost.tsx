import { useState } from 'react';
import { InstagramManager } from '@/lib/instagram';
import { TwitterManager } from '@/lib/twitter';

export default function SocialMediaPost() {
  const [text, setText] = useState('');
  const [media, setMedia] = useState<File | null>(null);
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append('text', text);
      formData.append('platforms', platforms.join(','));
      if (media) {
        formData.append('media', media);
      }

      const response = await fetch('/api/social/post', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to post');
      }

      setSuccess(true);
      setText('');
      setMedia(null);
      setPlatforms([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Post Content
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={4}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Media (Optional)
          </label>
          <input
            type="file"
            onChange={(e) => setMedia(e.target.files?.[0] || null)}
            accept="image/*,video/*"
            className="mt-1 block w-full"
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

        {error && (
          <div className="text-red-600 text-sm">{error}</div>
        )}

        {success && (
          <div className="text-green-600 text-sm">Posted successfully!</div>
        )}

        <button
          type="submit"
          disabled={loading || platforms.length === 0}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {loading ? 'Posting...' : 'Post to Social Media'}
        </button>
      </form>
    </div>
  );
} 