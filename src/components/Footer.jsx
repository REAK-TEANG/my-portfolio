import { motion } from 'framer-motion';
import { LinkedinLogo, InstagramLogo, BehanceLogo, SoccerBall, ArrowUpRight } from '@phosphor-icons/react';
import Marquee from './Marquee';
import useScrollToSection from '../utils/useScrollToSection';
import { CONTACT_EMAIL } from '../config';

const YEAR = new Date().getFullYear();

const socials = [
  { href: 'https://www.linkedin.com/in/teang-arpireak-569962289', Icon: LinkedinLogo, bg: 'bg-accent-yellow', label: 'LinkedIn' },
  { href: 'https://www.behance.net/teangarpiraek', Icon: BehanceLogo, bg: 'bg-accent-pink', label: 'Behance' },
  { href: 'https://www.instagram.com/p.reak_10/', Icon: InstagramLogo, bg: 'bg-accent-green', label: 'Instagram' },
];

export default function Footer() {
  const scrollToSection = useScrollToSection();
  const toTop = () => scrollToSection('home');

  return (
    <footer id="footer" className="relative bg-ink text-paper overflow-hidden">
      <div className="zigzag-top absolute top-0 left-0 w-full h-[18px]" />

      <div className="max-w-6xl mx-auto px-4 pt-28 pb-10 text-center relative">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-handwriting text-2xl md:text-3xl text-accent-yellow"
        >
          got an idea? a problem? a hello?
        </motion.p>

        <motion.a
          href={`mailto:${CONTACT_EMAIL}`}
          initial={{ opacity: 0, y: 40, rotate: -2 }}
          whileInView={{ opacity: 1, y: 0, rotate: -2 }}
          whileHover={{ rotate: 0, scale: 1.03 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ type: 'spring', stiffness: 110, damping: 14 }}
          className="group inline-flex items-center gap-4 mt-6 font-display text-5xl sm:text-7xl md:text-9xl leading-none text-paper hover:text-accent-pink transition-colors"
        >
          LET'S TALK
          <ArrowUpRight weight="bold" className="w-10 h-10 md:w-20 md:h-20 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
        </motion.a>

        <p className="font-mono text-sm md:text-base mt-6 text-paper/70">{CONTACT_EMAIL}</p>

        <div className="flex items-center justify-center gap-4 mt-8">
          {socials.map(({ href, Icon, bg, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className={`w-14 h-14 rounded-full ${bg} border-2 border-paper flex items-center justify-center text-ink hover:-translate-y-2 hover:rotate-6 transition-transform shadow-[4px_4px_0_0_#f6f5f1]`}
            >
              <Icon size={26} weight="bold" />
            </a>
          ))}
        </div>

      </div>

      {/* full-bleed tape strip */}
      <Marquee
        items={['Open for work', 'UI/UX', 'Branding', 'React', 'Siem Reap']}
        color="bg-accent-pink"
        rotate={1.2}
        className="text-ink"
      />

      <div className="max-w-6xl mx-auto px-4 pb-10 text-center relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mt-6">
          <p className="font-mono text-xs font-bold uppercase text-paper/50">
            © {YEAR} Teang Arpireak · Made in Siem Reap with ✿
          </p>

          <motion.button
            onClick={toTop}
            whileHover={{ y: -6 }}
            whileTap={{ y: -40, rotate: 360, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 200, damping: 12 }}
            className="group flex items-center gap-3 font-mono text-xs font-bold uppercase text-paper"
          >
            Back to top
            <span className="w-12 h-12 rounded-full bg-white border-2 border-paper flex items-center justify-center shadow-[3px_3px_0_0_#f783ac]">
              <SoccerBall size={30} weight="fill" className="text-ink group-hover:rotate-180 transition-transform duration-500" />
            </span>
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
