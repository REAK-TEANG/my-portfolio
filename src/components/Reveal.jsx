import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollSkew from './ScrollSkew';
import useMotionStrength from '../utils/useMotionStrength';

/**
 * Big section title: slides in from the side, tilts and grows to full size as it
 * rises into view (tied to scroll position), and leans with scroll speed.
 */
export function ScrollHeading({ as = 'h2', className = '', children }) {
  const ref = useRef(null);
  const strength = useMotionStrength();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center 60%'] });

  const x = useTransform(scrollYProgress, [0, 1], [-140 * strength, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-7 * strength, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1 - 0.3 * strength, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1 - strength, 1]);
  const Tag = motion[as];

  return (
    <ScrollSkew>
      <Tag ref={ref} style={{ x, rotate, scale, opacity }} className={className}>
        {children}
      </Tag>
    </ScrollSkew>
  );
}

/** Splits text into words with a stable id each (words can repeat). */
function toWords(text) {
  const seen = {};
  return text.split(' ').map((word) => {
    seen[word] = (seen[word] || 0) + 1;
    return { word, id: `${word}-${seen[word]}` };
  });
}

/** Headline that writes itself in word by word when it scrolls into view. */
export function WordReveal({ text, as: Tag = 'h2', className = '' }) {
  return (
    <Tag className={className} aria-label={text}>
      {toWords(text).map(({ word, id }, i) => (
        <span key={id} aria-hidden="true" className="inline-block overflow-hidden align-bottom pb-[0.15em] mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', rotate: 6 }}
            whileInView={{ y: 0, rotate: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ type: 'spring', stiffness: 140, damping: 16, delay: i * 0.07 }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
