import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { hasSeenPreloader, markPreloaderSeen } from '../utils/session';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(() => !hasSeenPreloader());
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) return; // already shown this session
    // Quick intro: reach 100% in 1.6 seconds
    const duration = 1600;
    const intervalTime = 25;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      // Easing function for progress (ease-out)
      const t = currentStep / steps;
      const easeOut = 1 - Math.pow(1 - t, 3);
      const newProgress = Math.min(Math.round(easeOut * 100), 100);
      
      setProgress(newProgress);
      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, intervalTime);

    const timer = setTimeout(() => {
      setIsLoading(false);
      markPreloaderSeen();
    }, duration);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100vh" }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-paper overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #2b2a29 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>

          {/* Main Container */}
          <div className="flex flex-col items-center justify-center text-center relative z-10">
            {/* Percentage Text */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-display text-[6rem] md:text-[10rem] lg:text-[14rem] text-ink leading-none tracking-tighter"
            >
              {progress}%
            </motion.div>
            
            {/* Progress Bar */}
            <div className="w-64 md:w-96 h-6 bg-paper mt-8 overflow-hidden relative border-4 border-ink shadow-[4px_4px_0_0_#2b2a29]">
              <motion.div 
                className="h-full bg-accent-pink"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
            </div>
            
            {/* Little Text */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8 font-handwriting text-2xl md:text-3xl text-ink bg-accent-yellow px-4 py-2 border-2 border-ink transform -rotate-2 shadow-[2px_2px_0_0_#2b2a29]"
            >
              loading awesomeness...
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
