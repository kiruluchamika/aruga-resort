import { useCallback, useRef } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useDialog } from '../../hooks/useDialog.js';
import { asset } from '../../utils/links.js';

/**
 * Full-screen photo viewer.
 * Keyboard: ← → to move, Esc to close. Touch: swipe left/right.
 */
export default function Lightbox({ images, index, onClose, onIndexChange, label = 'Photo viewer' }) {
  const open = index !== null && index >= 0 && Boolean(images[index]);
  const count = images.length;

  const go = useCallback(
    (step) => onIndexChange((current) => (current + step + count) % count),
    [count, onIndexChange],
  );

  const ref = useDialog(open, onClose, {
    onKeyDown: (e) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    },
  });

  const touch = useRef(null);
  const onTouchStart = (e) => {
    touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e) => {
    if (!touch.current) return;
    const dx = e.changedTouches[0].clientX - touch.current.x;
    const dy = e.changedTouches[0].clientY - touch.current.y;
    touch.current = null;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
  };

  const image = open ? images[index] : null;

  return (
    <AnimatePresence>
      {open && (
        <m.div
          key="lightbox"
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-label={label}
          tabIndex={-1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md sm:p-8"
        >
          <button
            type="button"
            onClick={onClose}
            data-autofocus
            className="absolute right-4 top-4 z-10 rounded-full bg-stone-800 p-2.5 text-stone-200 transition hover:bg-gold-500 hover:text-cocoa-950 sm:right-6 sm:top-6"
            aria-label="Close photo viewer"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>

          {count > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-stone-800/80 p-2.5 text-white transition hover:bg-gold-500 hover:text-cocoa-950 sm:left-8 sm:p-3"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-6 w-6" aria-hidden="true" />
            </button>
          )}

          <div onClick={(e) => e.stopPropagation()} className="flex max-h-[88vh] w-full max-w-5xl flex-col items-center">
            <AnimatePresence mode="wait" initial={false}>
              <m.img
                key={image.src}
                src={asset(image.src)}
                alt={image.alt}
                width={image.width}
                height={image.height}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25 }}
                className="max-h-[74vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
                draggable="false"
              />
            </AnimatePresence>
            <div className="mt-4 px-10 text-center text-white" aria-live="polite">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-widest text-gold-400">
                {image.category} • {index + 1} of {count}
              </span>
              <p className="font-serif text-xl font-bold sm:text-2xl">{image.title}</p>
            </div>
          </div>

          {count > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-stone-800/80 p-2.5 text-white transition hover:bg-gold-500 hover:text-cocoa-950 sm:right-8 sm:p-3"
              aria-label="Next photo"
            >
              <ChevronRight className="h-6 w-6" aria-hidden="true" />
            </button>
          )}
        </m.div>
      )}
    </AnimatePresence>
  );
}
