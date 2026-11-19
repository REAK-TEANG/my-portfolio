import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { Star, Heart, Lightning, Flower, SoccerBall } from '@phosphor-icons/react';

const WORDS = ['designer', 'developer', 'football kid', 'problem solver'];
const NAME_LETTERS = ['P', 'H', 'I', 'R', 'E', 'A', 'K']; // all unique, so safe as keys

/** Types and deletes the words one by one. */
function Typewriter({ words = WORDS }) {
  // One state object so every transition happens inside a timer callback
  const [state, setState] = useState({ index: 0, text: '', deleting: false });

  useEffect(() => {
    const { index, text, deleting } = state;
    const word = words[index % words.length];
    let delay = deleting ? 45 : 90;
    let next;

    if (!deleting && text === word) {
      delay = 1400; // pause on the finished word
      next = { index, text, deleting: true };
    } else if (deleting && text === '') {
      delay = 250; // short beat before the next word
      next = { index: index + 1, text: '', deleting: false };
    } else {
      const nextText = deleting ? text.slice(0, -1) : word.slice(0, text.length + 1);
      next = { index, deleting, text: nextText };
    }

    const timer = setTimeout(() => setState(next), delay);
    return () => clearTimeout(timer);
  }, [state, words]);

  return (
    <span className="bg-accent-pink/30 px-2 border-b-4 border-ink">
      {state.text}
      <span className="inline-block w-[3px] h-[1em] bg-ink align-middle ml-1 animate-pulse" />
    </span>
  );
}

// `phone: true` stickers also show on small screens (the others need more room)
const heroStickers = [
  { name: 'star', Icon: Star, bg: 'bg-accent-yellow', pos: 'top-[24%] left-[4%]', rotate: -12, delay: 2.0 },
  { name: 'heart', Icon: Heart, bg: 'bg-accent-pink', pos: 'top-[17%] right-[4%]', rotate: 10, delay: 2.2, phone: true },
  { name: 'bolt', Icon: Lightning, bg: 'bg-accent-green', pos: 'bottom-[26%] left-[5%]', rotate: 8, delay: 2.4 },
  { name: 'ball', Icon: SoccerBall, bg: 'bg-white', pos: 'bottom-[10%] right-[5%]', rotate: -8, delay: 2.6, phone: true },
  { name: 'flower', Icon: Flower, bg: 'bg-accent-blue', pos: 'top-[46%] left-[12%]', rotate: 15, delay: 2.8 },
];

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
    <section id="home" ref={heroRef} className="min-h-svh flex flex-col items-center justify-center relative px-4 pt-24 pb-16">
      
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
            className="font-handwriting text-2xl md:text-3xl text-center mb-2"
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
              {NAME_LETTERS.map((letter) => (
                <motion.span key={letter} variants={child} className="inline-block mx-1">
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

        {/* Typewriter */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 + globalDelay }}
          className="mt-6 md:mt-8 font-handwriting text-2xl md:text-4xl text-center"
        >
          I'm a <Typewriter />
        </motion.p>

        {/* Main Headline */}
        <motion.h2 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 + globalDelay }}
          className="mt-8 md:mt-12 text-2xl sm:text-3xl md:text-5xl font-bold font-sans text-center max-w-4xl mx-auto leading-tight px-4 text-balance"
        >
          I turn complex ideas into{' '}
          <span className="relative inline-block">
            simple, thoughtful
            <svg className="absolute -bottom-2 left-0 w-full h-3 text-accent-pink -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
              <motion.path
                variants={svgDraw}
                initial="hidden"
                animate="visible"
                d="M0,6 Q25,1 50,6 T100,5"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </svg>
          </span>{' '}
          digital experiences.
          <motion.span 
            animate={{ rotate: 360 }} 
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            className="text-accent-pink ml-2 inline-block origin-center"
          >
            ✿
          </motion.span>
        </motion.h2>
      </motion.div>

      {/* Draggable stickers: grab one! */}
      {heroStickers.map(({ name, Icon, bg, pos, rotate, delay, phone }, idx) => (
        <motion.div
          key={name}
          drag
          dragMomentum
          dragElastic={0.2}
          initial={{ scale: 0, rotate: rotate - 80 }}
          animate={{ scale: 1, rotate }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 1.2, rotate: 0 }}
          whileDrag={{ scale: 1.25, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 220, damping: 12, delay: delay + globalDelay - 1.5 }}
          className={`absolute ${pos} ${phone ? 'flex' : 'hidden sm:flex'} w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 ${bg} ${idx % 2 ? 'rounded-2xl' : 'rounded-full'} border-2 border-ink items-center justify-center shadow-[4px_4px_0_0_#2b2a29] cursor-grab active:cursor-grabbing z-30`}
        >
          <Icon size={30} weight="bold" className="text-ink pointer-events-none" />
        </motion.div>
      ))}

      {/* Floating Avatars with Parallax */}
      <div className="absolute bottom-20 left-[10%] hidden md:block z-0 will-change-transform" ref={avatar1Ref}>
        <motion.div style={{ y: yAvatars1 }}>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.6 + globalDelay, type: "spring" }}>
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="w-24 h-24 rounded-full overflow-hidden border-4 border-accent-pink shadow-[4px_4px_0_0_#2b2a29]">
              <img src="/photo-2.webp" alt="Teang Arpireak - 1" className="w-full h-full object-cover" loading="lazy" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute top-1/2 right-[10%] hidden md:block z-0 will-change-transform" ref={avatar2Ref}>
        <motion.div style={{ y: yAvatars2 }}>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.8 + globalDelay, type: "spring" }}>
            <motion.div animate={{ y: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} className="w-32 h-32 rounded-full overflow-hidden border-4 border-accent-yellow shadow-[4px_4px_0_0_#2b2a29]">
              <img src="/photo-3.webp" alt="Teang Arpireak - 2" className="w-full h-full object-cover" loading="lazy" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
}
