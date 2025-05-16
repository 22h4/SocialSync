"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  BellIcon,
  UserCircleIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  UserGroupIcon,
  ClockIcon,
  SparklesIcon,
  CalendarIcon,
  ChartPieIcon,
  ArrowRightOnRectangleIcon,
  KeyIcon,
  LinkIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import BackgroundIllustrations from "@/components/BackgroundIllustrations";
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ScheduledPosts from '@/components/ScheduledPosts';
import Analytics from '@/components/Analytics';

const stats = [
  {
    name: "Total Posts",
    value: "1,234",
    icon: ChartBarIcon,
    change: "+12%",
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Engagement Rate",
    value: "4.5%",
    icon: ArrowTrendingUpIcon,
    change: "+2.3%",
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "Followers",
    value: "12.5K",
    icon: UserGroupIcon,
    change: "+8.1%",
    color: "from-green-500 to-emerald-500",
  },
  {
    name: "Avg. Response Time",
    value: "2.5h",
    icon: ClockIcon,
    change: "-15%",
    color: "from-orange-500 to-red-500",
  },
];

const quickActions = [
  {
    title: "Create New Post",
    description: "Share your content across all platforms",
    icon: SparklesIcon,
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Schedule Posts",
    description: "Plan your content calendar",
    icon: CalendarIcon,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "View Analytics",
    description: "Track your performance",
    icon: ChartPieIcon,
    color: "from-green-500 to-emerald-500",
  },
];

// Define modal content type
interface ModalContentItem {
  icon: React.ElementType;
  title: string;
  message: string;
}
const modalContent: Record<string, ModalContentItem> = {
  "Create New Post": {
    icon: SparklesIcon,
    title: "Create New Post",
    message: "A beautiful post creation experience is coming soon!",
  },
  "Schedule Posts": {
    icon: CalendarIcon,
    title: "Schedule Posts",
    message: "A powerful content calendar is coming soon!",
  },
  "View Analytics": {
    icon: ChartPieIcon,
    title: "View Analytics",
    message: "Advanced analytics and insights are coming soon!",
  },
  "View all": {
    icon: ChartBarIcon,
    title: "All Posts",
    message: "A full list of your posts will be here soon!",
  },
  "View calendar": {
    icon: CalendarIcon,
    title: "Calendar View",
    message: "A full calendar view is coming soon!",
  },
  "Settings": {
    icon: Cog6ToothIcon,
    title: "Settings",
    message: "Settings page coming soon!",
  },
};

const notifications = [
  { title: 'API key updated', time: '2 min ago', type: 'key' },
  { title: 'New connection', time: '1 hour ago', type: 'connection' },
  { title: 'Settings changed', time: '2 hours ago', type: 'settings' }
];

export default async function DashboardPage() {
  const session = await getServerSession();
  
  if (!session?.user?.email) {
    redirect('/api/auth/signin');
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      scheduledPosts: {
        orderBy: { scheduledFor: 'desc' },
        take: 10,
      },
      socialSettings: true,
    },
  });

  if (!user) {
    redirect('/api/auth/signin');
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Dashboard
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Manage your social media presence
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold mb-6">Scheduled Posts</h2>
            <ScheduledPosts posts={user.scheduledPosts} />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-6">Analytics</h2>
            <Analytics userId={user.id} />
          </div>
        </div>
      </div>
    </div>
  );
}