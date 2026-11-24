import { useEffect, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { ArrowUp, CalendarDays } from 'lucide-react';
import { WhatsAppIcon } from '../common/BrandIcons.jsx';
import ResortChat from './ResortChat.jsx';
import { channels, openBooking, whatsappLink } from '../../utils/links.js';

/** Bottom-right floating buttons: back to top, Book Your Stay, and WhatsApp (when configured). */
export default function FloatingActions() {
  const [showBook, setShowBook] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [nearContact, setNearContact] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setShowBook(y > 600);
      setShowTop(y > 900);
      const contact = document.getElementById('contact');
      if (contact) {
        const rect = contact.getBoundingClientRect();
        setNearContact(rect.top < window.innerHeight * 0.8 && rect.bottom > 0);
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const spring = { type: 'spring', stiffness: 350, damping: 26 };

  return (
    <>
    <div className="pointer-events-none fixed bottom-5 right-4 z-30 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {showTop && (
          <m.button
            key="top"
            type="button"
            initial={{ opacity: 0, y: 12, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.8 }}
            whileHover={{ y: -2 }}
            transition={spring}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="pointer-events-auto rounded-full border border-gold-400/40 bg-cocoa-950/90 p-3 text-gold-300 shadow-xl backdrop-blur-md transition-colors hover:bg-cocoa-800"
            aria-label="Back to top"
          >
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
          </m.button>
        )}

        {showBook && channels.whatsapp && (
          <m.a
            key="wa"
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={spring}
            className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#1F8F4E] text-white shadow-xl transition hover:scale-105"
            aria-label="Chat with ARUGA RESORT on WhatsApp"
          >
            <WhatsAppIcon className="h-6 w-6" />
          </m.a>
        )}

        {showBook && !nearContact && (
          <m.button
            key="book"
            type="button"
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.92 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={spring}
            onClick={openBooking}
            className="pointer-events-auto relative hidden items-center gap-2.5 overflow-hidden rounded-full sm:flex border border-gold-400/60 bg-gradient-to-r from-cocoa-950 via-cocoa-900 to-cocoa-950 px-5 py-3 text-xs font-bold uppercase tracking-wider text-gold-200 shadow-[0_12px_32px_rgba(34,18,8,0.45)] sm:text-sm"
          >
            <span
              className="pointer-events-none absolute inset-0 w-1/2 animate-sheen bg-gradient-to-r from-transparent via-gold-300/30 to-transparent"
              aria-hidden="true"
            />
            <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-400 opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gold-400" />
            </span>
            <CalendarDays className="relative h-4 w-4 text-gold-400" aria-hidden="true" />
            <span className="relative">Book Your Stay</span>
          </m.button>
        )}
      </AnimatePresence>
    </div>
    <div className="pointer-events-none fixed bottom-5 left-4 z-30 sm:bottom-6 sm:left-6">
      <ResortChat />
    </div>
    </>
  );
}
