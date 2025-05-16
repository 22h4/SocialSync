'use client';

import { motion } from 'framer-motion';
import { 
  VideoCameraIcon, 
  SparklesIcon,
  ChartBarIcon,
  UserGroupIcon,
  GlobeAltIcon,
  ClockIcon,
  ShieldCheckIcon,
  CursorArrowRaysIcon,
  BoltIcon,
  CloudArrowUpIcon,
  BeakerIcon,
  KeyIcon,
  PaintBrushIcon,
  DocumentDuplicateIcon,
  CpuChipIcon
} from '@heroicons/react/24/outline';
import BackgroundIllustrations from '@/components/BackgroundIllustrations';
import { useRef } from 'react';

const features = [
  {
    title: 'Proprietary AI Engine',
    description: 'Our exclusive AI technology understands context and tone, creating platform-specific content that resonates with your audience.',
    icon: CpuChipIcon,
    color: 'from-blue-500 to-cyan-500',
    isUnique: true
  },
  {
    title: 'Content DNA Analysis',
    description: 'Unique fingerprinting technology that analyzes your brand voice and maintains consistency across all platforms.',
    icon: BeakerIcon,
    color: 'from-purple-500 to-pink-500',
    isUnique: true
  },
  {
    title: 'Predictive Analytics',
    description: 'Future-proof your strategy with AI that predicts content performance before you post.',
    icon: ChartBarIcon,
    color: 'from-green-500 to-emerald-500',
    isUnique: true
  },
  {
    title: 'Multi-Verse Posting',
    description: 'Create parallel content universes - test multiple versions simultaneously to different audience segments.',
    icon: DocumentDuplicateIcon,
    color: 'from-orange-500 to-red-500',
    isUnique: true
  },
  {
    title: 'Sovereign Data Ownership',
    description: 'Unlike competitors, you retain 100% ownership of your data with local-first architecture.',
    icon: KeyIcon,
    color: 'from-indigo-500 to-blue-500',
    isUnique: true
  },
  {
    title: 'Smart Scheduling',
    description: 'AI-powered scheduling to maximize engagement based on your audience activity.',
    icon: ClockIcon,
    color: 'from-pink-500 to-rose-500'
  },
  {
    title: 'Enterprise Security',
    description: 'Bank-grade encryption and security measures to protect your social media assets.',
    icon: ShieldCheckIcon,
    color: 'from-teal-500 to-green-500'
  },
  {
    title: 'Brand Voice AI',
    description: 'Revolutionary AI that learns and maintains your unique brand voice across all content.',
    icon: PaintBrushIcon,
    color: 'from-amber-500 to-orange-500',
    isUnique: true
  },
  {
    title: 'Performance Boost',
    description: 'Optimize your content strategy with AI-driven performance recommendations.',
    icon: BoltIcon,
    color: 'from-violet-500 to-purple-500'
  },
  {
    title: 'Quantum Backup™',
    description: 'Industry-first blockchain-based content backup system for unparalleled data security.',
    icon: CloudArrowUpIcon,
    color: 'from-cyan-500 to-blue-500',
    isUnique: true
  }
];

const exclusiveFeatures = [
  {
    title: 'No-Code Automation Builder',
    description: 'Create complex automation workflows without writing a single line of code.',
    benefit: 'Save 20+ hours per week on routine tasks'
  },
  {
    title: 'AI Content Repurposing',
    description: 'Automatically transform long-form content into platform-specific formats.',
    benefit: 'Generate 10x more content from single piece'
  },
  {
    title: 'Real-time Brand Monitoring',
    description: 'Track and respond to brand mentions across all platforms instantly.',
    benefit: 'Improve response time by 300%'
  },
  {
    title: 'Cross-Platform Analytics',
    description: 'Unified analytics dashboard with custom metrics and real-time data.',
    benefit: 'Make data-driven decisions 5x faster'
  }
];

const sliderFeatures = [
  {
    title: 'AI-Powered Scheduling',
    description: "Never miss the best time to post. Our AI finds your audience's peak hours.",
    icon: ClockIcon,
    color: 'from-pink-500 to-yellow-500',
  },
  {
    title: 'Brand Voice AI',
    description: 'Maintain your unique tone everywhere with our proprietary AI.',
    icon: PaintBrushIcon,
    color: 'from-amber-500 to-orange-500',
  },
  {
    title: 'Quantum Backup™',
    description: 'Blockchain-secured backups for ultimate peace of mind.',
    icon: CloudArrowUpIcon,
    color: 'from-cyan-500 to-blue-500',
  },
  {
    title: 'No-Code Automation',
    description: 'Automate anything with a drag-and-drop builder.',
    icon: BoltIcon,
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Real-Time Analytics',
    description: 'See your results live, not just in reports.',
    icon: ChartBarIcon,
    color: 'from-green-500 to-emerald-500',
  },
];

function Marquee() {
  return (
    <div className="overflow-hidden whitespace-nowrap w-full mb-16">
      <motion.div
        className="inline-block"
        animate={{ x: [0, -600] }}
        transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
      >
        <span className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent px-8">
          AI-Driven. Secure. Effortless. SocialSync is the Future of Social Media Management. &nbsp;
        </span>
        <span className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent px-8">
          AI-Driven. Secure. Effortless. SocialSync is the Future of Social Media Management. &nbsp;
        </span>
      </motion.div>
    </div>
  );
}

export default function Features() {
  const sliderRef = useRef<HTMLDivElement>(null);
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <BackgroundIllustrations />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Dynamic Moving Typography */}
        <Marquee />
        {/* Card Slider */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">What makes SocialSync different?</h2>
          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar snap-x snap-mandatory"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {sliderFeatures.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`min-w-[320px] max-w-xs snap-center glass-card p-8 flex-shrink-0 hover:scale-[1.04] transition-transform duration-300 cursor-pointer border-2 border-purple-500/10`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${f.color} flex items-center justify-center mb-4 shadow-lg`}>
                  <f.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{f.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-6">
            Revolutionary Features You Won't Find Elsewhere
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            We've reimagined social media management with industry-first features and proprietary technology that puts you leagues ahead of the competition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className={`glass-card p-8 hover:scale-[1.02] transition-all duration-300 cursor-pointer ${
                feature.isUnique ? 'border-2 border-purple-500/20' : ''
              }`}
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 shadow-lg`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              {feature.isUnique && (
                <span className="px-3 py-1.5 text-xs font-semibold bg-purple-500/10 text-purple-500 rounded-full mb-4 inline-block">
                  Exclusive Feature
                </span>
              )}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mb-32">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-16">
            Exclusive Capabilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {exclusiveFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className="glass-card p-10 border-2 border-purple-500/20"
              >
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {feature.description}
                </p>
                <div className="inline-block px-6 py-3 bg-purple-500/10 rounded-full">
                  <span className="text-purple-500 font-semibold">
                    {feature.benefit}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-center pb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
            Ready to experience features your competitors don't have?
          </h2>
          <button className="px-10 py-5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-lg text-lg">
            Get Started Now
          </button>
        </div>
      </main>
    </div>
  );
} 