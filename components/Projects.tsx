import React from 'react';
import { motion } from 'framer-motion';
import { PROJECTS_LIST } from '../constants';
import { SectionID } from '../types';
import ProjectCard from './ProjectCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const Projects = () => {
  return (
    <motion.section
      id={SectionID.PROJECTS}
      className='py-20 md:py-32'
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.05 }}>
      <div className='max-w-7xl mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8 }}
          className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight'>
            Featured Projects
          </h2>
          <p className='text-lg text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto'>
            A selection of my work. See something you like? Let's talk.
          </p>
          <div className='w-24 h-1 bg-emerald-500/50 dark:bg-emerald-400/50 mx-auto mt-6 rounded-full'></div>
        </motion.div>

        <motion.div
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
          variants={containerVariants}>
          {PROJECTS_LIST.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Projects;
