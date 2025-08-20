import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import MobileNavbar from './components/MobileNavbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useTheme } from './contexts/ThemeContext';
import CloudySkyBackground from './components/CloudySkyBackground';
import CosmosBackground from './components/CosmosBackground';
import { SectionID } from './types';
import Preloader from './components/Preloader';

const App = () => {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState<string>(SectionID.HERO);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Prevent scrolling when loader is active
    document.body.style.overflow = 'hidden';

    const handleLoad = () => {
      setTimeout(() => {
        setIsLoading(false);
        document.body.style.overflow = ''; // Restore scroll
      }, 500); // Small delay for smoother transition
    };

    // Check if the page is already loaded
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      // Cleanup listener on component unmount
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
      const sections = Object.values(SectionID);
      // Use innerHeight / 2 for more accurate active section detection
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (
          element &&
          element.offsetTop <= scrollPosition &&
          element.offsetTop + element.offsetHeight > scrollPosition
        ) {
          setActiveSection(sectionId);
          break;
        }
      }
    };

    // Set passive to true for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check on load
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);

  return (
    <>
      <AnimatePresence>{isLoading && <Preloader />}</AnimatePresence>

      {!isLoading && (
        <div>
          {theme === 'light' ? <CloudySkyBackground /> : <CosmosBackground />}
          <Navbar hasScrolled={hasScrolled} activeSection={activeSection} />
          <MobileNavbar
            hasScrolled={hasScrolled}
            activeSection={activeSection}
          />
          <div className='relative z-10'>
            <main>
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Contact />
            </main>
            <Footer />
          </div>
        </div>
      )}
    </>
  );
};

export default App;
