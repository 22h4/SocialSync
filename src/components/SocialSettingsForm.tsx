'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';

interface SocialSettings {
  id?: string;
  instagramUsername?: string | null;
  instagramPassword?: string | null;
  twitterApiKey?: string | null;
  twitterApiSecret?: string | null;
  twitterAccessToken?: string | null;
  twitterAccessSecret?: string | null;
  defaultPlatforms: string[];
  autoPostEnabled: boolean;
}

interface Props {
  initialSettings: SocialSettings | null;
}

export default function SocialSettingsForm({ initialSettings }: Props) {
  const { data: session } = useSession();
  const [settings, setSettings] = useState<SocialSettings>({
    defaultPlatforms: initialSettings?.defaultPlatforms || [],
    autoPostEnabled: initialSettings?.autoPostEnabled || false,
    instagramUsername: initialSettings?.instagramUsername || '',
    instagramPassword: initialSettings?.instagramPassword || '',
    twitterApiKey: initialSettings?.twitterApiKey || '',
    twitterApiSecret: initialSettings?.twitterApiSecret || '',
    twitterAccessToken: initialSettings?.twitterAccessToken || '',
    twitterAccessSecret: initialSettings?.twitterAccessSecret || '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/settings/social', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save settings');
      }

      setMessage({ type: 'success', text: 'Settings saved successfully!' });
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to save settings',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Instagram Settings
          </h3>
          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="instagramUsername" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="instagramUsername"
                value={settings.instagramUsername || ''}
                onChange={(e) => setSettings({ ...settings, instagramUsername: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="instagramPassword" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="instagramPassword"
                value={settings.instagramPassword || ''}
                onChange={(e) => setSettings({ ...settings, instagramPassword: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Twitter Settings
          </h3>
          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="twitterApiKey" className="block text-sm font-medium text-gray-700">
                API Key
              </label>
              <input
                type="password"
                id="twitterApiKey"
                value={settings.twitterApiKey || ''}
                onChange={(e) => setSettings({ ...settings, twitterApiKey: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="twitterApiSecret" className="block text-sm font-medium text-gray-700">
                API Secret
              </label>
              <input
                type="password"
                id="twitterApiSecret"
                value={settings.twitterApiSecret || ''}
                onChange={(e) => setSettings({ ...settings, twitterApiSecret: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="twitterAccessToken" className="block text-sm font-medium text-gray-700">
                Access Token
              </label>
              <input
                type="password"
                id="twitterAccessToken"
                value={settings.twitterAccessToken || ''}
                onChange={(e) => setSettings({ ...settings, twitterAccessToken: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="twitterAccessSecret" className="block text-sm font-medium text-gray-700">
                Access Secret
              </label>
              <input
                type="password"
                id="twitterAccessSecret"
                value={settings.twitterAccessSecret || ''}
                onChange={(e) => setSettings({ ...settings, twitterAccessSecret: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Posting Preferences
          </h3>
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Default Platforms
              </label>
              <div className="mt-2 space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.defaultPlatforms.includes('instagram')}
                    onChange={(e) => {
                      const platforms = e.target.checked
                        ? [...settings.defaultPlatforms, 'instagram']
                        : settings.defaultPlatforms.filter(p => p !== 'instagram');
                      setSettings({ ...settings, defaultPlatforms: platforms });
                    }}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2">Instagram</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.defaultPlatforms.includes('twitter')}
                    onChange={(e) => {
                      const platforms = e.target.checked
                        ? [...settings.defaultPlatforms, 'twitter']
                        : settings.defaultPlatforms.filter(p => p !== 'twitter');
                      setSettings({ ...settings, defaultPlatforms: platforms });
                    }}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2">Twitter</span>
                </label>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-700">Auto Post</h4>
                <p className="text-sm text-gray-500">
                  Automatically post content when scheduled
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.autoPostEnabled}
                onChange={(e) => setSettings({ ...settings, autoPostEnabled: e.target.checked })}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      </div>

      {message && (
        <div
          className={`rounded-md p-4 ${
            message.type === 'success' ? 'bg-green-50' : 'bg-red-50'
          }`}
        >
          <p
            className={`text-sm ${
              message.type === 'success' ? 'text-green-800' : 'text-red-800'
            }`}
          >
            {message.text}
          </p>
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </form>
  );
} 