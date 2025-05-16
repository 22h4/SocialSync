import './globals.css';
import { Inter } from 'next/font/google';
import { getServerSession } from 'next-auth';
import { Metadata } from 'next';
import Providers from '@/components/Providers';
import HeaderNav from '@/components/HeaderNav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SocialSync - Cross-Platform Social Media Management',
  description: 'Schedule and manage your social media content across multiple platforms with ease.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Providers session={session}>
          <div className="min-h-screen bg-gray-900">
            <HeaderNav />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
} 