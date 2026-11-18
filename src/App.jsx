import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import Navigation from './components/Navigation';
import Preloader from './components/Preloader';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import GraphicWorks from './components/GraphicWorks';
import Playground from './components/Playground';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import ProjectDetail from './pages/ProjectDetail';
import AboutPage from './pages/AboutPage';

function HomePage() {
  const { hash } = useLocation();

  // Support links like "/#projects" coming from other pages
  useEffect(() => {
    if (!hash) return;
    const t = setTimeout(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' });
    }, 2900); // wait for the preloader
    return () => clearTimeout(t);
  }, [hash]);

  return (
    <div className="relative w-full min-h-screen">
      <Preloader />
      <Navigation />
      <main>
        {/* Pinned Hero Section that the rest of the page scrolls over */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <Hero globalDelay={2.5} />
        </div>
        
        {/* The rest of the content scrolls over the pinned hero */}
        <div className="relative z-10 bg-paper bg-ruled-paper bg-ruled rounded-t-[3rem] shadow-[0_-20px_50px_-15px_rgba(0,0,0,0.1)] border-t-4 border-ink">
          <About />
          <Projects />
          <GraphicWorks />
          <Playground />
          <Contact />
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <ReactLenis root>
      <CustomCursor />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
      </Routes>
    </ReactLenis>
  );
}

export default App;
