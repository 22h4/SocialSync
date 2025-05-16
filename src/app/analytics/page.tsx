'use client';

import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Analytics</h1>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Posts</h3>
          <p className="text-3xl font-bold mt-2">1,234</p>
          <p className="text-sm text-green-500 mt-2">+12% from last month</p>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Engagement</h3>
          <p className="text-3xl font-bold mt-2">45.6K</p>
          <p className="text-sm text-green-500 mt-2">+8% from last month</p>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500">Average Reach</h3>
          <p className="text-3xl font-bold mt-2">2.3K</p>
          <p className="text-sm text-red-500 mt-2">-3% from last month</p>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="platforms">Platforms</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Engagement Overview</h2>
            <div className="h-[400px] flex items-center justify-center border rounded-lg">
              <p className="text-gray-500">Chart will be displayed here</p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="platforms">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Platform Performance</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">Twitter</h3>
                  <p className="text-sm text-gray-500">15.2K engagements</p>
                </div>
                <p className="text-green-500">+12%</p>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">LinkedIn</h3>
                  <p className="text-sm text-gray-500">8.7K engagements</p>
                </div>
                <p className="text-green-500">+5%</p>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">Facebook</h3>
                  <p className="text-sm text-gray-500">21.7K engagements</p>
                </div>
                <p className="text-red-500">-2%</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="content">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Top Performing Content</h2>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium">How to Boost Your Social Media Presence</h3>
                <p className="text-sm text-gray-500 mt-1">Posted on Twitter • 2 days ago</p>
                <div className="flex gap-4 mt-2 text-sm text-gray-500">
                  <span>2.3K views</span>
                  <span>456 likes</span>
                  <span>123 retweets</span>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-medium">LinkedIn Growth Strategies</h3>
                <p className="text-sm text-gray-500 mt-1">Posted on LinkedIn • 5 days ago</p>
                <div className="flex gap-4 mt-2 text-sm text-gray-500">
                  <span>1.8K views</span>
                  <span>234 likes</span>
                  <span>45 comments</span>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 