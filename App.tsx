import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useTheme } from './contexts/ThemeContext';
import CloudySkyBackground from './components/CloudySkyBackground';
import CosmosBackground from './components/CosmosBackground';

const App = () => {
  const { theme } = useTheme();

  return (
    <>
      {theme === 'light' ? <CloudySkyBackground /> : <CosmosBackground />}
      <div className='relative z-10'>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default App;
