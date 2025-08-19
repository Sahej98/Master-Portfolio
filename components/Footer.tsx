import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className='relative bg-white/30 dark:bg-slate-900/40 backdrop-blur-sm border-t border-gray-200/50 dark:border-slate-800/50 pt-20 pb-8 px-4'>
      
      {/* Back to Top Button */}
      <div className='absolute -top-6 left-1/2 -translate-x-1/2'>
        <motion.button
          onClick={scrollToTop}
          aria-label='Scroll to top'
          className='w-12 h-12 flex items-center justify-center bg-emerald-500 text-white rounded-full shadow-lg hover:bg-emerald-600 transition-all duration-300'
          whileHover={{ scale: 1.1, y: -4 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUp className='h-6 w-6' />
        </motion.button>
      </div>
      
      <div className='max-w-screen-xl mx-auto flex flex-col items-center gap-4'>
        {/* Credit */}
        <div className='text-base text-gray-600 dark:text-slate-400 text-center'>
          <p>
            Designed & Built by {PERSONAL_INFO.name}
          </p>
          <p className='mt-2 text-sm'>
             &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;