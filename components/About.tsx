import React from 'react';
import { motion } from 'framer-motion';
import { Layers, FileCode2, BrainCircuit, Goal } from 'lucide-react';
import { PERSONAL_INFO, CORE_PHILOSOPHY } from '../constants';
import { SectionID } from '../types';

const philosophyIcons = [
  <Layers size={36} className='text-emerald-500 dark:text-emerald-400' />,
  <FileCode2 size={36} className='text-emerald-500 dark:text-emerald-400' />,
  <BrainCircuit size={36} className='text-emerald-500 dark:text-emerald-400' />,
  <Goal size={36} className='text-emerald-500 dark:text-emerald-400' />,
];

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function About() {
  return (
    <motion.section
      id={SectionID.ABOUT}
      className='py-16 md:py-24'
      variants={sectionVariants}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.2 }}>
      <div className='max-w-7xl mx-auto px-4'>
        {/* Header */}
        <motion.div variants={itemVariants} className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight'>
            About Me
          </h2>
          <p className='text-lg text-gray-600 dark:text-gray-400 mt-4 max-w-3xl mx-auto'>
            My journey in technology is driven by a passion for building things
            that matter. Here's a glimpse into my approach and what I value.
          </p>
          <div className='w-24 h-1 bg-emerald-500/50 dark:bg-emerald-400/50 mx-auto mt-6 rounded-full'></div>
        </motion.div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center'>
          {/* Left side: About paragraph in a card */}
          <motion.div
            variants={itemVariants}
            className='bg-white/30 dark:bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 md:p-10 border border-slate-200/80 dark:border-slate-700/50'>
            <h3 className='text-2xl font-bold text-gray-800 dark:text-white mb-4'>
              My Story
            </h3>
            <p className='text-gray-600 dark:text-slate-400 leading-relaxed'>
              {PERSONAL_INFO.about}
            </p>
          </motion.div>

          {/* Right side: Core philosophies */}
          <motion.div
            variants={sectionVariants} // Using sectionVariants for staggering
            className='space-y-4'>
            {CORE_PHILOSOPHY.map((philosophy, index) => (
              <motion.div
                key={philosophy.title}
                variants={itemVariants}
                className='flex items-start gap-5 p-4 rounded-xl transition-colors duration-300 hover:bg-white/40 dark:hover:bg-slate-800/70'>
                <div className='flex-shrink-0 w-16 h-16 bg-white/50 dark:bg-slate-800/60 backdrop-blur-lg rounded-xl flex items-center justify-center border border-slate-200/80 dark:border-slate-700/50'>
                  {philosophyIcons[index]}
                </div>
                <div>
                  <h4 className='font-bold text-xl text-gray-800 dark:text-white mb-1'>
                    {philosophy.title}
                  </h4>
                  <p className='text-gray-600 dark:text-slate-400'>
                    {philosophy.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
