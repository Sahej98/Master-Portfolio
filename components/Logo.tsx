import React from 'react';
import { SectionID } from '../types';

const Logo = () => (
  <a
    href={`#${SectionID.HERO}`}
    className='flex items-center space-x-2 rtl:space-x-reverse transition-transform duration-300 hover:scale-105'
    aria-label='Homepage'>
    <div className='font-extrabold text-2xl tracking-tighter text-gray-900 dark:text-white'>
      <span className='text-emerald-500 dark:text-emerald-400'>P</span>S
    </div>
  </a>
);

export default Logo;
