import React from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '../constants';

const Footer = () => {
  return (
    <footer className='bg-white/30 dark:bg-transparent backdrop-blur-sm border-t border-gray-200/50 dark:border-slate-800/50 relative z-10'>
      <div className='max-w-screen-xl mx-auto p-6 md:py-8'>
        <div className='flex flex-col items-center gap-6'>
          <div className='text-sm text-gray-600 dark:text-slate-400 text-center'>
            <p>
              <a
                href='https://github.com/your-repo-link'
                target='_blank'
                rel='noopener noreferrer'
                className='hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-mono hover:underline'>
                Designed & Built by {PERSONAL_INFO.name}
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
