import React from 'react';
import { Menu, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { NAVIGATION_LINKS, PERSONAL_INFO } from '../constants';
import { SectionID } from '../types';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';

interface NavbarProps {
  activeSection: string;
  hasScrolled: boolean;
}

const NavLinks = ({ activeSection }: { activeSection: string }) => (
  <>
    {NAVIGATION_LINKS.map((link) => (
      <motion.li key={link.name} className='relative'>
        <a
          href={link.href}
          className={`block py-2 px-3 rounded md:p-0 transition-colors duration-300 text-sm font-medium ${
            activeSection === link.href.substring(1)
              ? 'text-gray-900 dark:text-white'
              : 'text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white'
          }`}>
          {link.name}
        </a>
        {activeSection === link.href.substring(1) && (
          <motion.span
            className='absolute -bottom-1 left-0 right-0 h-0.5 bg-emerald-500 dark:bg-emerald-400 rounded-full'
            layoutId='underline'
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          />
        )}
      </motion.li>
    ))}
  </>
);


const Navbar = ({ activeSection, hasScrolled }: NavbarProps) => {
  return (
    <nav
      className={`hidden md:flex fixed w-full z-30 top-0 start-0 transition-all duration-300 ${
        hasScrolled
          ? 'bg-white/70 shadow-md dark:bg-slate-900/70 backdrop-blur-lg border-b border-gray-200/50 dark:border-slate-800/50'
          : 'bg-transparent'
      }`}>
      <div className='max-w-screen-xl flex items-center mx-auto p-4 w-full'>
        {/* Left: Logo */}
        <div className='flex-1 flex justify-start'>
          <Logo />
        </div>

        {/* Center: Nav Links (Desktop) */}
        <div className='flex-none justify-center'>
          <ul className='flex items-center space-x-10 font-medium'>
            <NavLinks activeSection={activeSection} />
          </ul>
        </div>

        {/* Right: Actions */}
        <div className='flex-1 flex justify-end items-center gap-4'>
            <a
              href={PERSONAL_INFO.resumeUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-600/50 dark:border-emerald-400/50 px-4 py-2 rounded-lg hover:bg-emerald-600/10 dark:hover:bg-emerald-400/10 transition-colors duration-300'>
              <FileText size={16} />
              Resume
            </a>
            <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;