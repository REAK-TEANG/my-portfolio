import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Smiley, LinkedinLogo, InstagramLogo, BehanceLogo } from '@phosphor-icons/react';

const navLinks = [
  { name: 'HOME', id: 'home' },
  { name: 'ABOUT', id: 'about' },
  { name: 'KAIRO', id: 'projects' },
  { name: 'GRAPHICS', id: 'graphics' },
  { name: 'PLAYGROUND', id: 'playground' },
];

export default function Navigation() {
  const [active, setActive] = useState('home');
  const navigate = useNavigate();

  useEffect(() => {
    const sections = ['home', 'about', 'projects', 'graphics', 'playground', 'contact'];
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    }, { rootMargin: '-40% 0px -60% 0px' });

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.5 }}
      className="fixed top-0 left-0 w-full bg-paper/90 backdrop-blur-sm z-40 border-b-2 border-ink border-dashed"
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2 group cursor-pointer" onClick={() => {
          document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
          setActive('home');
        }}>
          <div className="w-10 h-10 bg-accent-pink rounded-full flex items-center justify-center border-2 border-ink transform group-hover:scale-110 transition-transform">
            <Smiley size={24} className="text-ink" weight="bold" />
          </div>
          <span className="font-display text-xl tracking-tighter">TA.</span>
        </div>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                if (link.id === 'about') {
                  navigate('/about'); // the full journal lives on its own page
                  return;
                }
                setActive(link.id);
                document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="relative px-4 py-2 font-mono text-sm font-bold uppercase"
            >
              {active === link.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-accent-yellow border-2 border-ink"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  style={{ borderRadius: '4px' }}
                />
              )}
              <span className="relative z-10">{link.name}</span>
            </button>
          ))}
        </div>

        {/* Social Links & Contact */}
        <div className="flex items-center gap-3">
          <a href="https://www.linkedin.com/in/teang-arpireak-569962289" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-accent-yellow border-2 border-ink flex items-center justify-center hover:-translate-y-1 transition-transform">
            <LinkedinLogo size={16} weight="bold" />
          </a>
          <a href="https://www.behance.net/teangarpiraek" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-accent-pink border-2 border-ink flex items-center justify-center hover:-translate-y-1 transition-transform">
            <BehanceLogo size={16} weight="bold" />
          </a>
          <a href="https://www.instagram.com/p.reak_10/" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-accent-green border-2 border-ink flex items-center justify-center hover:-translate-y-1 transition-transform">
            <InstagramLogo size={16} weight="bold" />
          </a>
          
          <button 
            onClick={() => {
              setActive('contact');
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="ml-4 px-6 py-2 bg-ink text-white font-mono font-bold uppercase rounded-sm hover:bg-ink/80 transition-colors"
          >
            CONTACT
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
