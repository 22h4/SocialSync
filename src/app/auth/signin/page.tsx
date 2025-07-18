'use client';

import { signIn } from 'next-auth/react';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import BackgroundIllustrations from '@/components/BackgroundIllustrations';

const fadeInUp = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.5 }
};

export default function SignIn() {
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
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-2">
              Welcome to SocialSync
            </h1>
            <p className="text-gray-400">
              Sign in to start sharing your content
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="space-y-4"
          >
            <button
              onClick={() => signIn('github', { callbackUrl: '/' })}
              className="w-full bg-gray-700 hover:bg-gray-600 text-white rounded-xl p-4 flex items-center justify-center gap-3 transition-all hover:scale-105 transform-gpu"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Continue with GitHub
            </button>

            <button
              onClick={() => signIn('google', { callbackUrl: '/' })}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white rounded-xl p-4 flex items-center justify-center gap-3 transition-all hover:scale-105 transform-gpu"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                />
              </svg>
              Continue with Google
            </button>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="mt-8 text-center text-sm text-gray-500"
          >
            By signing in, you agree to our{' '}
            <a href="#" className="text-purple-400 hover:text-purple-300">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-purple-400 hover:text-purple-300">
              Privacy Policy
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="mt-8 text-center"
        >
          <a
            href="/"
            className="text-gray-400 hover:text-white inline-flex items-center gap-2 transition-colors"
          >
            <ArrowRightIcon className="w-4 h-4 rotate-180" />
            Back to home
          </a>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
    </div>
  );
} 