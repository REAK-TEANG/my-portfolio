import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Heart, PencilSimple, SoccerBall } from '@phosphor-icons/react';
import Lightbox from './Lightbox';
import Doodles from './Doodles';
import Parallax from './Parallax';
import ScrollSkew from './ScrollSkew';
import { ScrollHeading } from './Reveal';

// Drift speeds cycle through the posters so neighbours always move at different rates
const POSTER_SPEEDS = [0.5, 0.95, 0.35, 0.8, 0.3, 0.65];

const doodles = [
  { name: 'heart', Icon: Heart, pos: 'top-[8%] right-[3%]', color: 'bg-accent-pink', speed: 1, rotate: 12 },
  { name: 'pencil', Icon: PencilSimple, pos: 'top-[40%] left-[2%]', color: 'bg-accent-yellow', speed: -0.8, rotate: -14 },
  { name: 'ball', Icon: SoccerBall, pos: 'bottom-[12%] right-[4%]', color: 'bg-white', speed: 0.7, rotate: 8 },
];

const works = [
  {
    src: '/graphic-design/work-1.webp',
    title: '4 Warning Signs',
    client: 'Bayond Auto',
    type: 'Infographic',
    tape: 'bg-accent-pink',
    rotate: -2,
  },
  {
    src: '/graphic-design/work-2.webp',
    title: 'Fleet Service Promo',
    client: 'Bayond Auto Servis',
    type: 'Promotion',
    tape: 'bg-accent-yellow',
    rotate: 2,
  },
  {
    src: '/graphic-design/work-3.webp',
    title: 'Water Festival Greeting',
    client: 'Bayond Auto',
    type: 'Illustration',
    tape: 'bg-accent-blue',
    rotate: -1.5,
  },
  {
    src: '/graphic-design/work-5.webp',
    title: '7 Pre-Trip Checks',
    client: 'Bayond Auto',
    type: 'Infographic',
    tape: 'bg-accent-green',
    rotate: 2.5,
  },
  {
    src: '/graphic-design/work-4.webp',
    title: "King Father's Commemoration",
    client: 'Bayond Auto Servis',
    type: 'Commemorative post',
    tape: 'bg-accent-pink',
    rotate: -2.5,
  },
  {
    src: '/graphic-design/work-6.webp',
    title: 'Pchum Ben Greeting',
    client: 'Ratez Parts',
    type: 'Holiday greeting',
    tape: 'bg-accent-yellow',
    rotate: 1.5,
  },
];

export default function GraphicWorks() {
  const [active, setActive] = useState(null);
  const closeLightbox = useCallback(() => setActive(null), []);

  return (
    <section id="graphics" className="py-24 px-4 border-t-2 border-ink border-dashed relative overflow-x-clip">
      <Doodles items={doodles} />

      <div className="max-w-5xl mx-auto mb-16 text-center relative">
        <ScrollHeading className="font-display text-3xl sm:text-4xl md:text-6xl text-ink">GRAPHIC WORK</ScrollHeading>
        <p className="font-handwriting text-xl md:text-2xl text-accent-pink mt-4">
          Posters, campaigns & social media for real brands
        </p>
      </div>

      <div className="max-w-6xl mx-auto columns-1 sm:columns-2 lg:columns-3 gap-10 relative">
        {works.map((w, i) => (
          // Each poster drifts at its own speed and leans with scroll speed
          <Parallax key={w.src} speed={POSTER_SPEEDS[i % POSTER_SPEEDS.length]} className="mb-12 break-inside-avoid">
            <ScrollSkew max={4}>
              <motion.figure
                initial={{ opacity: 0, y: 40, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: w.rotate }}
                whileHover={{ rotate: 0, scale: 1.03, zIndex: 20 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ type: 'spring', stiffness: 120, damping: 14, delay: (i % 3) * 0.08 }}
                className="relative bg-white p-3 pb-4 border-2 border-ink shadow-[6px_6px_0_0_#2b2a29]"
              >
                <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 ${w.tape}/70 rotate-2 border border-black/10 z-10`} />
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`View ${w.title} full size`}
                  className="block w-full cursor-pointer"
                >
                  <img src={w.src} alt={`${w.title} - ${w.client}`} className="w-full border-2 border-ink" loading="lazy" />
                </button>
                <figcaption className="mt-3 text-center">
                  <p className="font-handwriting text-2xl leading-tight">{w.title}</p>
                  <p className="font-mono text-xs font-bold uppercase text-ink/60 mt-1">
                    {w.client} · {w.type}
                  </p>
                </figcaption>
              </motion.figure>
            </ScrollSkew>
          </Parallax>
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

      <Lightbox
        image={active === null ? null : { src: works[active].src, alt: `${works[active].title} - ${works[active].client}` }}
        onClose={closeLightbox}
      />
    </section>
  );
}
