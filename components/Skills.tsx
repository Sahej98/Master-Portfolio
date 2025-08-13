import React from 'react';
import { motion, Variants } from 'framer-motion';
import { SKILLS_LIST } from '../constants';
import { SectionID } from '../types';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const skillItemVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 100, damping: 12 },
  },
};

const Skills = () => {
  return (
    <section id={SectionID.SKILLS} className='py-20 md:py-32 relative z-10'>
      <div className='max-w-7xl mx-auto px-4'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight mb-4'>
            My Technical Toolkit
          </h2>
          <p className='text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
            A collection of the primary technologies and tools I use to bring
            ideas to life.
          </p>
        </motion.div>

        <motion.div
          className='flex flex-wrap justify-center gap-6'
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.1 }}>
          {SKILLS_LIST.map((skill) => (
            <motion.div
              key={skill.name}
              title={skill.name}
              variants={skillItemVariants}
              whileHover={{
                scale: 1.05,
                y: -5,
                boxShadow: '0 0 25px rgba(16, 185, 129, 0.6)',
                borderColor: 'rgba(16, 185, 129, 0.7)',
              }}
              transition={{ type: 'spring', stiffness: 300 }}
              className='flex items-center gap-4 p-4 rounded-xl bg-white/40 dark:bg-slate-800/50 backdrop-blur-md border border-slate-300/20 dark:border-slate-700/50 cursor-pointer'>
              <div className='w-8 h-8 text-emerald-500 dark:text-emerald-400'>
                {React.createElement(skill.icon.type, {
                  size: 32,
                  strokeWidth: 1.5,
                })}
              </div>
              <span className='font-semibold text-base text-gray-700 dark:text-gray-200'>
                {skill.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
