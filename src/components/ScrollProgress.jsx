import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { PencilSimple } from '@phosphor-icons/react';

/** A pink pencil line across the top that fills as you scroll. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });
  const left = useTransform(progress, (v) => `${v * 100}%`);

  return (
    <div className="fixed top-0 left-0 w-full h-1.5 z-[9997] pointer-events-none">
      <motion.div style={{ scaleX: progress }} className="h-full bg-accent-pink origin-left" />
      <motion.div style={{ left }} className="absolute -top-1 -translate-x-full">
        <PencilSimple size={20} weight="fill" className="text-ink -rotate-45 drop-shadow" />
      </motion.div>
    </div>
  );
}
