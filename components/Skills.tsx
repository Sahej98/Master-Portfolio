import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { SKILLS_LIST } from '../constants';
import { SectionID, SkillCategory } from '../types';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const skillItemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 150, damping: 20 },
  },
};

const Skills = () => {
  const categories = useMemo(
    () =>
      [
        'Languages & Frameworks',
        'Styling & Design',
        'Backend',
        'Mobile',
        'Tools & Platforms',
      ] as SkillCategory[],
    []
  );

  const [activeCategory, setActiveCategory] = useState<SkillCategory>(
    categories[0]
  );

  const filteredSkills = useMemo(
    () => SKILLS_LIST.filter((skill) => skill.category === activeCategory),
    [activeCategory]
  );

  return (
    <section id={SectionID.SKILLS} className='py-16 md:py-24 relative z-10'>
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
            Select a category to see the technologies and tools I use to bring
            ideas to life.
          </p>
          <div className='w-24 h-1 bg-emerald-500/50 dark:bg-emerald-400/50 mx-auto mt-6 rounded-full'></div>
        </motion.div>

        {/* New Two-Panel Layout */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 min-h-[400px]'>
          {/* Left Panel: Category List */}
          <motion.div
            className='flex flex-row md:flex-col md:gap-2 -mx-4 px-4 md:mx-0 md:px-0 overflow-x-auto'
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}>
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative w-full text-left p-3 px-4 rounded-lg whitespace-nowrap transition-colors duration-300 group font-semibold ${
                  activeCategory === category
                    ? 'text-emerald-600 dark:text-emerald-300'
                    : 'text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-300 hover:bg-gray-200/50 dark:hover:bg-slate-800/50'
                }`}
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}>
                {activeCategory === category && (
                  <motion.div
                    className='absolute inset-0 bg-emerald-500/10 dark:bg-emerald-400/10 rounded-lg'
                    layoutId='active-category-highlight'
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  />
                )}
                <span className='relative z-10'>{category}</span>
              </motion.button>
            ))}
          </motion.div>

          {/* Right Panel: Skills Grid */}
          <div className='md:col-span-3'>
            <motion.div
              className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8'
              key={activeCategory}
              variants={containerVariants}
              initial='hidden'
              animate='visible'>
              {filteredSkills.map((skill) => (
                <motion.div
                  key={skill.name}
                  title={skill.name}
                  variants={skillItemVariants}
                  whileHover={{
                    scale: 1.05,
                    y: -8,
                    boxShadow:
                      '0 10px 20px rgba(0,0,0,0.1), 0 0 25px rgba(16, 185, 129, 0.4)',
                  }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className='flex flex-col items-center justify-center text-center gap-4 p-6 rounded-2xl bg-white/30 dark:bg-slate-800/50 backdrop-blur-xl border border-slate-300/20 dark:border-slate-700/50 cursor-default'>
                  <div className='w-14 h-14 text-emerald-500 dark:text-emerald-400 flex items-center justify-center'>
                    {React.createElement(skill.icon, {
                      size: 48,
                      strokeWidth: 1.5,
                    })}
                  </div>
                  <span className='font-semibold text-sm md:text-base text-gray-800 dark:text-gray-200'>
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
