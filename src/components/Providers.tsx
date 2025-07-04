'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from './ThemeProvider';

export default function Providers({
  children,
  session
}: {
  children: React.ReactNode;
  session: any;
}) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
} 