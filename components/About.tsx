


import { motion, Variants } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';
import { SectionID } from '../types';

export default function About() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'tween', duration: 0.5, ease: 'easeOut'}},
  };

  const highlightCardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  }

  return (
    <motion.section 
        id={SectionID.ABOUT} 
        className='py-20 md:py-32'
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <motion.div 
              className='text-center mb-16'
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8 }}
          >
              <h2 className='text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight'>
                  About Me
              </h2>
              <p className='text-lg text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto'>
                  A brief look into my background and what drives me.
              </p>
              <div className="w-24 h-1 bg-emerald-500/50 dark:bg-emerald-400/50 mx-auto mt-6 rounded-full"></div>
          </motion.div>

          <motion.div 
            className='grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start'
            variants={containerVariants}
          >
              {/* Left Column: Main Description */}
              <motion.div
                variants={itemVariants}
              >
                  <p className='p-5 text-gray-700 dark:text-gray-300 text-lg leading-relaxed text-justify'>
                      {PERSONAL_INFO.about}
                  </p>
              </motion.div>
              
              {/* Right Column: Highlights */}
              <motion.div 
                  variants={containerVariants}
              >
                  <motion.h3 
                      variants={itemVariants}
                      className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6"
                  >
                      What I Bring to the Table
                  </motion.h3>

                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                    {PERSONAL_INFO.highlights.map((highlight, index) => {
                        const [title, description] = highlight.split(': ');
                        return (
                          <motion.div
                              key={index}
                              variants={highlightCardVariants}
                              className='flex flex-col gap-4 p-5 rounded-lg bg-white/50 dark:bg-slate-800/60 border border-emerald-500/10 dark:border-slate-700/50'
                          >
                              <div className="flex items-center gap-3">
                                <CheckCircle2 className='text-emerald-500 dark:text-emerald-400 w-7 h-7 flex-shrink-0' />
                                <h4 className='font-bold text-gray-800 dark:text-gray-200 text-lg'>{title}</h4>
                              </div>
                              <p className='text-gray-600 dark:text-gray-400 text-sm'>{description}</p>
                          </motion.div>
                        );
                    })}
                  </div>
              </motion.div>
          </motion.div>
      </div>
    </motion.section>
  );
}