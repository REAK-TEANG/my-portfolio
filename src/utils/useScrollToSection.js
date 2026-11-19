import { useCallback } from 'react';
import { useLenis } from 'lenis/react';

/**
 * Returns `scrollToSection(id)`: smooth-scrolls to the element with that id.
 * Goes through Lenis (which owns scrolling on this site) so it behaves the same
 * on desktop and phones. "home" means the very top (the hero is a pinned element).
 */
export default function useScrollToSection() {
  const lenis = useLenis();

  return useCallback(
    (id) => {
      const target = id === 'home' ? 0 : document.getElementById(id);
      if (target === null) return;

      if (lenis) lenis.scrollTo(target);
      else if (target === 0) window.scrollTo({ top: 0, behavior: 'smooth' });
      else target.scrollIntoView({ behavior: 'smooth' });
    },
    [lenis]
  );
}
