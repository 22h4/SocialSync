'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRightIcon, 
  VideoCameraIcon, 
  ShareIcon, 
  SparklesIcon,
  ChartBarIcon,
  UserGroupIcon,
  GlobeAltIcon,
  CheckCircleIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  PhotoIcon,
  LinkIcon,
  PlayIcon,
  DevicePhoneMobileIcon,
  HeartIcon,
  BookmarkIcon,
  ChatBubbleOvalLeftIcon,
  BoltIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import { useSession, signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRef } from 'react';
import Logo from '@/components/Logo';

const fadeInUp = {
  initial: { y: 60, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.6 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const floatingAnimation = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut"
    }
  }
};

const stats = [
  { number: "1M+", label: "Active Users" },
  { number: "50M+", label: "Content Shared" },
  { number: "100+", label: "Countries" },
];

const testimonials = [
  {
    quote: "SocialSync revolutionized how I share content across platforms!",
    author: "Sarah J.",
    role: "Content Creator"
  },
  {
    quote: "The AI-powered tools save me hours of work every day.",
    author: "Mike R.",
    role: "Social Media Manager"
  },
  {
    quote: "Best platform for cross-platform content management!",
    author: "Alex T.",
    role: "Digital Marketer"
  }
];

export default function Home() {
  const { data: session } = useSession();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900" ref={ref}>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 grid grid-cols-2 md:grid-cols-3 gap-4 p-4 pointer-events-none"
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              className="h-full w-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl"
            />
          ))}
        </motion.div>

        <main className="container mx-auto px-6 pt-32 pb-20 relative">
          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="text-center"
          >
            <motion.div variants={floatingAnimation} className="inline-block">
              <motion.h1
                variants={fadeInUp}
                className="text-7xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-8 animate-gradient"
              >
                Post
              </motion.h1>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="text-2xl md:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              Transform your social media presence with AI-powered content sharing across all platforms.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col md:flex-row gap-6 justify-center items-center mb-20"
            >
              {!session ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => signIn()}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold text-lg hover:opacity-90 transition-all flex items-center gap-2 hover:gap-3 shadow-lg hover:shadow-purple-500/20"
                >
                  Get Started <ArrowRightIcon className="w-5 h-5" />
                </motion.button>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/dashboard"
                    className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold text-lg hover:opacity-90 transition-all flex items-center gap-2 hover:gap-3 shadow-lg hover:shadow-purple-500/20"
                  >
                    Go to Dashboard <ArrowRightIcon className="w-5 h-5" />
                  </Link>
                </motion.div>
              )}
            </motion.div>

            <div className="flex items-center justify-center mb-8">
              <Logo size="lg" />
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-32"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="glass p-8 rounded-2xl text-center"
              >
                <motion.h3
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2 }}
                  className="text-4xl font-bold text-gradient mb-2"
                >
                  {stat.number}
                </motion.h3>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Features Grid */}
          <motion.div
            variants={stagger}
            className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-32"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.05, rotate: 1 }}
                className="glass rounded-2xl p-8 hover:bg-gray-800/60 transition-all transform-gpu"
              >
                <motion.div
                  initial={{ rotate: 0 }}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <feature.icon className="w-12 h-12 text-purple-400 mb-6 mx-auto" />
                </motion.div>
                <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Testimonials */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="max-w-6xl mx-auto mb-32"
          >
            <h2 className="text-4xl font-bold text-center text-gradient mb-16">What Users Say</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="glass p-8 rounded-2xl relative"
                >
                  <div className="absolute -top-4 left-4 text-6xl text-purple-500/20">"</div>
                  <p className="text-gray-300 mb-6 relative z-10">{testimonial.quote}</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
                    <div>
                      <p className="font-semibold text-white">{testimonial.author}</p>
                      <p className="text-sm text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* How It Works Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="max-w-6xl mx-auto mb-32 relative"
          >
            <h2 className="text-4xl font-bold text-center text-gradient mb-16">How SocialSync Works</h2>
            
            <div className="relative">
              {/* Connection Lines */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-purple-500/30 to-transparent" />
              
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`flex items-center gap-8 mb-16 ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <div className="flex-1 p-8 glass rounded-2xl">
                    <h3 className="text-2xl font-semibold mb-4 text-gradient">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 mb-4">{step.description}</p>
                    {step.features && (
                      <ul className="space-y-2">
                        {step.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-gray-300">
                            <CheckCircleIcon className="w-5 h-5 text-purple-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="w-64 h-64 relative flex-shrink-0">
                    <motion.div
                      whileHover={{ scale: 1.05, rotate: 5 }}
                      className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl"
                    />
                    <step.icon className="w-full h-full text-purple-400 p-8" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Integration Logos */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="max-w-6xl mx-auto mb-32 text-center"
          >
            <h2 className="text-2xl font-semibold text-gray-400 mb-12">
              Seamlessly integrate with your favorite platforms
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {platforms.map((platform, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="p-6 glass rounded-xl flex items-center justify-center"
                >
                  <platform.icon className="w-12 h-12 text-gray-400" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Parallax Features */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="max-w-6xl mx-auto mb-32 relative py-16"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl" />
            
            <div className="relative grid md:grid-cols-2 gap-8 p-8">
              {advancedFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="glass p-6 rounded-xl"
                >
                  <feature.icon className="w-12 h-12 text-purple-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-8">
              Ready to Transform Your Content?
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              Join thousands of content creators who trust SocialSync for their social media management.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => signIn()}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold text-lg hover:opacity-90 transition-all flex items-center gap-2 hover:gap-3 mx-auto"
            >
              Get Started Now <ArrowRightIcon className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

const features = [
  {
    title: 'Smart Upload',
    description: 'Upload once, share everywhere with our intelligent content distribution system.',
    icon: VideoCameraIcon,
  },
  {
    title: 'AI-Powered Sharing',
    description: 'Let AI optimize your content for each platform automatically.',
    icon: ShareIcon,
  },
  {
    title: 'Content Enhancement',
    description: 'Enhance your content with AI-generated captions, hashtags, and more.',
    icon: SparklesIcon,
  },
  {
    title: 'Analytics Dashboard',
    description: 'Track performance metrics across all platforms in one place.',
    icon: ChartBarIcon,
  },
  {
    title: 'Global Reach',
    description: 'Reach your audience worldwide with smart scheduling and localization.',
    icon: GlobeAltIcon,
  },
  {
    title: 'Community Features',
    description: 'Connect with other creators and grow your network.',
    icon: UserGroupIcon,
  },
];

const steps = [
  {
    title: "Connect Your Accounts",
    description: "Link all your social media accounts in one place for seamless content management.",
    icon: GlobeAltIcon,
    features: [
      "One-click authentication",
      "Secure account linking",
      "Automatic sync"
    ]
  },
  {
    title: "Create & Customize",
    description: "Use our AI-powered tools to create and optimize content for each platform.",
    icon: SparklesIcon,
    features: [
      "Smart content adaptation",
      "Auto-formatting",
      "Platform-specific optimization"
    ]
  },
  {
    title: "Schedule & Share",
    description: "Schedule your content for the perfect posting time across all platforms.",
    icon: ClockIcon,
    features: [
      "Smart scheduling",
      "Time zone management",
      "Queue management"
    ]
  }
];

const platforms = [
  { icon: VideoCameraIcon },
  { icon: ShareIcon },
  { icon: SparklesIcon },
  { icon: ChartBarIcon },
  { icon: GlobeAltIcon },
  { icon: UserGroupIcon },
  { icon: ClockIcon },
  { icon: BoltIcon }
];

const advancedFeatures = [
  {
    title: "AI Content Generation",
    description: "Generate engaging captions, hashtags, and descriptions automatically.",
    icon: BoltIcon
  },
  {
    title: "Analytics Dashboard",
    description: "Track performance metrics across all platforms in one place.",
    icon: ChartBarIcon
  },
  {
    title: "Audience Insights",
    description: "Understand your audience better with AI-powered analytics.",
    icon: UserGroupIcon
  },
  {
    title: "Content Calendar",
    description: "Plan and visualize your content strategy with our intuitive calendar.",
    icon: CalendarIcon
  }
]; 