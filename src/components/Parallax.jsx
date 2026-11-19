import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import useMotionStrength from '../utils/useMotionStrength';

const MAX_SHIFT = 120; // px of travel at speed = 1 (desktop)

/**
 * Drifts its children up or down as they cross the screen, so layers move at
 * different speeds. `speed` > 0 lags behind the page, < 0 runs ahead of it.
 */
export default function Parallax({ speed = 0.5, className = '', children }) {
  const ref = useRef(null);
  const shift = MAX_SHIFT * speed * useMotionStrength();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [shift, -shift]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
