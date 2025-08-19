import React, { useState } from 'react';
import { Menu, X, FileText } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { NAVIGATION_LINKS, PERSONAL_INFO } from '../constants';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';

interface MobileNavbarProps {
  activeSection: string;
  hasScrolled: boolean;
}

const mobileMenuVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.2, ease: 'easeOut' } 
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    transition: { duration: 0.15, ease: 'easeIn' }
  },
};

const mobileLinkContainerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
        }
    }
};

const mobileLinkVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { ease: 'easeOut'} },
};

const MobileNavbar = ({ hasScrolled, activeSection }: MobileNavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav
      className={`md:hidden fixed w-full z-30 top-0 start-0 transition-all duration-300 ${
        hasScrolled || isOpen
          ? 'bg-white/70 shadow-md dark:bg-slate-900/70 backdrop-blur-lg border-b border-gray-200/50 dark:border-slate-800/50'
          : 'bg-transparent'
      }`}
    >
      <div className='max-w-screen-xl flex items-center justify-between mx-auto p-4'>
        <Logo />
        <div className='flex items-center gap-2'>
          <ThemeToggle />
          <motion.button
            onClick={toggleMenu}
            type='button'
            className='relative z-50 inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-slate-400 dark:hover:bg-slate-700 dark:focus:ring-slate-600'
            aria-controls='navbar-mobile-menu'
            aria-expanded={isOpen}
            whileTap={{ scale: 0.9 }}
          >
            <span className='sr-only'>Open main menu</span>
            <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                     <motion.div key="x" initial={{rotate: -90, opacity: 0}} animate={{rotate: 0, opacity: 1}} exit={{rotate: 90, opacity: 0}} transition={{duration: 0.2}}>
                        <X className='w-6 h-6' />
                    </motion.div>
                ) : (
                    <motion.div key="menu" initial={{rotate: 90, opacity: 0}} animate={{rotate: 0, opacity: 1}} exit={{rotate: -90, opacity: 0}} transition={{duration: 0.2}}>
                        <Menu className='w-6 h-6' />
                    </motion.div>
                )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id='navbar-mobile-menu'
            className='fixed inset-0 z-40 pt-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl'
            variants={mobileMenuVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
          >
            <motion.ul 
                className='flex flex-col items-center justify-center h-full gap-4 p-4'
                variants={mobileLinkContainerVariants}
            >
              {NAVIGATION_LINKS.map((link) => (
                <motion.li key={link.name} variants={mobileLinkVariants}>
                  <a
                    href={link.href}
                    onClick={toggleMenu}
                    className={`block py-3 px-6 rounded-lg transition-colors text-lg w-full text-center ${
                      activeSection === link.href.substring(1)
                        ? 'text-emerald-600 bg-emerald-500/10 dark:text-emerald-400 dark:bg-emerald-400/10'
                        : 'text-gray-800 dark:text-slate-300'
                    }`}
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
              <motion.li variants={mobileLinkVariants} className="mt-8 w-full max-w-xs">
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