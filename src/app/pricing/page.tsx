'use client';

import { motion } from 'framer-motion';
import { CheckIcon, ShieldCheckIcon, StarIcon, UserGroupIcon, ChatBubbleLeftRightIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import BackgroundIllustrations from '@/components/BackgroundIllustrations';
import Logo from '@/components/Logo';

const plans = [
  {
    name: 'Starter',
    price: '$19',
    description: 'Perfect for individuals and small businesses',
    features: [
      'Connect up to 3 social media accounts',
      'Basic analytics dashboard',
      'Schedule up to 30 pieces of content per month',
      'AI-powered content suggestions',
      'Email support',
      '5 GB media storage'
    ],
    color: 'from-blue-500 to-cyan-500',
    popular: false
  },
  {
    name: 'Professional',
    price: '$49',
    description: 'Ideal for growing businesses and teams',
    features: [
      'Connect up to 10 social media accounts',
      'Advanced analytics and reporting',
      'Unlimited content scheduling',
      'AI content generation and optimization',
      'Priority email and chat support',
      '20 GB media storage',
      'Team collaboration (up to 3 members)',
      'Custom branded reports'
    ],
    color: 'from-purple-500 to-pink-500',
    popular: true
  },
  {
    name: 'Enterprise',
    price: '$99',
    description: 'Best for large organizations and agencies',
    features: [
      'Unlimited social media accounts',
      'Enterprise-grade analytics',
      'Unlimited content scheduling',
      'Advanced AI features and automation',
      '24/7 priority support',
      'Unlimited media storage',
      'Unlimited team members',
      'Custom branded reports',
      'API access',
      'Dedicated account manager'
    ],
    color: 'from-green-500 to-emerald-500',
    popular: false
  }
];

const faqs = [
  { q: 'Can I change my plan later?', a: 'Absolutely! You can upgrade or downgrade your plan at any time from your dashboard.' },
  { q: 'Is there a free trial?', a: 'Yes, we offer a 14-day free trial on all plans. No credit card required.' },
  { q: 'How secure is my data?', a: 'We use industry-leading security and encryption to protect your data.' },
  { q: 'Do you offer discounts for nonprofits?', a: 'Yes! Contact our sales team for special pricing.' },
];

const testimonials = [
  {
    name: 'Alex Kim',
    role: 'Content Creator',
    quote: 'SocialSync has made managing my social media effortless. The analytics and AI suggestions are game changers!',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Priya Patel',
    role: 'Marketing Lead, StartupX',
    quote: 'We grew our audience 3x in 2 months. The scheduling and team features are top notch.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'Jordan Lee',
    role: 'Agency Owner',
    quote: 'My team saves hours every week. The support is fast and helpful. Highly recommend!',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
  },
];

const brands = [
  '/brands/meta.svg',
  '/brands/google.svg',
  '/brands/spotify.svg',
  '/brands/airbnb.svg',
  '/brands/netflix.svg',
];

const comparison = [
  { feature: 'Social Accounts', starter: '3', pro: '10', enterprise: 'Unlimited' },
  { feature: 'Analytics', starter: 'Basic', pro: 'Advanced', enterprise: 'Enterprise' },
  { feature: 'Scheduling', starter: '30/mo', pro: 'Unlimited', enterprise: 'Unlimited' },
  { feature: 'AI Features', starter: 'Suggestions', pro: 'Gen + Opt.', enterprise: 'Advanced' },
  { feature: 'Support', starter: 'Email', pro: 'Priority', enterprise: '24/7' },
  { feature: 'Team', starter: '-', pro: '3', enterprise: 'Unlimited' },
  { feature: 'Storage', starter: '5GB', pro: '20GB', enterprise: 'Unlimited' },
  { feature: 'API Access', starter: '-', pro: '-', enterprise: 'Yes' },
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-16">
      <BackgroundIllustrations />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-32">
        <div className="flex items-center justify-center mb-8">
          <Logo size="lg" />
        </div>
        <h1 className="text-4xl font-bold text-center text-gradient mb-4">SocialSync Pricing</h1>
        <p className="text-xl text-gray-300 text-center mb-12">
          Choose the perfect plan for your social media management needs
        </p>
        {/* Brand Logos */}
        <div className="flex flex-wrap justify-center gap-8 mb-12 opacity-80">
          {brands.map((src, i) => (
            <img key={i} src={src} alt="Brand logo" className="h-8 w-auto grayscale hover:grayscale-0 transition" />
          ))}
        </div>
        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`glass-card p-6 relative ${plan.popular ? 'ring-2 ring-purple-500 dark:ring-purple-400' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium px-4 py-1 rounded-full shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${plan.color} flex items-center justify-center mb-4 shadow-lg`}>
                <span className="text-white font-bold text-xl">{plan.name[0]}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {plan.name}
              </h3>
              <div className="flex items-baseline mb-4">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                <span className="text-gray-500 dark:text-gray-400 ml-2">/month</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {plan.description}
              </p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-xl font-semibold transition-all
                ${plan.popular 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 shadow'
                }`}
              >
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
        {/* Feature Comparison Table */}
        <div className="overflow-x-auto mb-16">
          <table className="min-w-full glass-card rounded-2xl overflow-hidden">
            <thead>
              <tr className="bg-gradient-to-r from-purple-900/60 to-pink-900/60">
                <th className="px-6 py-4 text-left text-sm font-bold text-white">Feature</th>
                <th className="px-6 py-4 text-center text-sm font-bold text-white">Starter</th>
                <th className="px-6 py-4 text-center text-sm font-bold text-white">Professional</th>
                <th className="px-6 py-4 text-center text-sm font-bold text-white">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row, i) => (
                <tr key={i} className="border-t border-gray-700/40">
                  <td className="px-6 py-3 text-gray-300 font-medium">{row.feature}</td>
                  <td className="px-6 py-3 text-center text-gray-400">{row.starter}</td>
                  <td className="px-6 py-3 text-center text-gray-400">{row.pro}</td>
                  <td className="px-6 py-3 text-center text-gray-400">{row.enterprise}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Why Choose Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="glass-card rounded-2xl p-6 flex flex-col items-center text-center">
            <ShieldCheckIcon className="w-10 h-10 text-purple-400 mb-3" />
            <h4 className="text-lg font-bold text-gray-100 mb-2">Secure & Reliable</h4>
            <p className="text-gray-400">Your data is protected with enterprise-grade security and encryption.</p>
          </div>
          <div className="glass-card rounded-2xl p-6 flex flex-col items-center text-center">
            <StarIcon className="w-10 h-10 text-yellow-400 mb-3" />
            <h4 className="text-lg font-bold text-gray-100 mb-2">Loved by Creators</h4>
            <p className="text-gray-400">Thousands of creators and brands trust SocialSync to grow their audience.</p>
          </div>
          <div className="glass-card rounded-2xl p-6 flex flex-col items-center text-center">
            <ChatBubbleLeftRightIcon className="w-10 h-10 text-pink-400 mb-3" />
            <h4 className="text-lg font-bold text-gray-100 mb-2">24/7 Support</h4>
            <p className="text-gray-400">Our team is always here to help you succeed, day or night.</p>
          </div>
        </div>
        {/* Testimonials */}
        <h2 className="text-3xl font-bold text-center text-gradient mb-10">What our users say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {testimonials.map((t, i) => (
            <div key={i} className="glass-card rounded-2xl p-6 flex flex-col items-center text-center">
              <img src={t.avatar} alt={t.name} className="w-16 h-16 rounded-full mb-4 border-4 border-purple-500 shadow-lg" />
              <p className="text-gray-300 italic mb-3">"{t.quote}"</p>
              <div className="font-bold text-white">{t.name}</div>
              <div className="text-sm text-purple-300">{t.role}</div>
            </div>
          ))}
        </div>
        {/* FAQ */}
        <h2 className="text-3xl font-bold text-center text-gradient mb-8">Frequently Asked Questions</h2>
        <div className="max-w-2xl mx-auto mb-20">
          {faqs.map((faq, i) => (
            <div key={i} className="glass-card rounded-2xl p-6 mb-4">
              <div className="flex items-center gap-3 mb-2">
                <GlobeAltIcon className="w-5 h-5 text-purple-400" />
                <span className="font-semibold text-gray-100">{faq.q}</span>
              </div>
              <p className="text-gray-400 ml-8">{faq.a}</p>
            </div>
          ))}
        </div>
        {/* Final CTA */}
        <div className="text-center bg-gradient-to-t from-black/80 via-black/60 to-transparent py-8 mt-12">
          <h2 className="text-3xl font-bold text-gradient mb-4">Ready to start with SocialSync?</h2>
          <p className="text-xl text-gray-300 mb-6">
            Join thousands of content creators who trust SocialSync for their social media management
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold text-lg shadow-xl hover:opacity-90 transition-all w-full sm:w-auto">
              Get Started Now
            </button>
            <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold text-lg shadow-xl hover:opacity-90 transition-all w-full sm:w-auto">
              Contact Sales
            </button>
          </div>
          <div className="mt-2 text-gray-400 text-sm">Need a custom plan? Contact us for custom pricing and features.</div>
        </div>
      </main>
    </div>
  );
} 