import './globals.css';
import { Inter } from 'next/font/google';
import { getServerSession } from 'next-auth';
import SessionProvider from '@/components/SessionProvider';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Analytics } from "@vercel/analytics/react";
import Logo from '@/components/Logo';
import Link from 'next/link';
import { Metadata } from 'next';
import { useState, useRef, useEffect } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    }
    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuOpen]);

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <SessionProvider session={session}>
          <ThemeProvider>
            <div className="min-h-screen bg-gray-900">
              <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                      <Link href="/" className="flex items-center">
                        <Logo size="sm" />
                      </Link>
                    </div>
                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center space-x-4">
                      <Link href="/features" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Features</Link>
                      <Link href="/pricing" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Pricing</Link>
                      <Link href="/about" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About</Link>
                      {session ? (
                        <Link href="/dashboard" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-md text-sm font-semibold shadow hover:opacity-90 transition-all">Dashboard</Link>
                      ) : (
                        <Link href="/auth/signin" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-md text-sm font-semibold shadow hover:opacity-90 transition-all">Sign In</Link>
                      )}
                    </nav>
                    {/* Mobile Hamburger */}
                    <div className="md:hidden flex items-center">
                      <button
                        aria-label="Open menu"
                        className="text-gray-300 hover:text-white p-2 rounded-md focus:outline-none"
                        onClick={() => setMobileMenuOpen(v => !v)}
                      >
                        {mobileMenuOpen ? <XMarkIcon className="h-7 w-7" /> : <Bars3Icon className="h-7 w-7" />}
                      </button>
                    </div>
                  </div>
                  {/* Mobile Menu */}
                  {mobileMenuOpen && (
                    <div ref={menuRef} className="md:hidden absolute left-0 right-0 top-16 bg-gray-900/95 backdrop-blur-lg border-b border-gray-800 shadow-xl rounded-b-xl animate-fade-in z-50">
                      <nav className="flex flex-col items-stretch py-4 px-4 space-y-2">
                        <Link href="/features" className="text-gray-300 hover:text-white px-4 py-3 rounded-lg text-base font-medium transition-all" onClick={() => setMobileMenuOpen(false)}>Features</Link>
                        <Link href="/pricing" className="text-gray-300 hover:text-white px-4 py-3 rounded-lg text-base font-medium transition-all" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
                        <Link href="/about" className="text-gray-300 hover:text-white px-4 py-3 rounded-lg text-base font-medium transition-all" onClick={() => setMobileMenuOpen(false)}>About</Link>
                        {session ? (
                          <Link href="/dashboard" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-3 rounded-lg text-base font-semibold shadow hover:opacity-90 transition-all" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
                        ) : (
                          <Link href="/auth/signin" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-3 rounded-lg text-base font-semibold shadow hover:opacity-90 transition-all" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
                        )}
                      </nav>
                    </div>
                  )}
                </div>
              </header>
              {children}
            </div>
          </ThemeProvider>
        </SessionProvider>
        <Analytics />
      </body>
    </html>
  );
} 