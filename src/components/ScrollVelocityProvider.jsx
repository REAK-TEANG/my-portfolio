import { useScroll, useSpring, useVelocity } from 'framer-motion';
import { ScrollVelocityContext } from '../utils/scrollVelocity';

/**
 * Measures page scroll speed once and shares it, so skew and marquee effects
 * don't each run their own scroll listener.
 */
export default function ScrollVelocityProvider({ children }) {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, { stiffness: 90, damping: 28 });

  return <ScrollVelocityContext.Provider value={smoothVelocity}>{children}</ScrollVelocityContext.Provider>;
}
