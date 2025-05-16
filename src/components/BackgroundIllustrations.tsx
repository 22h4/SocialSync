'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function BackgroundIllustrations() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#1F2937_0%,transparent_50%),radial-gradient(circle_at_top_right,#4F46E5_0%,transparent_50%),radial-gradient(at_bottom,#111827_0%,transparent_60%)] opacity-30" />
      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-gray-900/10 via-transparent to-purple-800/5"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
      />
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:14px_14px]" />
      {/* Subtle noise */}
      <div className="absolute inset-0 bg-noise opacity-[0.008] mix-blend-overlay" />
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.1)_70%,rgba(0,0,0,0.2)_100%)]" />
    </div>
  );
} 