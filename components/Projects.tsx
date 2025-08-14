import React from 'react';
import { motion } from 'framer-motion';
import { PROJECTS_LIST } from '../constants';
import { SectionID } from '../types';
import ProjectItem from './ProjectItem';

const Projects = () => {
  return (
    <motion.section id={SectionID.PROJECTS} className='py-16 md:py-24'>
      <div className='max-w-7xl mx-auto px-4'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8 }}
          className='text-center mb-16 md:mb-20'>
          <h2 className='text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight'>
            Featured Projects
          </h2>
          <p className='text-lg text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto'>
            A selection of my work, from full-stack applications to specialized
            tools.
          </p>
          <div className='w-24 h-1 bg-emerald-500/50 dark:bg-emerald-400/50 mx-auto mt-6 rounded-full'></div>
        </motion.div>

        {/* New Alternating Layout */}
        <div className='space-y-20 md:space-y-28'>
          {PROJECTS_LIST.map((project, index) => (
            <ProjectItem key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Projects;
