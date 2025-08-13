import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.button
      onClick={toggleTheme}
      className='relative flex items-center justify-center rounded-full w-10 h-10 
                 bg-gray-200 dark:bg-slate-800 hover:bg-gray-300 dark:hover:bg-slate-700
                 transition-colors duration-200'
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      whileTap={{ scale: 0.9, rotate: 15 }}>
      <span className='sr-only'>Toggle theme</span>

      {/* Animated icon swap */}
      <AnimatePresence mode='wait' initial={false}>
        {isDark ? (
          <motion.div
            key='moon'
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className='absolute'>
            <Moon className='h-5 w-5 text-emerald-400' />
          </motion.div>
        ) : (
          <motion.div
            key='sun'
            initial={{ opacity: 0, rotate: 90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: -90 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className='absolute'>
            <Sun className='h-5 w-5 text-yellow-500' />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default ThemeToggle;
