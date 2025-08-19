import React from 'react';
import { Project, Skill, SectionID } from './types';
import {
  Code,
  Palette,
  DatabaseZap,
  Wind,
  GitMerge,
  Server,
  Smartphone,
  Rocket,
  Atom,
  Shield,
  Component,
  LayoutGrid,
  Network,
  Store,
  Type,
  Coffee,
  Binary,
  Flame,
  Triangle,
  CloudCog,
  Database,
} from 'lucide-react';

export const PERSONAL_INFO = {
  name: 'Prabhjot Singh',
  title: 'Full Stack Developer',
  bio: "A passionate Computer Science student who builds intuitive UIs, scalable backends, and enjoys solving real-world tech problems. Let's create something awesome together.",
  about:
    'I’m a Full-Stack Developer with a passion for building robust, user-friendly, and visually appealing web applications, specializing in both frontend and backend development by combining clean, modern design with efficient, scalable code. From creating responsive interfaces with React and Tailwind to designing powerful APIs and databases with Node.js, Express, and MongoDB, I strive to deliver complete solutions that work seamlessly. I love solving challenging problems, learning new technologies, and continuously improving my craft, viewing every project as an opportunity to experiment, innovate, and push the boundaries of what’s possible on the web. I focus on writing clean, maintainable code that not only works but is also easy to understand and extend, and beyond coding, I enjoy exploring emerging tech trends, contributing to side projects, and collaborating with others to turn ideas into reality.',
  email: 'sahejdhingra6@gmail.com',
  phone: '+91 98786 14598',
  location: 'Goraya - 144409, Punjab',
  resumeUrl: '/alex-doe-resume.pdf', // Placeholder link
};

export const CORE_PHILOSOPHY = [
  {
    title: 'End-to-End Development',
    description:
      'Proficient in building responsive frontends and robust backends for seamless user experiences.',
  },
  {
    title: 'Clean and Scalable Code',
    description:
      'Committed to writing maintainable, efficient code that forms a solid foundation for any project.',
  },
  {
    title: 'Strategic Problem-Solving',
    description:
      'Adept at debugging complex issues and architecting innovative solutions for technical challenges.',
  },
  {
    title: 'Proven Project Delivery',
    description:
      'Experienced in taking ideas from concept to a polished, functional product in agile environments.',
  },
];

// IMPORTANT: To enable the contact form, you must deploy a Google Apps Script
// and paste the Web App URL here.
// For a tutorial, search for "Google Sheets contact form".
export const GOOGLE_SHEET_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';

export const SOCIAL_LINKS = {
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  instagram: 'https://instagram.com',
  whatsapp: `https://wa.me/${PERSONAL_INFO.phone.replace(/[^0-9]/g, '')}`,
};

export const NAVIGATION_LINKS = [
  { name: 'Home', href: `#${SectionID.HERO}` },
  { name: 'About', href: `#${SectionID.ABOUT}` },
  { name: 'Skills', href: `#${SectionID.SKILLS}` },
  { name: 'Projects', href: `#${SectionID.PROJECTS}` },
  { name: 'Contact', href: `#${SectionID.CONTACT}` },
];

