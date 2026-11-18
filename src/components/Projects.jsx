import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight } from '@phosphor-icons/react';

const screens = [
  { label: 'Dashboard', src: '/projects/kairo/01-dashboard.png' },
  { label: 'Repair Orders', src: '/projects/kairo/03-repair-jobs.png' },
  { label: 'Mechanic Bench', src: '/projects/kairo/10-mechanic.png' },
  { label: 'Appointments', src: '/projects/kairo/02-appointments.png' },
  { label: 'Invoices', src: '/projects/kairo/08-invoices.png' },
];

const stickers = [
  { text: '13 modules', color: 'bg-accent-yellow', rotate: -6 },
  { text: 'Khmer + English', color: 'bg-accent-pink', rotate: 4 },
  { text: 'Light & dark mode', color: 'bg-accent-blue', rotate: -3 },
  { text: 'Designed + built solo', color: 'bg-accent-green', rotate: 5 },
];

const stack = ['React', 'PHP', 'PostgreSQL', 'Figma'];

export default function Projects() {
  const [current, setCurrent] = useState(0);

  return (
    <section id="projects" className="py-24 px-4 bg-ink text-paper relative z-10 overflow-hidden">
      {/* background doodles */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #f6f5f1 1.5px, transparent 1.5px)', backgroundSize: '28px 28px' }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto mb-12 relative"
      >
        <h2 className="font-display text-4xl md:text-6xl text-paper text-center">CASE STUDY</h2>
        <p className="font-handwriting text-2xl text-accent-yellow text-center mt-4">One project, designed and built end to end</p>
      </motion.div>

      <div className="max-w-6xl mx-auto relative">
        {/* Folder tab */}
        <div className="w-72 h-12 bg-accent-blue rounded-t-xl border-x-2 border-t-2 border-paper ml-4 flex items-center justify-center px-4 relative z-20">
          <span className="font-mono font-bold text-ink whitespace-nowrap">01 · UX/UI + Full-Stack</span>
        </div>

        <div className="bg-paper text-ink rounded-xl rounded-tl-none border-2 border-paper shadow-[10px_10px_0_0_#f783ac] p-6 md:p-10 relative">
          {/* LIVE badge */}
          <motion.div
            animate={{ rotate: [10, 14, 10], scale: [1, 1.06, 1] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
            className="absolute -top-6 -right-3 md:-right-6 bg-accent-pink border-2 border-ink px-4 py-2 font-display text-lg shadow-[4px_4px_0_0_#2b2a29] z-30"
          >
            LIVE ✦
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: copy */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <h3 className="font-display text-6xl md:text-7xl leading-none">KAIRO</h3>
              <p className="font-handwriting text-3xl text-ink/70 mt-2">Auto repair workshop system</p>

              <p className="font-sans text-lg leading-relaxed mt-6">
                Repair shops juggle paper job cards, phone calls and spreadsheets. KAIRO puts appointments, repair orders, parts, invoices and a mechanic workbench into one system, and I designed and built every part of it.
              </p>

              <div className="flex flex-wrap gap-3 mt-8">
                {stickers.map((s) => (
                  <motion.span
                    key={s.text}
                    whileHover={{ rotate: 0, scale: 1.1 }}
                    initial={{ rotate: s.rotate }}
                    className={`${s.color} border-2 border-ink px-3 py-1 font-handwriting text-xl shadow-[3px_3px_0_0_#2b2a29] cursor-default`}
                  >
                    {s.text}
                  </motion.span>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mt-8">
                {stack.map((t) => (
                  <span key={t} className="px-3 py-1 bg-white border-2 border-ink text-sm font-mono rounded-full font-bold shadow-[2px_2px_0_0_#2b2a29]">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 mt-10">
                <Link
                  to="/project/auto-repair"
                  className="group inline-flex items-center gap-2 bg-ink text-white px-6 py-3 font-mono font-bold uppercase border-2 border-ink shadow-[4px_4px_0_0_#f783ac] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                >
                  Read case study
                  <ArrowRight weight="bold" className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="https://car-repair-system-ebon.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 bg-accent-yellow px-6 py-3 font-mono font-bold uppercase border-2 border-ink shadow-[4px_4px_0_0_#2b2a29] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                >
                  Live demo
                  <ArrowUpRight weight="bold" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Right: browser mockup with switchable screens */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <motion.div
                initial={{ rotate: 0 }}
                whileHover={{ rotate: -1 }}
                className="border-2 border-ink bg-white shadow-[8px_8px_0_0_#2b2a29] rounded-lg overflow-hidden"
              >
                <div className="flex items-center gap-2 px-3 py-2 border-b-2 border-ink bg-accent-yellow/40">
                  <span className="w-3 h-3 rounded-full bg-accent-pink border border-ink" />
                  <span className="w-3 h-3 rounded-full bg-accent-yellow border border-ink" />
                  <span className="w-3 h-3 rounded-full bg-accent-green border border-ink" />
                  <div className="ml-3 flex-1 bg-white border border-ink rounded px-3 py-0.5 font-mono text-xs truncate">
                    car-repair-system-ebon.vercel.app
                  </div>
                </div>
                <div className="relative aspect-video bg-gray-100">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={screens[current].src}
                      src={screens[current].src}
                      alt={`KAIRO ${screens[current].label}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="absolute inset-0 w-full h-full object-cover object-top"
                    />
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* screen switcher */}
              <div className="flex flex-wrap gap-2 mt-6">
                {screens.map((s, i) => (
                  <button
                    key={s.label}
                    onClick={() => setCurrent(i)}
                    className={`px-3 py-1 border-2 border-ink font-mono text-xs font-bold uppercase transition-colors ${
                      current === i ? 'bg-ink text-white shadow-[3px_3px_0_0_#f783ac]' : 'bg-white hover:bg-accent-yellow'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="font-handwriting text-2xl text-paper/70 text-center mt-14">
          scroll down for my graphic design work ↓
        </p>
      </div>
    </section>
  );
}
