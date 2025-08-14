import React, { useState, useEffect } from 'react';
import { Menu, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAVIGATION_LINKS, PERSONAL_INFO } from '../constants';
import { SectionID } from '../types';
import ThemeToggle from './ThemeToggle';

const Logo = () => (
  <a
    href={`#${SectionID.HERO}`}
    className='flex items-center space-x-2 rtl:space-x-reverse transition-transform duration-300 hover:scale-105'
    aria-label='Homepage'>
    <div className='font-extrabold text-2xl tracking-tighter text-gray-900 dark:text-white'>
      <span className='text-emerald-500 dark:text-emerald-400'>P</span>S
    </div>
  </a>
);

const NavLinks = ({
  activeSection,
  onLinkClick,
}: {
  activeSection: string;
  onLinkClick?: () => void;
}) => (
  <>
    {NAVIGATION_LINKS.map((link) => (
      <motion.li key={link.name} className='relative'>
        <a
          href={link.href}
          onClick={onLinkClick}
          className={`block py-2 px-3 rounded md:p-0 transition-colors duration-300 text-sm font-medium ${
            activeSection === link.href.substring(1)
              ? 'text-gray-900 dark:text-white'
              : 'text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white'
          }`}>
          {link.name}
        </a>
        {activeSection === link.href.substring(1) && (
          <motion.span
            className='absolute -bottom-1 left-0 right-0 h-0.5 bg-emerald-500 dark:bg-emerald-400 rounded-full'
            layoutId='underline'
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          />
        )}
      </motion.li>
    ))}
  </>
);

const mobileMenuVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { when: 'beforeChildren', staggerChildren: 0.05 },
  },
  exit: { opacity: 0, y: -20 },
};

const mobileLinkVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(SectionID.HERO);
  const [hasScrolled, setHasScrolled] = useState(false);

  const handleScroll = () => {
    setHasScrolled(window.scrollY > 10);
    const sections = Object.values(SectionID);
    const scrollPosition = window.scrollY + 100;

    for (const sectionId of sections) {
      const element = document.getElementById(sectionId);
      if (
        element &&
        element.offsetTop <= scrollPosition &&
        element.offsetTop + element.offsetHeight > scrollPosition
      ) {
        setActiveSection(sectionId);
        break;
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-30 top-0 start-0 transition-all duration-300 ${
        hasScrolled
          ? 'bg-white/70 shadow-md dark:bg-slate-900/70 backdrop-blur-lg border-b border-gray-200/50 dark:border-slate-800/50'
          : 'bg-transparent'
      }`}>
      <div className='max-w-screen-xl flex items-center mx-auto p-4'>
        {/* Left: Logo */}
        <div className='flex-1 flex justify-start'>
          <Logo />
        </div>

        {/* Center: Nav Links (Desktop) */}
        <div className='hidden md:flex flex-none justify-center'>
          <ul className='flex items-center space-x-10 font-medium'>
            <NavLinks
              activeSection={activeSection}
              onLinkClick={() => setIsOpen(false)}
            />
          </ul>
        </div>

        {/* Right: Actions (Desktop) & Mobile Menu */}
        <div className='flex-1 flex justify-end items-center gap-2'>
          <div className='hidden md:flex items-center gap-4'>
            <a
              href={PERSONAL_INFO.resumeUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-600/50 dark:border-emerald-400/50 px-4 py-2 rounded-lg hover:bg-emerald-600/10 dark:hover:bg-emerald-400/10 transition-colors duration-300'>
              <FileText size={16} />
              Resume
            </a>
            <ThemeToggle />
          </div>

          <div className='flex md:hidden items-center'>
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              type='button'
              className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-slate-400 dark:hover:bg-slate-700 dark:focus:ring-slate-600'
              aria-controls='navbar-mobile-menu'
              aria-expanded={isOpen}>
              <span className='sr-only'>Open main menu</span>
              <Menu className='w-6 h-6' />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id='navbar-mobile-menu'
            className='md:hidden'
            variants={mobileMenuVariants}
            initial='hidden'
            animate='visible'
            exit='exit'>
            <ul className='flex flex-col p-4 font-medium bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-gray-200/50 dark:border-slate-800/50'>
              {NAVIGATION_LINKS.map((link) => (
                <motion.li key={link.name} variants={mobileLinkVariants}>
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block py-3 px-3 rounded-lg transition-colors text-base ${
                      activeSection === link.href.substring(1)
                        ? 'text-emerald-600 bg-emerald-500/10 dark:text-emerald-400 dark:bg-emerald-400/10'
                        : 'text-gray-800 hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-slate-800'
                    }`}>
                    {link.name}
                  </a>
                </motion.li>
              ))}
              <motion.li variants={mobileLinkVariants}>
                <a
                  href={PERSONAL_INFO.resumeUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-3 text-base text-gray-800 hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-slate-800 py-3 px-3 rounded-lg transition-colors'>
                  <FileText size={20} />
                  Resume
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
