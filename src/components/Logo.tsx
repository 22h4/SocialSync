'use client';

import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo = ({ className = '', size = 'md' }: LogoProps) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`flex items-center space-x-2 ${className}`}
    >
      {/* Logo Icon */}
      <div className={`relative ${sizeClasses[size]}`}>
        {/* Background shapes */}
        <div className="absolute inset-0">
          {/* Left shape */}
          <div className="absolute left-0 top-0 w-1/2 h-full bg-gradient-to-br from-blue-500 to-blue-600 rounded-l-lg" />
          {/* Right shape */}
          <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-br from-purple-500 to-purple-600 rounded-r-lg" />
        </div>

        {/* Overlay shapes */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Left overlay */}
          <div className="absolute left-0 top-0 w-1/2 h-full">
            <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-white/10 rounded-lg" />
          </div>
          {/* Right overlay */}
          <div className="absolute right-0 top-0 w-1/2 h-full">
            <div className="absolute bottom-1/4 right-1/4 w-1/2 h-1/2 bg-white/10 rounded-lg" />
          </div>
        </div>

        {/* Center line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/20" />
      </div>

      {/* Text */}
      <span className={`font-bold text-white ${textSizes[size]}`}>
        SocialSync
      </span>
    </motion.div>
  );
};

export default Logo; 