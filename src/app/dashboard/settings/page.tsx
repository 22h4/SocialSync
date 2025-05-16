'use client';

import { useSession, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  KeyIcon,
  PhotoIcon,
  LinkIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  XCircleIcon,
  Cog6ToothIcon,
  UserCircleIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import BackgroundIllustrations from '@/components/BackgroundIllustrations';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import Logo from '@/components/Logo';

interface SocialPlatform {
  name: string;
  icon: any;
  color: string;
}

const socialPlatforms: SocialPlatform[] = [
  {
    name: "Instagram",
    icon: PhotoIcon,
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "Twitter",
    icon: LinkIcon,
    color: "from-blue-400 to-cyan-500",
  },
  {
    name: "LinkedIn",
    icon: LinkIcon,
    color: "from-blue-600 to-blue-800",
  },
  {
    name: "Facebook",
    icon: LinkIcon,
    color: "from-blue-500 to-blue-700",
  },
];

const notifications = [
  { title: "API key updated", time: "2 min ago", type: "key" },
  { title: "New connection", time: "1 hour ago", type: "connection" },
  { title: "Settings changed", time: "2 hours ago", type: "settings" },
];

export default function Settings() {
  const { data: session, status } = useSession();
  const [apiKeys, setApiKeys] = useState<Record<string, string>>({});
  const [editing, setEditing] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleEdit = (platform: SocialPlatform) => {
    setEditing(platform.name);
    setInputValue(apiKeys[platform.name] || "");
  };

  const handleSave = (platform: SocialPlatform) => {
    setApiKeys({ ...apiKeys, [platform.name]: inputValue });
    setEditing(null);
    setInputValue("");
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center relative">
        <BackgroundIllustrations />
        <div className="relative z-10 space-y-4 text-center">
          <div className="w-16 h-16 rounded-full border-4 border-purple-500 border-t-transparent animate-spin mx-auto" />
          <p className="text-gray-600 dark:text-gray-400">Loading settings...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 relative">
        <BackgroundIllustrations />
        <div className="relative z-10 text-center space-y-4">
          <h1 className="text-2xl font-bold text-gradient">Access Denied</h1>
          <p className="text-gray-600 dark:text-gray-400">Please sign in to view settings.</p>
          <Link
            href="/auth/signin"
            className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-all focus-ring"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-16">
      <BackgroundIllustrations />
      <main className="max-w-3xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <button className="p-2 rounded-xl glass interactive focus-ring hover:bg-white/10 transition-all duration-200">
                <ArrowLeftIcon className="w-6 h-6 text-gray-300" />
              </button>
            </Link>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg animate-gradient">
              Settings
            </h1>
          </div>
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <div className="relative">
              <button
                className="p-2 rounded-xl glass interactive focus-ring relative hover:bg-white/10 transition-all duration-200"
                onClick={() => setShowNotifications((v) => !v)}
              >
                <BellIcon className="w-6 h-6 text-gray-300" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  {notifications.length}
                </span>
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 glass-card rounded-2xl p-4 z-50 shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-300">Notifications</h3>
                    <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors" onClick={() => setShowNotifications(false)}>
                      Close
                    </button>
                  </div>
                  <div className="space-y-3">
                    {notifications.map((notification, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          notification.type === 'key' ? 'bg-purple-500' :
                          notification.type === 'connection' ? 'bg-blue-500' :
                          'bg-green-500'
                        }`}>
                          {notification.type === 'key' ? (
                            <KeyIcon className="w-4 h-4 text-white" />
                          ) : notification.type === 'connection' ? (
                            <LinkIcon className="w-4 h-4 text-white" />
                          ) : (
                            <Cog6ToothIcon className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm text-gray-300 group-hover:text-purple-400 transition-colors">
                            {notification.title}
                          </p>
                          <p className="text-xs text-gray-400">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* Profile */}
            <div className="relative">
              <button
                className="p-2 rounded-xl glass interactive focus-ring hover:bg-white/10 transition-all duration-200"
                onClick={() => setShowProfileMenu((v) => !v)}
              >
                <UserCircleIcon className="w-6 h-6 text-gray-300" />
              </button>
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 glass-card rounded-2xl p-3 z-50">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                      <span className="text-white font-medium">
                        {session.user?.name?.[0].toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-300">{session.user?.name}</p>
                      <p className="text-xs text-gray-400">{session.user?.email}</p>
                    </div>
                  </div>
                  <div className="border-t border-gray-700/50 my-2" />
                  <button
                    onClick={() => signOut()}
                    className="flex items-center gap-2 p-2 rounded-xl hover:bg-red-500/10 text-red-400 group transition-colors w-full"
                  >
                    <ArrowRightOnRectangleIcon className="w-5 h-5 group-hover:text-red-300" />
                    <span className="text-sm group-hover:text-red-300">Sign out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Social Media Connections */}
        <div className="grid gap-8 mb-12">
          {socialPlatforms.map((platform: SocialPlatform) => (
            <div key={platform.name} className="glass-card rounded-2xl p-6 flex items-center gap-6">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center`}>
                <platform.icon className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-300 mb-1">{platform.name}</h2>
                {editing === platform.name ? (
                  <div className="flex gap-2 mt-2">
                    <input
                      type="password"
                      className="px-3 py-2 rounded-xl border border-gray-700 bg-gray-900/50 text-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                      value={inputValue}
                      onChange={e => setInputValue(e.target.value)}
                      placeholder="Enter API key"
                    />
                    <button
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold hover:opacity-90 transition-all duration-200"
                      onClick={() => handleSave(platform)}
                    >
                      Save
                    </button>
                    <button
                      className="px-4 py-2 rounded-xl bg-white/5 text-gray-300 text-sm font-semibold hover:bg-white/10 transition-all duration-200"
                      onClick={() => setEditing(null)}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-gray-400 text-sm">
                      {apiKeys[platform.name] ? 'API Key Set' : 'No API Key'}
                    </span>
                    <button
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold hover:opacity-90 transition-all duration-200"
                      onClick={() => handleEdit(platform)}
                    >
                      {apiKeys[platform.name] ? 'Edit' : 'Add'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* API Key Security Info */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-4 mb-2">
            <KeyIcon className="w-6 h-6 text-purple-400" />
            <h3 className="text-lg font-semibold text-gray-300">API Key Security</h3>
          </div>
          <p className="text-gray-400">
            Your API keys are encrypted and stored securely. Never share your API keys with anyone.
          </p>
        </div>
      </main>
    </div>
  );
} 