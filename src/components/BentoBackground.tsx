'use client';

import { useEffect, useState } from 'react';

export default function BentoBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <div className="bento-background" />
      <div className="bento-grid" />
      <div className="bento-blur" />
      
      {/* Floating Elements */}
      <div className="fixed top-1/4 left-1/4 w-32 h-32 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl floating" style={{ animationDelay: '0s' }} />
      <div className="fixed top-1/3 right-1/4 w-40 h-40 rounded-full bg-gradient-to-br from-indigo-500/20 to-pink-500/20 blur-3xl floating" style={{ animationDelay: '2s' }} />
      <div className="fixed bottom-1/4 right-1/3 w-36 h-36 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 blur-3xl floating" style={{ animationDelay: '4s' }} />
      <div className="fixed bottom-1/3 left-1/3 w-28 h-28 rounded-full bg-gradient-to-br from-pink-500/20 to-indigo-500/20 blur-3xl floating" style={{ animationDelay: '1s' }} />
    </>
  );
} 