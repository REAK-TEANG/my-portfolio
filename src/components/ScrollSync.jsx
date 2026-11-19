import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from 'lenis/react';

gsap.registerPlugin(ScrollTrigger);

/**
 * Tells GSAP ScrollTrigger about every Lenis scroll tick. Without this the
 * smooth-scrolled position and ScrollTrigger's idea of it drift apart, so
 * scroll animations fire late or jitter.
 */
export default function ScrollSync() {
  useLenis(ScrollTrigger.update);
  return null;
}
