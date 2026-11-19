import { useRef } from 'react';
import { motion, useAnimationFrame, useInView, useMotionValue } from 'framer-motion';
import { useScrollVelocity } from '../utils/scrollVelocity';
import useMotionStrength from '../utils/useMotionStrength';

// Enough identical groups that the strip never runs out, even on very wide screens
// with a short word list. We loop by exactly one group's width.
const COPIES = [0, 1, 2, 3, 4, 5, 6, 7];
const BASE_SPEED = 55; // px per second when the page is still
const SPEED_PER_SCROLL = 350; // each 350 px/s of scrolling adds +1x speed
const MAX_BOOST = 7; // so fast scrolling can make it up to 8x faster

/**
 * A tilted strip of washi tape with scrolling text. It drifts slowly on its own,
 * speeds up while you scroll, and flips direction when you scroll back up.
 */
export default function Marquee({
  items,
  color = 'bg-accent-yellow',
  rotate = -1.5,
  reverse = false,
  className = '',
}) {
  const wrapRef = useRef(null);
  const groupRef = useRef(null);
  const x = useMotionValue(0);
  const velocity = useScrollVelocity();
  const strength = useMotionStrength();
  const visible = useInView(wrapRef);
  const direction = reverse ? 1 : -1;

  useAnimationFrame((_, delta) => {
    const period = groupRef.current?.offsetWidth;
    if (!visible || strength === 0 || !period) return; // reduced motion: strip stays still

    const v = velocity.get();
    const boost = Math.min(Math.abs(v) / SPEED_PER_SCROLL, MAX_BOOST) * strength;
    const flip = v < -40 ? -1 : 1; // scrolling up reverses the drift
    let next = x.get() + direction * flip * BASE_SPEED * (1 + boost) * (delta / 1000);

    if (next <= -period) next += period;
    else if (next > 0) next -= period;
    x.set(next);
  });

  return (
    <div ref={wrapRef} className={`relative z-20 overflow-hidden py-6 ${className}`} aria-hidden="true">
      <div
        className={`${color} border-y-2 border-ink py-2 shadow-[0_4px_0_0_#2b2a29]`}
        style={{ transform: `rotate(${rotate}deg) scale(1.04)` }}
      >
        <motion.div style={{ x }} className="flex w-max">
          {COPIES.map((copy) => (
            <div key={copy} ref={copy === 0 ? groupRef : undefined} className="flex shrink-0 items-center">
              {items.map((t) => (
                <span key={t} className="flex items-center font-display text-xl md:text-2xl uppercase whitespace-nowrap">
                  <span className="px-6">{t}</span>
                  <span className="text-accent-pink">✿</span>
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
