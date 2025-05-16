'use client';

import { motion } from 'framer-motion';
import { 
  RocketLaunchIcon, 
  LightBulbIcon,
  HeartIcon,
  GlobeAltIcon,
  UserGroupIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import BackgroundIllustrations from '@/components/BackgroundIllustrations';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { useRef, useEffect, useState } from 'react';
import Head from 'next/head';

const values = [
  {
    title: 'Innovation First',
    description: 'Pushing the boundaries of social media management with cutting-edge AI technology.',
    icon: LightBulbIcon,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'User-Centric',
    description: 'Every feature is designed with our users in mind, making social media management effortless and intuitive.',
    icon: HeartIcon,
    color: 'from-purple-500 to-pink-500'
  },
  {
    title: 'Global Impact',
    description: 'Empowering creators and businesses worldwide to reach their full potential on social media.',
    icon: GlobeAltIcon,
    color: 'from-green-500 to-emerald-500'
  }
];

const milestones = [
  {
    year: '2023',
    title: 'Project Inception',
    description: 'SocialSync was born from the vision to revolutionize social media management.'
  },
  {
    year: '2023',
    title: 'AI Integration',
    description: 'Launched advanced AI features for content optimization and scheduling.'
  },
  {
    year: '2024',
    title: 'Global Launch',
    description: 'Expanded our platform to serve users worldwide with enhanced capabilities.'
  }
];

const highlights = [
  {
    title: 'AI at the Core',
    description: 'Every SocialSync feature is powered by proprietary AI for smarter, faster, and more creative workflows.',
    icon: SparklesIcon,
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Global Community',
    description: 'Creators and brands in 50+ countries trust SocialSync to grow their audience.',
    icon: UserGroupIcon,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Security Obsessed',
    description: 'Bank-grade encryption and blockchain backup keep your data safe and private.',
    icon: GlobeAltIcon,
    color: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Relentless Innovation',
    description: 'We ship new features every month, always listening to our users.',
    icon: RocketLaunchIcon,
    color: 'from-orange-500 to-red-500',
  },
];

const testimonials = [
  {
    name: 'Alex Kim',
    role: 'Content Creator',
    quote: 'SocialSync made my workflow 10x faster. The AI is next-level!',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Priya Patel',
    role: 'Marketing Lead, StartupX',
    quote: 'We grew our audience 3x in 2 months. The analytics and scheduling are game changers.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'Jordan Lee',
    role: 'Agency Owner',
    quote: 'My team saves hours every week. The support is fast and helpful. Highly recommend!',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
  },
];

const team = [
  {
    name: 'Umesh Sharma',
    role: 'Founder & Lead Engineer',
    avatar: '/umesh.png',
    bio: 'AI enthusiast, full-stack developer, and product visionary. Building SocialSync for creators everywhere.'
  }
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
          SocialSync: AI-Driven. Secure. Effortless. Built for Creators. &nbsp;
        </span>
        <span className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent px-8">
          SocialSync: AI-Driven. Secure. Effortless. Built for Creators. &nbsp;
        </span>
      </motion.div>
    </div>
  );
}

function AnimatedCounter({ end, label }: { end: number, label: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const step = Math.ceil(end / (duration / 16));
    const interval = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(interval);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(interval);
  }, [end]);
  return (
    <div className="flex flex-col items-center">
      <span className="text-4xl font-bold text-gradient">{count}+</span>
      <span className="text-gray-400 text-sm mt-1">{label}</span>
    </div>
  );
}

function TestimonialSlider() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIdx(i => (i + 1) % testimonials.length), 4000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="relative w-full max-w-xl mx-auto min-h-[220px] flex items-center justify-center mb-8">
      {testimonials.map((t, i) => (
        <motion.div
          key={t.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: idx === i ? 1 : 0, y: idx === i ? 0 : 20 }}
          transition={{ duration: 0.5 }}
          className={`absolute left-0 right-0 ${idx === i ? 'block' : 'pointer-events-none'}`}
          style={{ zIndex: idx === i ? 1 : 0 }}
        >
          <div className="glass-card p-8 flex flex-col items-center text-center">
            <img src={t.avatar} alt={t.name + ' avatar'} className="w-16 h-16 rounded-full mb-4 border-4 border-purple-500 shadow-lg" />
            <p className="text-gray-300 italic mb-3">"{t.quote}"</p>
            <div className="font-bold text-white">{t.name}</div>
            <div className="text-sm text-purple-300">{t.role}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function ScrollToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      aria-label="Scroll to top"
      className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:scale-110 transition"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      ↑
    </button>
  );
}

