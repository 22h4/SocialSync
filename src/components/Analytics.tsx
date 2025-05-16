'use client';

import { useState, useEffect } from 'react';
import {
  ChartBarIcon,
  UserGroupIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
} from '@heroicons/react/24/outline';

interface AnalyticsData {
  totalPosts: number;
  totalEngagement: number;
  followers: {
    instagram: number;
    twitter: number;
  };
  engagement: {
    likes: number;
    comments: number;
    shares: number;
  };
}

interface Props {
  initialData: AnalyticsData;
}

export default function Analytics({ initialData }: Props) {
  const [data, setData] = useState<AnalyticsData>(initialData);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch('/api/analytics');
        if (response.ok) {
          const newData = await response.json();
          setData(newData);
        }
      } catch (error) {
        console.error('Error fetching analytics:', error);
      }
    };

    // Fetch analytics every 5 minutes
    const interval = setInterval(fetchAnalytics, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      name: 'Total Posts',
      value: data.totalPosts,
      icon: ChartBarIcon,
    },
    {
      name: 'Total Engagement',
      value: data.totalEngagement,
      icon: UserGroupIcon,
    },
    {
      name: 'Total Likes',
      value: data.engagement.likes,
      icon: HeartIcon,
    },
    {
      name: 'Total Comments',
      value: data.engagement.comments,
      icon: ChatBubbleLeftIcon,
    },
  ];

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Social Media Analytics
        </h3>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.name}
              className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
            >
              <dt>
                <div className="absolute rounded-md bg-indigo-500 p-3">
                  <item.icon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-500">
                  {item.name}
                </p>
              </dt>
              <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">
                  {item.value}
                </p>
              </dd>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h4 className="text-sm font-medium text-gray-900">Followers by Platform</h4>
          <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
              <dt className="truncate text-sm font-medium text-gray-500">
                Instagram Followers
              </dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                {data.followers.instagram}
              </dd>
            </div>
            <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
              <dt className="truncate text-sm font-medium text-gray-500">
                Twitter Followers
              </dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                {data.followers.twitter}
              </dd>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 