import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const iconVariants: Variants = {
    initial: { opacity: 0, rotate: -90, scale: 0 },
    animate: {
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 260, damping: 20 },
    },
    exit: { opacity: 0, rotate: 90, scale: 0 },
  };

  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.9 }}
      className='relative flex items-center justify-center rounded-full w-10 h-10 
                 bg-gray-200 dark:bg-slate-800 hover:bg-gray-300 dark:hover:bg-slate-700
                 transition-colors duration-200'
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
      <span className='sr-only'>Toggle theme</span>

      <AnimatePresence mode='wait' initial={false}>
        {isDark ? (
          <motion.div
            key='moon'
            variants={iconVariants}
            initial='initial'
            animate='animate'
            exit='exit'
            className='absolute'>
            <Moon className='h-5 w-5 text-emerald-400' />
          </motion.div>
        ) : (
          <motion.div
            key='sun'
            variants={iconVariants}
            initial='initial'
            animate='animate'
            exit='exit'
            className='absolute'>
            <Sun className='h-5 w-5 text-yellow-500' />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default ThemeToggle;
