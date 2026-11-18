import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';

export default function Hero({ globalDelay = 0 }) {
  const heroRef = useRef(null);
  
  // Setup scroll progress for parallax
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacityText = useTransform(scrollY, [0, 500], [1, 0]);
  const yAvatars1 = useTransform(scrollY, [0, 1000], [0, -300]);
  const yAvatars2 = useTransform(scrollY, [0, 1000], [0, -500]);

  // GSAP Refs
  const badge1Ref = useRef(null);
  const badge2Ref = useRef(null);
  const avatar1Ref = useRef(null);
  const avatar2Ref = useRef(null);

  // GSAP Mouse Parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      const moveX = (clientX - centerX) / 50;
      const moveY = (clientY - centerY) / 50;

      if (badge1Ref.current) gsap.to(badge1Ref.current, { x: moveX * 2, y: moveY * 2, duration: 1, ease: 'power2.out' });
      if (badge2Ref.current) gsap.to(badge2Ref.current, { x: moveX * -1.5, y: moveY * -1.5, duration: 1, ease: 'power2.out' });
      if (avatar1Ref.current) gsap.to(avatar1Ref.current, { x: moveX * 3, y: moveY * 3, duration: 1, ease: 'power2.out' });
      if (avatar2Ref.current) gsap.to(avatar2Ref.current, { x: moveX * -2, y: moveY * -2, duration: 1, ease: 'power2.out' });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // GSAP Jittery Typography
  const handleLetterHover = (e) => {
    const colors = ['#f783ac', '#fadb5f', '#8ce99a', '#74c0fc'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const el = e.currentTarget;
    
    gsap.to(el, {
      y: -20,
      rotation: (Math.random() - 0.5) * 30,
      color: randomColor,
      duration: 0.2,
      ease: 'back.out(3)',
      onComplete: () => {
        gsap.to(el, {
          y: 0,
          rotation: 0,
          color: '#2b2a29', // return to ink
          duration: 0.5,
          ease: 'elastic.out(1, 0.3)',
          delay: 0.1
        });
      }
    });
  };

  // Staggered text animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 + globalDelay }
    }
  };

  const child = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 12, stiffness: 100 } }
  };

  const svgDraw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1, 
      transition: { duration: 1.5, ease: "easeInOut", delay: 0.5 + globalDelay }
    }
  };

  return (
    <section id="home" ref={heroRef} className="h-screen flex flex-col items-center justify-center relative px-4">
      
      {/* Parallax Container for Main Content */}
      <motion.div style={{ y: yText, opacity: opacityText }} className="w-full flex flex-col items-center justify-center z-10 will-change-transform">
        
        {/* Top Floating Badges */}
        <div className="absolute top-24 left-[15%] hidden lg:block tape-effect" ref={badge1Ref}>
          <motion.div 
            initial={{ rotate: -20, scale: 0 }}
            animate={{ rotate: -12, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 + globalDelay }}
            className="bg-accent-green px-4 py-2 font-handwriting text-2xl font-bold border-2 border-ink shadow-[4px_4px_0_0_#2b2a29]"
          >
            DESIGN WITH PURPOSE
          </motion.div>
        </div>

        <div className="absolute top-16 right-[15%] hidden lg:block tape-effect" ref={badge2Ref}>
          <motion.div 
            initial={{ rotate: 20, scale: 0 }}
            animate={{ rotate: 8, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.4 + globalDelay }}
            className="bg-accent-yellow px-4 py-2 font-handwriting text-2xl font-bold border-2 border-ink shadow-[4px_4px_0_0_#2b2a29]"
          >
            SWEAT THE DETAILS
          </motion.div>
        </div>

        {/* Main Name Area */}
        <div className="relative mt-12 md:mt-16">
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 + globalDelay }}
            className="font-handwriting text-3xl text-center mb-2"
          >
            my name is
          </motion.p>
          
          {/* Hand-drawn box around name */}
          <div className="relative inline-block">
            <svg className="absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)] text-accent-pink -z-10" viewBox="0 0 400 150" preserveAspectRatio="none">
              <motion.path 
                variants={svgDraw}
                initial="hidden"
                animate="visible"
                d="M10,20 Q200,5 390,15 Q395,75 385,135 Q200,145 15,130 Q5,75 10,20 Z" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="4" 
                className="path-draw"
              />
            </svg>
            
            <motion.h1 
              variants={container}
              initial="hidden"
              animate="visible"
              className="font-display text-6xl md:text-8xl lg:text-9xl text-ink tracking-tight uppercase flex"
            >
              {['P', 'H', 'I', 'R', 'E', 'A', 'K'].map((letter, index) => (
                <motion.span key={index} variants={child} className="inline-block mx-1">
                  <span 
                    className="inline-block cursor-default"
                    onMouseEnter={handleLetterHover}
                  >
                    {letter}
                  </span>
                </motion.span>
              ))}
            </motion.h1>
          </div>
        </div>

        {/* Role and Location with hand-drawn arrows */}
        <div className="w-full max-w-3xl mx-auto flex flex-col md:flex-row justify-between items-center mt-12 relative z-20">
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", delay: 0.8 + globalDelay }}
            className="flex items-center gap-2 relative"
          >
            {/* Arrow SVG pointing from right to left */}
            <svg className="hidden md:block absolute -top-8 -right-8 w-12 h-12 text-ink" viewBox="0 0 50 50">
              <motion.path variants={svgDraw} initial="hidden" animate="visible" d="M40 10 Q25 25 10 40 M10 40 L25 40 M10 40 L10 25" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="bg-accent-yellow px-3 py-1 font-handwriting text-xl border-2 border-ink transform -rotate-3 shadow-[2px_2px_0_0_#2b2a29] hover:rotate-0 transition-transform cursor-default">
              Graphic Designer & UI/UX Designer
            </div>
          </motion.div>

          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", delay: 1 + globalDelay }}
            className="mt-4 md:mt-0 flex items-center gap-2 relative"
          >
             {/* Arrow SVG pointing from left to right */}
             <svg className="hidden md:block absolute -top-8 -left-8 w-12 h-12 text-ink" viewBox="0 0 50 50">
              <motion.path variants={svgDraw} initial="hidden" animate="visible" d="M10 10 Q25 25 40 40 M40 40 L25 40 M40 40 L40 25" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="bg-accent-green px-3 py-1 font-handwriting text-xl border-2 border-ink transform rotate-2 shadow-[2px_2px_0_0_#2b2a29] hover:rotate-0 transition-transform cursor-default">
              Siem Reap, Cambodia
            </div>
          </motion.div>
        </div>

        {/* Availability Status */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 + globalDelay }}
          className="mt-16 flex items-center justify-center gap-2 font-mono text-xs font-bold uppercase tracking-widest"
        >
          <div className="w-3 h-3 bg-accent-blue rounded-full animate-pulse border border-ink"></div>
          <span>OPEN TO NEW OPPORTUNITIES</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h2 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 + globalDelay }}
          className="mt-12 text-3xl md:text-5xl lg:text-5xl font-bold font-sans text-center max-w-4xl mx-auto leading-tight px-4"
        >
          I turn complex ideas into simple, thoughtful digital experiences.
          <motion.span 
            animate={{ rotate: 360 }} 
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            className="text-accent-pink ml-2 inline-block origin-center"
          >
            ✿
          </motion.span>
        </motion.h2>
      </motion.div>

      {/* Floating Avatars with Parallax */}
      <div className="absolute bottom-20 left-[10%] hidden md:block z-0 will-change-transform" ref={avatar1Ref}>
        <motion.div style={{ y: yAvatars1 }}>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.6 + globalDelay, type: "spring" }}>
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="w-24 h-24 rounded-full overflow-hidden border-4 border-accent-pink shadow-[4px_4px_0_0_#2b2a29]">
              <img src="/photo-2.jpg" alt="Teang Arpireak - 1" className="w-full h-full object-cover" loading="lazy" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute top-1/2 right-[10%] hidden md:block z-0 will-change-transform" ref={avatar2Ref}>
        <motion.div style={{ y: yAvatars2 }}>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.8 + globalDelay, type: "spring" }}>
            <motion.div animate={{ y: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} className="w-32 h-32 rounded-full overflow-hidden border-4 border-accent-yellow shadow-[4px_4px_0_0_#2b2a29]">
              <img src="/photo-3.jpg" alt="Teang Arpireak - 2" className="w-full h-full object-cover" loading="lazy" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
}
