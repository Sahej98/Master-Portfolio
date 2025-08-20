import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { Project } from '../types';

const ProjectItem = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  const isReversed = index % 2 !== 0;

  const imageVariants: Variants = {
    offscreen: { opacity: 0, x: isReversed ? 100 : -100 },
    onscreen: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 50 },
    },
  };

  const textVariants: Variants = {
    offscreen: { opacity: 0, x: isReversed ? -100 : 100 },
    onscreen: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 50, delay: 0.2 },
    },
  };

  return (
    <motion.div
      className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-center'
      initial='offscreen'
      whileInView='onscreen'
      viewport={{ once: true, amount: 0.3 }}>
      {/* Image Section */}
      <motion.div
        variants={imageVariants}
        className={`lg:col-span-7 rounded-xl overflow-hidden ${
          isReversed ? 'lg:order-last' : ''
        }`}>
        <a
          href={project.liveUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='block group'
          aria-label={`Live demo for ${project.title}`}>
          <div className='aspect-video overflow-hidden rounded-lg border border-slate-200/50 dark:border-slate-800/50 shadow-2xl shadow-slate-400/20 dark:shadow-black/30'>
            <img
              src={project.image}
              alt={`Screenshot of ${project.title}`}
              className='w-full h-full object-cover object-center transition-transform duration-500 ease-in-out group-hover:scale-105'
            />
          </div>
        </a>
      </motion.div>

      {/* Text Content Section */}
      <motion.div variants={textVariants} className='lg:col-span-5'>
        <div
          className={`flex flex-col ${
            isReversed ? 'lg:items-start' : 'lg:items-end'
          }`}>
          <div
            className={`w-full ${
              isReversed ? 'lg:text-left' : 'lg:text-right'
            }`}>
            <p className='text-sm font-bold text-emerald-500 dark:text-emerald-400 mb-1'>
              Featured Project
            </p>
            <h3 className='text-2xl lg:text-3xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight'>
              {project.title}
            </h3>
          </div>

          <div className='bg-white/30 dark:bg-slate-800/50 backdrop-blur-xl rounded-lg p-5 shadow-md border border-slate-200/80 dark:border-slate-700/50 my-4'>
            <p className='text-gray-600 dark:text-slate-400 leading-relaxed text-sm'>
              {project.description}
            </p>
          </div>

          <ul
            className={`flex flex-wrap gap-2 mb-6 ${
              isReversed ? 'lg:justify-start' : 'lg:justify-end'
            }`}>
            {project.tags.map((tag) => (
              <li
                key={tag}
                className='bg-emerald-100/80 text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-200 text-xs font-semibold px-3 py-1.5 rounded-full'>
                {tag}
              </li>
            ))}
          </ul>

          <div className='flex items-center gap-4'>
            <motion.a
              href={project.repoUrl}
              whileHover={{ scale: 1.15, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={`GitHub Repository for ${project.title}`}
              className='p-2 text-slate-600 dark:text-slate-300 rounded-full hover:bg-slate-200/60 dark:hover:bg-slate-700/60 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors duration-200'>
              <Github className='h-6 w-6' />
            </motion.a>
            <motion.a
              href={project.liveUrl}
              whileHover={{ scale: 1.15, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={`Live Demo for ${project.title}`}
              className='p-2 text-slate-600 dark:text-slate-300 rounded-full hover:bg-slate-200/60 dark:hover:bg-slate-700/60 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors duration-200'>
              <ExternalLink className='h-6 w-6' />
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectItem;
