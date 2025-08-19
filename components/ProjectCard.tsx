import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { Project } from '../types';

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 50, damping: 20 },
  },
};

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <motion.div
      variants={cardVariants}
      className='bg-white/40 dark:bg-slate-800/60 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl flex flex-col h-full border border-slate-200/80 dark:border-slate-700/50 transition-all duration-300 hover:-translate-y-2'>
      <a
        href={project.liveUrl}
        target='_blank'
        rel='noopener noreferrer'
        className='block overflow-hidden'>
        <img
          className='w-full h-48 object-cover transition-transform duration-500 ease-in-out hover:scale-110'
          src={project.image}
          alt={project.title}
        />
      </a>

      <div className='p-6 flex flex-col flex-grow'>
        <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-2'>
          {project.title}
        </h3>
        <p className='text-gray-600 dark:text-slate-300 text-sm leading-relaxed mb-4 flex-grow'>
          {project.description}
        </p>

        <div className='flex flex-wrap gap-2 mb-5'>
          {project.tags.map((tag) => (
            <span
              key={tag}
              className='bg-emerald-100/80 text-emerald-900 dark:bg-slate-700 dark:text-slate-200 text-xs font-semibold px-2.5 py-1 rounded-full'>
              {tag}
            </span>
          ))}
        </div>

        <div className='flex items-center gap-x-5 mt-auto pt-4 border-t border-slate-200 dark:border-slate-700'>
          <a
            href={project.repoUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-2 text-gray-600 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors duration-300 font-medium text-sm'
            aria-label='GitHub Repository'>
            <Github className='h-5 w-5' />
            <span>Source</span>
          </a>
          <a
            href={project.liveUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-2 text-gray-600 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors duration-300 font-medium text-sm'
            aria-label='Live Demo'>
            <ExternalLink className='h-5 w-5' />
            <span>Demo</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
