import useMediaQuery from './useMediaQuery';

/**
 * How strongly scroll-linked effects (skew, parallax, reveals) should play:
 *   0    visitor asked for reduced motion  -> effects are at rest
 *   0.45 touch device                      -> softer, lighter on the battery
 *   1    mouse + keyboard device           -> full bold effect
 *
 * `MotionConfig reducedMotion="user"` only covers animate/transition, NOT
 * scroll-linked useTransform values, so effects must multiply by this.
 */
export default function useMotionStrength() {
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const touch = useMediaQuery('(pointer: coarse)');
  if (reduced) return 0;
  return touch ? 0.45 : 1;
}
