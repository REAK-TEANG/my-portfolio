import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X } from '@phosphor-icons/react';

const works = [
  {
    src: '/graphic-design/work-1.jpg',
    title: '4 Warning Signs',
    client: 'Bayond Auto',
    type: 'Infographic',
    tape: 'bg-accent-pink',
    rotate: -2,
  },
  {
    src: '/graphic-design/work-2.jpg',
    title: 'Fleet Service Promo',
    client: 'Bayond Auto Servis',
    type: 'Promotion',
    tape: 'bg-accent-yellow',
    rotate: 2,
  },
  {
    src: '/graphic-design/work-3.jpg',
    title: 'Water Festival Greeting',
    client: 'Bayond Auto',
    type: 'Illustration',
    tape: 'bg-accent-blue',
    rotate: -1.5,
  },
  {
    src: '/graphic-design/work-5.jpg',
    title: '7 Pre-Trip Checks',
    client: 'Bayond Auto',
    type: 'Infographic',
    tape: 'bg-accent-green',
    rotate: 2.5,
  },
  {
    src: '/graphic-design/work-4.jpg',
    title: "King Father's Commemoration",
    client: 'Bayond Auto Servis',
    type: 'Commemorative post',
    tape: 'bg-accent-pink',
    rotate: -2.5,
  },
  {
    src: '/graphic-design/work-6.jpg',
    title: 'Pchum Ben Greeting',
    client: 'Ratez Parts',
    type: 'Holiday greeting',
    tape: 'bg-accent-yellow',
    rotate: 1.5,
  },
];

export default function GraphicWorks() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e) => e.key === 'Escape' && setActive(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active]);

  return (
    <section id="graphics" className="py-24 px-4 border-t-2 border-ink border-dashed relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto mb-16 text-center"
      >
        <h2 className="font-display text-4xl md:text-6xl text-ink">GRAPHIC WORK</h2>
        <p className="font-handwriting text-2xl text-accent-pink mt-4">
          Posters, campaigns & social media for real brands
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto columns-1 sm:columns-2 lg:columns-3 gap-10">
        {works.map((w, i) => (
          <motion.figure
            key={w.src}
            initial={{ opacity: 0, y: 40, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: w.rotate }}
            whileHover={{ rotate: 0, scale: 1.03, zIndex: 20 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ type: 'spring', stiffness: 120, damping: 14, delay: (i % 3) * 0.08 }}
            onClick={() => setActive(i)}
            className="relative mb-12 break-inside-avoid bg-white p-3 pb-4 border-2 border-ink shadow-[6px_6px_0_0_#2b2a29] cursor-pointer"
          >
            <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 ${w.tape}/70 rotate-2 border border-black/10 z-10`} />
            <img src={w.src} alt={`${w.title} - ${w.client}`} className="w-full border-2 border-ink" loading="lazy" />
            <figcaption className="mt-3 text-center">
              <p className="font-handwriting text-2xl leading-tight">{w.title}</p>
              <p className="font-mono text-xs font-bold uppercase text-ink/60 mt-1">
                {w.client} · {w.type}
              </p>
            </figcaption>
          </motion.figure>
        ))}
      </div>

      <div className="text-center">
        <a
          href="https://www.behance.net/teangarpiraek"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 bg-ink text-white px-6 py-3 font-mono font-bold uppercase border-2 border-transparent hover:bg-accent-pink hover:border-ink shadow-[4px_4px_0_0_#2b2a29] transition-colors group"
        >
          See more on Behance
          <ArrowUpRight weight="bold" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </a>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[9990] bg-ink/90 flex items-center justify-center p-4 cursor-pointer"
          >
            <button
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-accent-yellow border-2 border-ink flex items-center justify-center shadow-[4px_4px_0_0_#000]"
            >
              <X size={24} weight="bold" />
            </button>
            <motion.img
              initial={{ scale: 0.9, rotate: -2 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.9 }}
              src={works[active].src}
              alt={works[active].title}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] max-w-full border-4 border-ink shadow-[8px_8px_0_0_#000] bg-white cursor-default"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
