import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import SocialSettingsForm from '@/components/SocialSettingsForm';

export default async function SettingsPage() {
  const session = await getServerSession();
  
  if (!session?.user?.email) {
    redirect('/api/auth/signin');
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { socialSettings: true },
  });

  if (!user) {
    redirect('/api/auth/signin');
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Social Media Settings
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Manage your social media credentials and preferences
          </p>
        </div>
        <div className="mt-12">
          <SocialSettingsForm initialSettings={user.socialSettings} />
        </div>
      </div>
    </div>
  );
} 