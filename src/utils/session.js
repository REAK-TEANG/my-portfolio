const PRELOADER_KEY = 'preloaderSeen';

/** True if the loading screen already played in this browser session. */
export const hasSeenPreloader = () => {
  try {
    return sessionStorage.getItem(PRELOADER_KEY) === '1';
  } catch {
    return false; // storage blocked (private mode etc.)
  }
};

export const markPreloaderSeen = () => {
  try {
    sessionStorage.setItem(PRELOADER_KEY, '1');
  } catch {
    /* storage blocked: the intro just plays again next time */
  }
};
