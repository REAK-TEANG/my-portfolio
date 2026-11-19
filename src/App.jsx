import { useEffect, useState, lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import { MotionConfig } from 'framer-motion';
import Navigation from './components/Navigation';
import Preloader from './components/Preloader';
import { hasSeenPreloader } from './utils/session';
import useScrollToSection from './utils/useScrollToSection';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import GraphicWorks from './components/GraphicWorks';
import Playground from './components/Playground';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Marquee from './components/Marquee';
import ScrollProgress from './components/ScrollProgress';
import ScrollSync from './components/ScrollSync';
import ScrollVelocityProvider from './components/ScrollVelocityProvider';
import CustomCursor from './components/CustomCursor';
import ScrollToTop from './components/ScrollToTop';
// Smooth-scroll feel: a lower lerp glides longer and softer than Lenis' default (0.1).
// Touch devices keep native scrolling. Defined outside the component so it stays stable.
const LENIS_OPTIONS = { lerp: 0.075, wheelMultiplier: 0.9 };

// Secondary pages load only when visited (keeps the first load fast)
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const AboutPage = lazy(() => import('./pages/AboutPage'));

function HomePage() {
  const { hash } = useLocation();
  // Intro delay: long if the loading screen will play, short if already seen this session
  const [introDelay] = useState(() => (hasSeenPreloader() ? 0.1 : 1.7));
  const scrollToSection = useScrollToSection();

  // Support links like "/#projects" coming from other pages
  useEffect(() => {
    if (!hash) return;
    const t = setTimeout(() => scrollToSection(hash.slice(1)), introDelay * 1000 + 700);
    return () => clearTimeout(t);
  }, [hash, introDelay, scrollToSection]);

  return (
    <div className="relative w-full min-h-svh">
      <Preloader />
      <Navigation />
      <main>
        {/* Pinned Hero Section that the rest of the content scrolls over */}
        <div className="sticky top-0 min-h-svh w-full overflow-hidden [@media(max-height:760px)]:static">
          <Hero globalDelay={introDelay} />
        </div>

        {/* The rest of the content scrolls over the pinned hero */}
        <div className="relative z-10 bg-paper bg-ruled-paper bg-ruled rounded-t-[3rem] shadow-[0_-20px_50px_-15px_rgba(0,0,0,0.1)] border-t-4 border-ink">
          <About />
          <Marquee items={['UI/UX Design', 'Branding', 'React', 'Posters', 'Siem Reap']} color="bg-accent-yellow" rotate={-1.5} />
          <Projects />
          <GraphicWorks />
          <Marquee items={['Play', 'Drag', 'Create', 'Repeat']} color="bg-accent-green" rotate={1.5} reverse />
          <Playground />
          <Contact />
          <Footer />
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <ReactLenis root options={LENIS_OPTIONS}>
      <ScrollSync />
      {/* Visitors who ask their device for less motion get calmer transform animations */}
      <MotionConfig reducedMotion="user">
        <ScrollVelocityProvider>
          <ScrollToTop />
          <ScrollProgress />
          <CustomCursor />
          <Suspense fallback={<div className="min-h-svh bg-paper" />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/project/:id" element={<ProjectDetail />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </ScrollVelocityProvider>
      </MotionConfig>
    </ReactLenis>
  );
}

export default App;
