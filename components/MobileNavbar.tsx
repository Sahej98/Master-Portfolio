import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Menu, X, FileText } from 'lucide-react';
import { NAVIGATION_LINKS, PERSONAL_INFO } from '../constants';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';

interface MobileNavbarProps {
  activeSection: string;
  hasScrolled: boolean;
}

const panelVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: 'tween', duration: 0.3, ease: 'easeOut' },
  },
  closed: {
    opacity: 0,
    y: '-100%',
    transition: { type: 'tween', duration: 0.3, ease: 'easeIn' },
  },
};

const listVariants: Variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const itemVariants: Variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const MobileNavbar = ({ hasScrolled, activeSection }: MobileNavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <nav
      className={`md:hidden fixed w-full z-30 top-0 start-0 transition-all duration-300 ${
        hasScrolled || isOpen
          ? 'bg-white/70 shadow-md dark:bg-slate-900/70 backdrop-blur-lg'
          : 'bg-transparent'
      }`}
    >
      <div className='max-w-screen-xl flex items-center justify-between mx-auto p-4'>
        <Logo />
        <div className='flex items-center gap-2'>
          <ThemeToggle />
          <motion.button
            onClick={toggleMenu}
            whileTap={{ scale: 0.9 }}
            type='button'
            className='relative z-50 inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none dark:text-slate-400 dark:hover:bg-slate-700'
            aria-controls='navbar-mobile-menu'
            aria-expanded={isOpen}
          >
            <span className='sr-only'>Open main menu</span>
             <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={isOpen ? 'x' : 'menu'}
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id='navbar-mobile-menu'
            variants={panelVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className='absolute top-0 left-0 w-full h-[100dvh] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl pt-20'
          >
            <motion.ul
              variants={listVariants}
              className='flex flex-col items-center gap-4 p-4 py-8'
            >
              {NAVIGATION_LINKS.map((link) => (
                <motion.li key={link.name} variants={itemVariants} className="w-full max-w-xs">
                  <a
                    href={link.href}
                    onClick={toggleMenu}
                    className={`block py-3 px-6 rounded-lg transition-colors text-lg w-full text-center font-medium ${
                      activeSection === link.href.substring(1)
                        ? 'text-emerald-600 bg-emerald-500/10 dark:text-emerald-400 dark:bg-emerald-400/10'
                        : 'text-gray-800 dark:text-slate-300 hover:bg-gray-200/50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
              <motion.li variants={itemVariants} className="mt-6 w-full max-w-xs">
                <a
                  href={PERSONAL_INFO.resumeUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center justify-center gap-3 text-base font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-600/50 dark:border-emerald-400/50 w-full py-3 px-3 rounded-lg transition-colors hover:bg-emerald-600/10 dark:hover:bg-emerald-400/10'
                >
                  <FileText size={20} />
                  Resume
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default MobileNavbar;