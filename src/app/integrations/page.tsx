'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function IntegrationsPage() {
  const [twitterKey, setTwitterKey] = useState('');
  const [linkedinKey, setLinkedinKey] = useState('');
  const [facebookKey, setFacebookKey] = useState('');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Social Media Integrations</h1>

      <Tabs defaultValue="twitter" className="space-y-6">
        <TabsList>
          <TabsTrigger value="twitter">Twitter</TabsTrigger>
          <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
          <TabsTrigger value="facebook">Facebook</TabsTrigger>
        </TabsList>

        <TabsContent value="twitter">
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Twitter API Configuration</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="twitterApiKey">API Key</Label>
                    <Input
                      id="twitterApiKey"
                      type="password"
                      value={twitterKey}
                      onChange={(e) => setTwitterKey(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="twitterApiSecret">API Secret</Label>
                    <Input
                      id="twitterApiSecret"
                      type="password"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="twitterAccessToken">Access Token</Label>
                    <Input
                      id="twitterAccessToken"
                      type="password"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Save Configuration</Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="linkedin">
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">LinkedIn API Configuration</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="linkedinClientId">Client ID</Label>
                    <Input
                      id="linkedinClientId"
                      type="password"
                      value={linkedinKey}
                      onChange={(e) => setLinkedinKey(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="linkedinClientSecret">Client Secret</Label>
                    <Input
                      id="linkedinClientSecret"
                      type="password"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Save Configuration</Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="facebook">
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Facebook API Configuration</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="facebookAppId">App ID</Label>
                    <Input
                      id="facebookAppId"
                      type="password"
                      value={facebookKey}
                      onChange={(e) => setFacebookKey(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="facebookAppSecret">App Secret</Label>
                    <Input
                      id="facebookAppSecret"
                      type="password"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Save Configuration</Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="mt-8 p-6">
        <h2 className="text-xl font-semibold mb-4">Integration Status</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="font-medium">Twitter</h3>
              <p className="text-sm text-gray-500">Connected</p>
            </div>
            <Button variant="outline" className="text-red-500">Disconnect</Button>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="font-medium">LinkedIn</h3>
              <p className="text-sm text-gray-500">Not Connected</p>
            </div>
            <Button variant="outline">Connect</Button>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="font-medium">Facebook</h3>
              <p className="text-sm text-gray-500">Connected</p>
            </div>
            <Button variant="outline" className="text-red-500">Disconnect</Button>
          </div>
        </div>
      </Card>
    </div>
  );
} 