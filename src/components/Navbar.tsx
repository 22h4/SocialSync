'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon, Cog6ToothIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import Logo from './Logo';

const SCROLL_THRESHOLD = 50;

const Navbar = () => {
  const { data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      scrollTimeout = setTimeout(() => {
        if (currentScrollY <= 0) {
          setIsVisible(true);
        } else if (Math.abs(currentScrollY - lastScrollY.current) > SCROLL_THRESHOLD) {
          setIsVisible(currentScrollY < lastScrollY.current);
        }
        
        setIsScrolled(currentScrollY > 0);
        lastScrollY.current = currentScrollY;
      }, 50);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/80 backdrop-blur-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <Logo size="md" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              <Link
                href="/features"
                className="text-gray-300 hover:text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-white/10"
              >
                Features
              </Link>
              <Link
                href="/pricing"
                className="text-gray-300 hover:text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-white/10"
              >
                Pricing
              </Link>
              <Link
                href="/about"
                className="text-gray-300 hover:text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-white/10"
              >
                About
              </Link>
              {session ? (
                <>
                  <Link
                    href="/dashboard"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:opacity-90"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/settings"
                    className="text-gray-300 hover:text-white p-2 rounded-xl transition-all duration-200 hover:bg-white/10"
                  >
                    <Cog6ToothIcon className="h-5 w-5" />
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-gray-300 hover:text-white p-2 rounded-xl transition-all duration-200 hover:bg-white/10"
                  >
                    <ArrowRightOnRectangleIcon className="h-5 w-5" />
                  </button>
                </>
              ) : (
                <Link
                  href="/auth/signin"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:opacity-90"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none p-2 rounded-xl transition-all duration-200 hover:bg-white/10"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-gray-900/95 backdrop-blur-lg"
            ref={dropdownRef}
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              <Link
                href="/features"
                className="text-gray-300 hover:text-white block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 hover:bg-white/10"
              >
                Features
              </Link>
              <Link
                href="/pricing"
                className="text-gray-300 hover:text-white block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 hover:bg-white/10"
              >
                Pricing
              </Link>
              <Link
                href="/about"
                className="text-gray-300 hover:text-white block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 hover:bg-white/10"
              >
                About
              </Link>
              {session ? (
                <>
                  <Link
                    href="/dashboard"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 hover:opacity-90"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/settings"
                    className="text-gray-300 hover:text-white block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 hover:bg-white/10"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-gray-300 hover:text-white block px-4 py-3 rounded-xl text-base font-medium w-full text-left transition-all duration-200 hover:bg-white/10"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/auth/signin"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 hover:opacity-90"
                >
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar; 