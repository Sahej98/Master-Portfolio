import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';
import { SectionID } from '../types';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'tween', duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const imageContainerVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', duration: 1.5, stiffness: 50, delay: 0.4 },
  },
};

const Hero = () => {
  return (
    <section
      id={SectionID.HERO}
      className='min-h-screen flex items-center justify-center relative overflow-hidden py-24 px-4'>
      <div className='grid md:grid-cols-2 gap-10 items-center max-w-7xl mx-auto'>
        {/* Left Column: Image */}
        <motion.div
          className='relative flex justify-center items-center'
          variants={imageContainerVariants}
          initial='hidden'
          animate='visible'>
          <div
            className='w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 overflow-hidden'
            style={{
              borderRadius: '58% 42% 35% 65% / 50% 40% 60% 50%',
              boxShadow:
                '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
            }}>
            <img
              src='https://i.ibb.co/kQZ63XF/anime-pfp.png'
              alt={`Headshot of ${PERSONAL_INFO.name}`}
              className='w-full h-full object-cover'
            />
          </div>
        </motion.div>

        {/* Right Column: Text Content */}
        <motion.div
          className='relative z-10 text-center md:text-left'
          variants={containerVariants}
          initial='hidden'
          animate='visible'>
          <motion.h2
            variants={itemVariants}
            className='text-lg font-medium text-gray-800 dark:text-gray-300 mb-2'>
            Hello, I'm
          </motion.h2>

          <motion.h1
            variants={itemVariants}
            className='text-5xl sm:text-6xl md:text-7xl font-black text-gray-900 dark:text-white mb-3 leading-tight tracking-tighter'>
            {PERSONAL_INFO.name}
          </motion.h1>

          <motion.h3
            variants={itemVariants}
            className='text-xl md:text-2xl font-semibold text-gray-700 dark:text-slate-300 mb-6'>
            And I'm a{' '}
            <span className='text-emerald-600 dark:text-emerald-400 font-bold'>
              Full Stack Developer!
            </span>
          </motion.h3>

          <motion.p
            variants={itemVariants}
            className='text-base md:text-lg text-gray-600 dark:text-slate-400 max-w-xl mx-auto md:mx-0 mb-10 leading-relaxed'>
            {PERSONAL_INFO.bio}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className='flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4'>
            <motion.a
              href={`#${SectionID.PROJECTS}`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              className='inline-flex items-center justify-center px-6 py-3 text-base font-bold text-white bg-emerald-600 rounded-md hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 transition-all shadow-lg'>
              View Projects
            </motion.a>
            <motion.a
              href={`#${SectionID.CONTACT}`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              className='inline-flex items-center justify-center px-6 py-3 text-base font-bold text-emerald-600 bg-transparent border border-emerald-600/50 rounded-md transition-all hover:bg-emerald-600/10 dark:text-emerald-400 dark:border-emerald-400/50 dark:hover:bg-emerald-400/10'>
              Contact Me
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.a
        href={`#${SectionID.ABOUT}`}
        className='absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-gray-600 dark:text-slate-400'
        aria-label='Scroll to about section'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown size={32} />
        </motion.div>
      </motion.a>
    </section>
  );
};

export default Hero;
