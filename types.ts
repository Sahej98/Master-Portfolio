

export interface Skill {
  name: string;
  icon: React.ReactNode;
  category: 'Languages & Frameworks' | 'Styling & Design' | 'Tools & Platforms';
}

export interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
  repoUrl: string;
}

export enum SectionID {
    HERO = 'home',
    ABOUT = 'about',
    SKILLS = 'skills',
    PROJECTS = 'projects',
    CONTACT = 'contact',
}