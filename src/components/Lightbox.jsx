import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from '@phosphor-icons/react';

/**
 * Full-screen image viewer.
 *  - `image`: { src, alt } to show, or null to stay closed
 *  - `pannable`: show a wide image at a readable size and let small screens pan sideways
 * Closes on Esc, the close button, or a click on the backdrop.
 */
export default function Lightbox({ image, onClose, pannable = false }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!image) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    closeRef.current?.focus();
    return () => window.removeEventListener('keydown', onKey);
  }, [image, onClose]);

  // Portal to <body>: inside a section it would sit under the fixed nav bar
  return createPortal(
    <AnimatePresence>
      {image && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={image.alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[9990] bg-ink/90 flex items-center justify-center p-3 sm:p-4"
        >
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close"
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-12 h-12 rounded-full bg-accent-yellow border-2 border-ink flex items-center justify-center shadow-[4px_4px_0_0_#000]"
          >
            <X size={24} weight="bold" />
          </button>

          {/* data-lenis-prevent: let this box scroll natively instead of the page */}
          <div
            data-lenis-prevent
            onClick={(e) => e.stopPropagation()}
            className={pannable ? 'max-w-full max-h-full overflow-auto overscroll-contain border-4 border-ink bg-white shadow-[8px_8px_0_0_#000]' : ''}
          >
            <motion.img
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
              src={image.src}
              alt={image.alt}
              className={
                pannable
                  ? 'block max-w-none w-[1000px] md:w-[min(1200px,90vw)]'
                  : 'max-h-[90vh] max-w-full border-4 border-ink shadow-[8px_8px_0_0_#000] bg-white'
              }
            />
          </div>

          {pannable && (
            <p className="absolute bottom-4 left-0 w-full text-center font-handwriting text-xl text-paper pointer-events-none md:hidden">
              drag to look around ↔
            </p>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
