import { motion, useTransform } from 'framer-motion';
import { useScrollVelocity } from '../utils/scrollVelocity';
import useMotionStrength from '../utils/useMotionStrength';

const MAX_SPEED = 2500; // px/s at which the skew reaches its maximum

/**
 * Leans its children with the scroll speed, then settles when scrolling stops.
 * Use on headings, cards and posters, never on whole sections (text gets blurry).
 */
export default function ScrollSkew({ max = 6, className = '', children }) {
  const velocity = useScrollVelocity();
  const limit = max * useMotionStrength();
  const skewY = useTransform(velocity, [-MAX_SPEED, MAX_SPEED], [limit, -limit]);

  return (
    <motion.div style={{ skewY }} className={className}>
      {children}
    </motion.div>
  );
}
