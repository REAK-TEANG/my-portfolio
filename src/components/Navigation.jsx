import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useScrollToSection from '../utils/useScrollToSection';
import { Smiley, LinkedinLogo, InstagramLogo, BehanceLogo, List, X } from '@phosphor-icons/react';

const navLinks = [
  { name: 'HOME', id: 'home' },
  { name: 'ABOUT', id: 'about' },
  { name: 'KAIRO', id: 'projects' },
  { name: 'GRAPHICS', id: 'graphics' },
  { name: 'PLAYGROUND', id: 'playground' },
];

const socials = [
  { href: 'https://www.linkedin.com/in/teang-arpireak-569962289', Icon: LinkedinLogo, bg: 'bg-accent-yellow', label: 'LinkedIn' },
  { href: 'https://www.behance.net/teangarpiraek', Icon: BehanceLogo, bg: 'bg-accent-pink', label: 'Behance' },
  { href: 'https://www.instagram.com/p.reak_10/', Icon: InstagramLogo, bg: 'bg-accent-green', label: 'Instagram' },
];

export default function Navigation() {
  const [active, setActive] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const scrollToSection = useScrollToSection();

  useEffect(() => {
    const sections = ['home', 'about', 'projects', 'graphics', 'playground', 'contact', 'footer'];

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // the footer belongs to the "contact" area
          setActive(entry.target.id === 'footer' ? 'contact' : entry.target.id);
        }
      });
    }, { rootMargin: '-40% 0px -60% 0px' });

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const go = (id) => {
    setMenuOpen(false);
    if (id === 'about') {
      navigate('/about'); // the full journal lives on its own page
      return;
    }
    setActive(id);
    scrollToSection(id);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.5 }}
      className="fixed top-0 left-0 w-full bg-paper/90 backdrop-blur-sm z-40 border-b-2 border-ink border-dashed"
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2 group cursor-pointer" onClick={() => go('home')}>
          <div className="w-10 h-10 bg-accent-pink rounded-full flex items-center justify-center border-2 border-ink transform group-hover:scale-110 transition-transform">
            <Smiley size={24} className="text-ink" weight="bold" />
          </div>
          <span className="font-display text-xl tracking-tighter">TA.</span>
        </div>

        {/* Center Links (desktop) */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => go(link.id)}
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

        {/* Socials & Contact (desktop) */}
        <div className="hidden lg:flex items-center gap-3">
          {socials.map(({ href, Icon, bg, label }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className={`w-8 h-8 rounded-full ${bg} border-2 border-ink flex items-center justify-center hover:-translate-y-1 transition-transform`}>
              <Icon size={16} weight="bold" />
            </a>
          ))}
          <button
            onClick={() => go('contact')}
            className="ml-4 px-6 py-2 bg-ink text-white font-mono font-bold uppercase rounded-sm hover:bg-ink/80 transition-colors"
          >
            CONTACT
          </button>
        </div>

        {/* Hamburger (mobile) */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          className="lg:hidden w-11 h-11 bg-accent-yellow border-2 border-ink flex items-center justify-center shadow-[3px_3px_0_0_#2b2a29] active:shadow-none active:translate-x-0.5 active:translate-y-0.5"
        >
          {menuOpen ? <X size={24} weight="bold" /> : <List size={24} weight="bold" />}
        </button>
      </div>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden border-t-2 border-ink border-dashed bg-paper"
          >
            <div className="px-4 py-5 flex flex-col gap-3">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => go(link.id)}
                  className={`text-left px-4 py-3 border-2 border-ink font-display text-2xl shadow-[4px_4px_0_0_#2b2a29] ${active === link.id ? 'bg-accent-yellow' : 'bg-white'}`}
                >
                  {link.name}
                </motion.button>
              ))}
              <button
                onClick={() => go('contact')}
                className="px-4 py-3 bg-ink text-white font-display text-2xl border-2 border-ink shadow-[4px_4px_0_0_#f783ac]"
              >
                CONTACT
              </button>
              <div className="flex items-center gap-3 pt-2">
                {socials.map(({ href, Icon, bg, label }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className={`w-11 h-11 rounded-full ${bg} border-2 border-ink flex items-center justify-center shadow-[3px_3px_0_0_#2b2a29]`}>
                    <Icon size={22} weight="bold" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