export const SKILLS_LIST: Skill[] = [
  {
    name: 'React',
    icon: Atom,
    category: 'Languages & Frameworks',
  },
  {
    name: 'Angular',
    icon: Shield,
    category: 'Languages & Frameworks',
  },
  {
    name: 'Next.js',
    icon: Rocket,
    category: 'Languages & Frameworks',
  },
  {
    name: 'Tailwind CSS',
    icon: Wind,
    category: 'Styling & Design',
  },
  {
    name: 'Bootstrap',
    icon: Component,
    category: 'Styling & Design',
  },
  {
    name: 'Figma',
    icon: Palette,
    category: 'Styling & Design',
  },
  {
    name: 'Wordpress',
    icon: LayoutGrid,
    category: 'Styling & Design',
  },
  {
    name: 'Flexi Funnel',
    icon: Network,
    category: 'Styling & Design',
  },
  {
    name: 'Shopify',
    icon: Store,
    category: 'Styling & Design',
  },
  {
    name: 'JavaScript',
    icon: Code,
    category: 'Languages & Frameworks',
  },
  {
    name: 'TypeScript',
    icon: Type,
    category: 'Languages & Frameworks',
  },
  {
    name: 'Java',
    icon: Coffee,
    category: 'Languages & Frameworks',
  },
  {
    name: 'Python',
    icon: Binary,
    category: 'Languages & Frameworks',
  },
  {
    name: 'Firebase',
    icon: Flame,
    category: 'Languages & Frameworks',
  },
  { name: 'Node.js', icon: Server, category: 'Backend' },
  {
    name: 'React Native',
    icon: Smartphone,
    category: 'Mobile',
  },
  {
    name: 'Git',
    icon: GitMerge,
    category: 'Tools & Platforms',
  },
  {
    name: 'Vercel',
    icon: Triangle,
    category: 'Tools & Platforms',
  },
  {
    name: 'Render',
    icon: CloudCog,
    category: 'Tools & Platforms',
  },
  {
    name: 'Mongodb',
    icon: DatabaseZap,
    category: 'Backend',
  },
  { name: 'SQL', icon: Database, category: 'Backend' },
];

export const PROJECTS_LIST: Project[] = [
  {
    title: 'Project Tracker',
    description:
      'A MERN stack project management app to track, organize, and update projects with a clean, intuitive interface. Features task management, progress tracking, and team collaboration.',
    image:
      'https://images.unsplash.com/photo-1555529771-835f59fc5efe?q=80&w=800&auto=format&fit=crop',
    tags: ['MongoDB', 'Express', 'React', 'Node.js', 'JavaScript'],
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    title: 'EcoSphere (Discord Clone)',
    description:
      'A real-time chat application built with Next.js and Firebase. Supports channels, direct messaging, and user authentication for seamless communication experiences.',
    image:
      'https://images.unsplash.com/photo-1581093588401-60c0d0c1b49f?q=80&w=800&auto=format&fit=crop',
    tags: ['Next.js', 'Firebase', 'React', 'Tailwind CSS', 'JavaScript'],
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    title: 'EmoGram (WhatsApp Clone Upgrade)',
    description:
      'An upgraded MERN stack messaging app with real-time chat, media sharing, and improved UI/UX, enhancing the standard WhatsApp clone experience.',
    image:
      'https://images.unsplash.com/photo-1601933474776-1a41dc6c9620?q=80&w=800&auto=format&fit=crop',
    tags: ['MongoDB', 'Express', 'React', 'Node.js', 'JavaScript'],
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    title: 'Tourispot (Tourism Website)',
    description:
      'A dynamic tourism platform built with MERN, showcasing destinations, travel guides, and booking options. Designed to enhance the user journey with interactive features.',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop',
    tags: ['MongoDB', 'Express', 'React', 'Node.js', 'JavaScript'],
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    title: 'Admit Letter (Study Visa Website)',
    description:
      'A study visa consultancy site built with FlexiFunnels, guiding users through visa application processes with professional layouts and conversion-focused design.',
    image:
      'https://images.unsplash.com/photo-1591696205602-6a55a18dca5f?q=80&w=800&auto=format&fit=crop',
    tags: ['FlexiFunnels', 'Web Design', 'UI/UX'],
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    title: 'Stenna (Wallpaper Selling Website)',
    description:
      'A Shopify-powered e-commerce site for selling wallpapers, featuring product catalogs, seamless shopping cart, and secure checkout for an optimal user experience.',
    image:
      'https://images.unsplash.com/photo-1581276879432-15a4a7d62c08?q=80&w=800&auto=format&fit=crop',
    tags: ['Shopify', 'E-commerce', 'Web Design'],
    liveUrl: '#',
    repoUrl: '#',
  },
];
