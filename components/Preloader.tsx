import React from 'react';
import { motion } from 'framer-motion';

const Preloader = () => {
  return (
    <motion.div
      className='fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-slate-950'
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      aria-live='polite'
      aria-busy='true'>
      <motion.div
        className='font-extrabold text-5xl md:text-7xl tracking-tighter text-gray-900 dark:text-white'
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        }}>
        <span className='text-emerald-500 dark:text-emerald-400'>P</span>S
      </motion.div>
    </motion.div>
  );
};

export default Preloader;
