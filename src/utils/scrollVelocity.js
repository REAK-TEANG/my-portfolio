import { createContext, useContext } from 'react';

/** Holds one shared, smoothed scroll-velocity MotionValue (px per second, signed). */
export const ScrollVelocityContext = createContext(null);

export function useScrollVelocity() {
  const velocity = useContext(ScrollVelocityContext);
  if (!velocity) throw new Error('useScrollVelocity must be used inside <ScrollVelocityProvider>');
  return velocity;
}
