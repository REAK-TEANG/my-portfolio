import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowLeft, ArrowRight, SoccerBall } from '@phosphor-icons/react';

/* ---------- Polaroid photo with scroll parallax ---------- */
function Polaroid({ src, caption, credit, rotate = -3, tape = 'bg-accent-yellow', className = '', speed = 40 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  const tilt = useTransform(scrollYProgress, [0, 0.5, 1], [rotate - 6, rotate, rotate + 6]);

  return (
    <motion.figure
      ref={ref}
      style={{ y, rotate: tilt }}
      whileHover={{ rotate: 0, scale: 1.04 }}
      className={`relative bg-white p-3 pb-4 border-2 border-ink shadow-[8px_8px_0_0_#2b2a29] ${className}`}
    >
      <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-7 ${tape}/80 rotate-2 border border-black/10 z-10`} />
      <img src={src} alt={caption} className="w-full border-2 border-ink" loading="lazy" />
      <figcaption className="font-handwriting text-2xl text-center mt-3 leading-tight">
        {caption}
        {credit && <span className="block font-mono text-[10px] font-bold uppercase text-ink/50 mt-1">Photo: {credit}</span>}
      </figcaption>
    </motion.figure>
  );
}

/* ---------- Journal page (text card) ---------- */
function JournalCard({ n, title, color, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotate: 2 }}
      whileInView={{ opacity: 1, y: 0, rotate: -1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ type: 'spring', stiffness: 90, damping: 16 }}
      className="relative bg-white border-2 border-ink shadow-[8px_8px_0_0_#2b2a29] p-6 md:p-8 bg-ruled-paper bg-ruled"
    >
      <div className={`absolute -top-4 left-6 ${color} border-2 border-ink px-3 py-1 font-handwriting text-xl -rotate-3 shadow-[3px_3px_0_0_#2b2a29]`}>
        Chapter {n}
      </div>
      <h2 className="font-display text-3xl md:text-4xl leading-tight mt-2 mb-4">{title}</h2>
      <div className="font-sans text-lg text-ink/85 leading-8 space-y-3">{children}</div>
    </motion.div>
  );
}

/* ---------- One chapter row on the timeline ---------- */
function Chapter({ n, flip, markerColor, text, visual }) {
  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-24 pl-14 md:pl-0 py-14 md:py-20 items-center">
      {/* marker on the spine */}
      <div className={`absolute left-5 md:left-1/2 top-16 -translate-x-1/2 w-11 h-11 rounded-full ${markerColor} border-2 border-ink flex items-center justify-center font-display text-xl shadow-[3px_3px_0_0_#2b2a29] z-20`}>
        {n}
      </div>
      <div className={flip ? 'md:order-2' : ''}>{text}</div>
      <div className={`${flip ? 'md:order-1' : ''} flex justify-center`}>{visual}</div>
    </div>
  );
}

export default function AboutPage() {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start 60%', 'end 60%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });
  const ballTop = useTransform(progress, [0, 1], ['0%', '100%']);
  const ballSpin = useTransform(progress, [0, 1], [0, 1800]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'My Story | Teang Arpireak';
    return () => { document.title = 'Teang Arpireak | Portfolio'; };
  }, []);

  return (
    <div className="min-h-screen bg-paper bg-ruled-paper bg-ruled overflow-x-hidden pb-24">
      {/* top bar */}
      <nav className="fixed top-0 left-0 w-full bg-paper/90 backdrop-blur-sm z-50 border-b-2 border-ink border-dashed">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group font-mono font-bold uppercase hover:text-accent-pink transition-colors">
            <div className="w-8 h-8 rounded-full border-2 border-ink bg-white flex items-center justify-center group-hover:-translate-x-1 transition-transform">
              <ArrowLeft weight="bold" />
            </div>
            Back to Home
          </Link>
          <span className="font-display text-xl">TA.</span>
        </div>
      </nav>

      {/* ---------- Cover ---------- */}
      <header className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-16 relative">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="font-handwriting text-3xl mb-4">
          the journal of
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30, rotate: -3 }}
          animate={{ opacity: 1, y: 0, rotate: -2 }}
          transition={{ type: 'spring', stiffness: 80, damping: 12, delay: 0.3 }}
          className="font-display text-6xl md:text-9xl leading-none bg-accent-yellow border-2 border-ink px-6 py-4 shadow-[10px_10px_0_0_#2b2a29]"
        >
          MY STORY
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="font-sans text-xl mt-10 max-w-md">
          Teang Arpireak. From a football field in Siem Reap to designing and building digital products.
        </motion.p>

        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {[
            ['Born in Siem Reap', 'bg-accent-pink', -4],
            ['Football kid', 'bg-accent-green', 3],
            ['Designer + developer', 'bg-accent-blue', -2],
          ].map(([t, c, r], i) => (
            <motion.span
              key={t}
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 1, rotate: r }}
              transition={{ type: 'spring', delay: 1 + i * 0.15 }}
              whileHover={{ rotate: 0, scale: 1.1 }}
              className={`${c} border-2 border-ink px-4 py-1 font-handwriting text-2xl shadow-[3px_3px_0_0_#2b2a29]`}
            >
              {t}
            </motion.span>
          ))}
        </div>

        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          className="absolute bottom-10 font-handwriting text-2xl text-ink/70"
        >
          scroll to read ↓
        </motion.div>
      </header>

      {/* ---------- Timeline ---------- */}
      <main ref={timelineRef} className="relative max-w-6xl mx-auto px-4">
        {/* spine */}
        <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-0 border-l-4 border-dashed border-ink/25 -translate-x-1/2" />
        <motion.div
          style={{ scaleY: progress }}
          className="absolute left-5 md:left-1/2 top-0 bottom-0 w-1.5 bg-accent-pink -translate-x-1/2 origin-top"
        />
        {/* rolling football */}
        <motion.div
          style={{ top: ballTop, rotate: ballSpin }}
          className="absolute left-5 md:left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white border-2 border-ink flex items-center justify-center shadow-[3px_3px_0_0_#2b2a29]"
        >
          <SoccerBall size={34} weight="fill" className="text-ink" />
        </motion.div>

        {/* 1 */}
        <Chapter
          n={1}
          markerColor="bg-accent-pink"
          text={
            <JournalCard n={1} title="Born in Siem Reap" color="bg-accent-pink">
              <p>I was born in Siem Reap, Cambodia.</p>
              <p>A small kid with big energy and lots of questions. This is where my story starts.</p>
            </JournalCard>
          }
          visual={<Polaroid src="/journal/born.jpg" caption="Hello, world!" rotate={3} tape="bg-accent-pink" className="w-72 md:w-80" />}
        />

        {/* 2 */}
        <Chapter
          n={2}
          flip
          markerColor="bg-accent-yellow"
          text={
            <JournalCard n={2} title="Always outside" color="bg-accent-yellow">
              <p>I grew up near old stone temples and open space.</p>
              <p>I was never indoors. I was running, exploring, and playing all day.</p>
            </JournalCard>
          }
          visual={<Polaroid src="/journal/temple.jpg" caption="Little explorer" rotate={-3} tape="bg-accent-blue" className="w-72 md:w-96" />}
        />

        {/* 3 */}
        <Chapter
          n={3}
          markerColor="bg-accent-green"
          text={
            <JournalCard n={3} title="Football was everything" color="bg-accent-green">
              <p>Football filled my whole childhood. Training, matches, and big dreams.</p>
              <p>It taught me teamwork, focus, and to never give up. I still design that way.</p>
            </JournalCard>
          }
          visual={
            <div className="relative w-full max-w-md h-[420px] md:h-[480px]">
              <div className="absolute top-0 left-0 w-[78%]">
                <Polaroid src="/journal/kick.jpg" caption="Corner kick" rotate={-4} tape="bg-accent-yellow" speed={30} />
              </div>
              <div className="absolute bottom-0 right-0 w-[70%]">
                <Polaroid src="/journal/match.jpg" caption="Match day" credit="Angkor Tiger Football Club" rotate={5} tape="bg-accent-pink" speed={55} />
              </div>
            </div>
          }
        />

        {/* 4 */}
        <Chapter
          n={4}
          flip
          markerColor="bg-accent-blue"
          text={
            <JournalCard n={4} title="Then came design" color="bg-accent-blue">
              <p>I always had creative ideas, and I loved bold, beautiful visuals.</p>
              <p>So I started turning ideas into posters, brands, and screens.</p>
            </JournalCard>
          }
          visual={
            <div className="relative w-full max-w-md h-[400px] md:h-[460px]">
              <div className="absolute top-0 left-0 w-[46%]">
                <Polaroid src="/graphic-design/work-3.jpg" caption="Posters" rotate={-6} tape="bg-accent-green" speed={25} />
              </div>
              <div className="absolute top-10 right-0 w-[46%]">
                <Polaroid src="/graphic-design/work-1.jpg" caption="Brands" rotate={5} tape="bg-accent-pink" speed={50} />
              </div>
              <div className="absolute bottom-0 left-[14%] w-[72%]">
                <Polaroid src="/projects/kairo/01-dashboard.png" caption="Screens" rotate={-2} tape="bg-accent-yellow" speed={35} />
              </div>
            </div>
          }
        />

        {/* 5 */}
        <Chapter
          n={5}
          markerColor="bg-accent-pink"
          text={
            <JournalCard n={5} title="Today" color="bg-accent-pink">
              <p>I design and build digital products, from the first sketch to working code.</p>
              <p>My latest: KAIRO, a repair shop system I made from design to launch.</p>
              <p className="font-bold">I'm open to new projects and teams. Let's make something good.</p>
              <div className="flex flex-wrap gap-3 pt-3">
                <Link to="/#projects" className="group inline-flex items-center gap-2 bg-ink text-white px-5 py-2 font-mono font-bold uppercase border-2 border-ink shadow-[4px_4px_0_0_#f783ac] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                  See my work
                  <ArrowRight weight="bold" className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="mailto:broreakzxz@gmail.com" className="inline-flex items-center gap-2 bg-accent-yellow px-5 py-2 font-mono font-bold uppercase border-2 border-ink shadow-[4px_4px_0_0_#2b2a29] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                  Say hi
                </a>
              </div>
            </JournalCard>
          }
          visual={<Polaroid src="/photo-1.jpg" caption="That's me!" rotate={-3} tape="bg-accent-blue" className="w-72 md:w-80" />}
        />
      </main>

      <p className="text-center font-handwriting text-3xl text-ink/60 mt-16">to be continued… ✿</p>
    </div>
  );
}
