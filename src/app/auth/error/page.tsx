'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRightIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import BackgroundIllustrations from '@/components/BackgroundIllustrations';

const fadeInUp = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.5 }
};

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'Configuration':
        return 'There is a problem with the server configuration.';
      case 'AccessDenied':
        return 'Access was denied to this resource.';
      case 'Verification':
        return 'The verification token has expired or has already been used.';
      default:
        return 'An error occurred during authentication.';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-900">
      <BackgroundIllustrations />
      
      <div className="relative z-10 w-full max-w-md px-8">
        <motion.div
          initial="initial"
          animate="animate"
          className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 shadow-2xl"
        >
          <motion.div variants={fadeInUp} className="text-center mb-8">
            <div className="mx-auto w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
              <ExclamationTriangleIcon className="w-6 h-6 text-red-500" />
            </div>
            <h1 className="text-3xl font-bold text-red-500 mb-2">
              Authentication Error
            </h1>
            <p className="text-gray-400">
              {getErrorMessage(error)}
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="mt-8 text-center"
          >
            <Link
              href="/auth/signin"
              className="inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white rounded-xl p-4 transition-all"
            >
              Try Again
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="mt-8 text-center"
        >
          <Link
            href="/"
            className="text-gray-400 hover:text-white inline-flex items-center gap-2 transition-colors"
          >
            <ArrowRightIcon className="w-4 h-4 rotate-180" />
            Back to home
          </Link>
        </motion.div>
      </div>
    </div>
  );
} 