export default function AboutPage() {
  const sliderRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <Head>
        <title>About SocialSync | AI-Powered Social Media Management</title>
        <meta name="description" content="Learn about SocialSync, the AI-powered platform revolutionizing social media management for creators and brands worldwide." />
        <meta name="keywords" content="SocialSync, social media management, AI, automation, creators, brands, team, about" />
        <link rel="canonical" href="https://socialsync.com/about" />
        <meta property="og:title" content="About SocialSync | AI-Powered Social Media Management" />
        <meta property="og:description" content="Learn about SocialSync, the AI-powered platform revolutionizing social media management for creators and brands worldwide." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://socialsync.com/about" />
        <meta property="og:image" content="https://socialsync.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About SocialSync | AI-Powered Social Media Management" />
        <meta name="twitter:description" content="Learn about SocialSync, the AI-powered platform revolutionizing social media management for creators and brands worldwide." />
        <meta name="twitter:image" content="https://socialsync.com/og-image.png" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'SocialSync',
          url: 'https://socialsync.com',
          logo: 'https://socialsync.com/logo.png',
          sameAs: [
            'https://twitter.com/socialsync',
            'https://linkedin.com/company/socialsync',
            'https://github.com/socialsync'
          ],
          description: 'AI-powered social media management platform for creators and brands.'
        }) }} />
      </Head>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 relative">
        <BackgroundIllustrations />
        <ScrollToTop />
        <main className="max-w-4xl md:max-w-5xl lg:max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-8 md:py-16">
          {/* Dynamic Moving Typography */}
          <Marquee />
          {/* Animated Counters */}
          <section className="flex flex-wrap justify-center gap-8 md:gap-16 mb-12 md:mb-20">
            <AnimatedCounter end={50} label="Countries" />
            <AnimatedCounter end={10000} label="Active Users" />
            <AnimatedCounter end={99} label="Uptime %" />
            <AnimatedCounter end={5} label="AI Models" />
          </section>
          {/* Hero Section */}
          <div className="text-center mb-12 md:mb-20">
            <div className="flex items-center justify-center mb-6 md:mb-10">
              <Logo size="lg" />
            </div>
            <h1 className="text-4xl font-bold text-center text-gradient mb-3 md:mb-5">About SocialSync</h1>
            <p className="text-lg md:text-xl text-gray-300 text-center mb-6 md:mb-10">
              We're on a mission to simplify social media management for content creators and businesses
            </p>
          </div>
          {/* Card Slider for Values */}
          <div className="mb-14 md:mb-20">
            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6 md:mb-8">Our Core Values</h2>
            <div
              ref={sliderRef}
              className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar snap-x snap-mandatory"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`min-w-[320px] max-w-xs snap-center glass-card p-8 flex-shrink-0 hover:scale-[1.04] transition-transform duration-300 cursor-pointer border-2 border-purple-500/10`}
                  aria-label={v.title}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${v.color} flex items-center justify-center mb-4 shadow-lg`}>
                    <v.icon className="w-6 h-6 text-white" aria-label={v.title + ' icon'} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{v.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{v.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
          {/* Modern Feature Cards */}
          <div className="mb-20 md:mb-32">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10 md:mb-16">
              What Makes Us Different
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
              {highlights.map((h, i) => (
                <motion.div
                  key={h.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`glass-card p-8 hover:scale-[1.04] transition-transform duration-300 cursor-pointer border-2 border-purple-500/10`}
                  aria-label={h.title}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${h.color} flex items-center justify-center mb-4 shadow-lg`}>
                    <h.icon className="w-6 h-6 text-white" aria-label={h.title + ' icon'} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{h.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{h.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
          {/* Testimonial Slider */}
          <section className="mb-20 md:mb-32">
            <h2 className="text-3xl font-bold text-center text-gradient mb-8 md:mb-10">What Our Users Say</h2>
            <TestimonialSlider />
          </section>
          {/* Journey Section */}
          <div className="mb-14 md:mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-6 md:mb-8"
            >
              Our Journey
            </motion.h2>
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4"
                  aria-label={milestone.title}
                >
                  <div className="w-24 flex-shrink-0">
                    <span className="text-xl font-bold text-purple-500 dark:text-purple-400">
                      {milestone.year}
                    </span>
                  </div>
                  <div className="flex-1 glass-card p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {milestone.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          {/* Team Section - Only Umesh Sharma */}
          <section className="mb-20 md:mb-32">
            <h2 className="text-3xl font-bold text-center text-gradient mb-8">Meet the Developer</h2>
            <div className="flex flex-col items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5 }}
                className="glass-card p-8 flex flex-col items-center hover:scale-[1.04] transition-transform duration-300 cursor-pointer border-2 border-purple-500/10 max-w-xs"
                aria-label="Umesh Sharma"
              >
                <img src="/umesh.png" alt="Umesh Sharma photo" className="w-24 h-24 rounded-full mb-4 border-4 border-purple-500 shadow-lg object-cover" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Umesh Sharma</h3>
                <div className="text-purple-400 font-semibold mb-2">Founder & Lead Engineer</div>
                <p className="text-gray-600 dark:text-gray-400 text-center">AI enthusiast, full-stack developer, and product visionary. Building SocialSync for creators everywhere.</p>
              </motion.div>
            </div>
          </section>
          {/* Mission Statement */}
          <h2 className="text-3xl font-bold text-center text-gradient mb-8">Our Mission</h2>
          <p className="text-xl text-gray-300 text-center mb-10 md:mb-12">
            To empower content creators and businesses with the tools they need to succeed in social media
          </p>
          {/* Animated CTA */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <Link 
              href="/pricing"
              className="inline-block px-10 py-5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-lg text-lg animate-pulse"
            >
              Get Started Today
            </Link>
          </motion.div>
        </main>
      </div>
    </>
  );
} 