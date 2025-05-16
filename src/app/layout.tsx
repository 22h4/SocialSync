import './globals.css';
import { Inter } from 'next/font/google';
import { getServerSession } from 'next-auth';
import SessionProvider from '@/components/SessionProvider';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Metadata } from 'next';
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
        <SessionProvider session={session}>
          <ThemeProvider>
            <div className="min-h-screen bg-gray-900">
              <HeaderNav session={session} />
              {children}
            </div>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
} 