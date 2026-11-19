import { useCallback, useSyncExternalStore } from 'react';

/** Live `window.matchMedia(query).matches`, re-rendering when it changes. */
export default function useMediaQuery(query) {
  const subscribe = useCallback(
    (notify) => {
      const mq = window.matchMedia(query);
      mq.addEventListener('change', notify);
      return () => mq.removeEventListener('change', notify);
    },
    [query]
  );

  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => false);
}
