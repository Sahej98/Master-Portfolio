import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';
import { SectionID } from '../types';

const Hero = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  return (
    <section
      id={SectionID.HERO}
      className='relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden py-24 px-4'>
      <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center'>
        {/* Left Column: Text Content */}
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate='visible'
          className='relative z-10 text-center md:text-left order-2 md:order-1'>
          <motion.h2
            variants={itemVariants}
            className='mb-2 text-lg font-medium text-gray-800 dark:text-gray-300'>
            Hello, I'm
          </motion.h2>

          <motion.h1
            variants={itemVariants}
            className='mb-3 text-5xl font-black text-gray-900 dark:text-white sm:text-6xl md:text-7xl'>
            {PERSONAL_INFO.name}
          </motion.h1>

          <motion.h3
            variants={itemVariants}
            className='mb-8 text-xl font-semibold text-gray-700 dark:text-slate-300 md:text-2xl'>
            And I'm a{' '}
            <span className='font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500'>
              Full Stack Developer
            </span>
          </motion.h3>

          <motion.p
            variants={itemVariants}
            className='mb-10 max-w-xl text-base leading-relaxed text-gray-600 dark:text-slate-400 md:text-lg mx-auto md:mx-0'>
            {PERSONAL_INFO.bio}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className='flex flex-col items-center justify-center gap-4 sm:flex-row md:justify-start'>
            <motion.a
              href={`#${SectionID.PROJECTS}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='group inline-flex w-full sm:w-auto items-center justify-center rounded-md bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3 text-base font-bold text-white shadow-lg transition-all'>
              View Projects
              <ArrowRight className='ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1' />
            </motion.a>
            <motion.a
              href={`#${SectionID.CONTACT}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='inline-flex w-full sm:w-auto items-center justify-center rounded-md border border-emerald-600/50 bg-transparent px-6 py-3 text-base font-bold text-emerald-600 transition-all hover:bg-emerald-600/10 dark:border-emerald-400/50 dark:text-emerald-400 dark:hover:bg-emerald-400/10'>
              Contact Me
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right Column: Profile Picture */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className='relative mx-auto w-52 h-52 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 order-1 md:order-2 mt-16 md:mt-0'>
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{
              duration: 4,
              ease: 'easeInOut',
              repeat: Infinity,
            }}
            className='relative w-full h-full'>
            {/* Background shapes */}
            <div className='absolute -top-4 -right-4 w-full h-full rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 transform rotate-6 z-0'></div>
            {/* Image */}
            <div className='relative h-full w-full rounded-2xl border-4 border-slate-200/50 p-1.5 shadow-xl dark:border-slate-800/50 bg-white/30 dark:bg-slate-900/30 backdrop-blur-sm'>
              <div className='h-full w-full overflow-hidden rounded-lg'>
                <img
                  src='/images.jpeg'
                  alt={`Headshot of ${PERSONAL_INFO.name}`}
                  className='h-full w-full object-cover object-center'
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
