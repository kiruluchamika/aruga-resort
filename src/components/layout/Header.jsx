import { useEffect, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { ArrowRight, CalendarDays, MapPin, Menu, X } from 'lucide-react';
import Logo from '../common/Logo.jsx';
import { navigation, resort } from '../../data/resortConfig.js';
import { useActiveSection, useScrolledPast } from '../../hooks/useScrollState.js';
import { useDialog } from '../../hooks/useDialog.js';
import { openBooking } from '../../utils/links.js';

const sectionIds = navigation.map((n) => n.href.slice(1));

function BookButton({ className = '', onClick }) {
  return (
    <button
      type="button"
      onClick={() => {
        onClick?.();
        openBooking();
      }}
      className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-gold-400/40 bg-cocoa-900 px-5 py-2.5 text-sm font-semibold tracking-wide text-gold-200 shadow-sm transition-all duration-300 hover:bg-cocoa-800 hover:text-gold-100 ${className}`}
    >
      <CalendarDays className="h-4 w-4 text-gold-400 transition-transform group-hover:scale-110" aria-hidden="true" />
      <span>Book Your Stay</span>
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
    </button>
  );
}

export default function Header() {
  const scrolled = useScrolledPast(40);
  const active = useActiveSection(sectionIds);
  const [menuOpen, setMenuOpen] = useState(false);
  const drawerRef = useDialog(menuOpen, () => setMenuOpen(false));

  // Close the drawer if the viewport grows to desktop size.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1280px)');
    const onChange = (e) => e.matches && setMenuOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-cocoa-900 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-gold-200"
      >
        Skip to content
      </a>
      <header
        className={`sticky top-0 z-40 border-b bg-ivory-100 py-2.5 transition-all duration-300 ${
          scrolled ? 'border-sand-300/70 shadow-md' : 'border-sand-300/50'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <a href="#home" className="group flex shrink-0 items-center py-0.5" aria-label={`${resort.name} — back to top`}>
            <Logo className="h-14 w-auto transition-transform duration-300 group-hover:scale-105 sm:h-16" />
          </a>

          <nav aria-label="Main" className="hidden items-center gap-6 xl:flex 2xl:gap-7">
            {navigation.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative py-1 text-sm font-medium transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-gold-500 after:transition-all after:duration-300 hover:text-gold-700 hover:after:w-full ${
                    isActive ? 'text-gold-800 after:w-full' : 'text-cocoa-900 after:w-0'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <BookButton className="hidden sm:inline-flex" />
            <button
              type="button"
              onClick={openBooking}
              className="rounded-full bg-cocoa-900 px-4 py-2 text-xs font-semibold text-gold-200 sm:hidden"
            >
              Book
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="rounded-lg p-2 text-cocoa-900 transition-colors hover:bg-sand-200/60 xl:hidden"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <div className="fixed inset-0 z-50 xl:hidden">
            <m.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />
            <m.div
              id="mobile-menu"
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              tabIndex={-1}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
              className="absolute bottom-0 right-0 top-0 flex w-80 max-w-[88vw] flex-col justify-between overflow-y-auto bg-ivory-100 p-6 shadow-2xl"
            >
              <div>
                <div className="flex items-center justify-between border-b border-sand-300 pb-4">
                  <Logo className="h-14 w-auto" />
                  <button
                    type="button"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-full p-1.5 text-stone-600 transition hover:bg-sand-200 hover:text-cocoa-950"
                    aria-label="Close menu"
                  >
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <nav aria-label="Mobile" className="mt-6 flex flex-col gap-1">
                  {navigation.map((item, i) => {
                    const isActive = active === item.href.slice(1);
                    return (
                      <m.a
                        key={item.href}
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 + i * 0.03 }}
                        aria-current={isActive ? 'true' : undefined}
                        className={`rounded-xl px-3 py-2.5 font-serif text-xl font-semibold transition-colors ${
                          isActive ? 'bg-sand-200/70 text-gold-800' : 'text-cocoa-900 hover:bg-sand-100 hover:text-gold-700'
                        }`}
                      >
                        {item.label}
                      </m.a>
                    );
                  })}
                </nav>
              </div>
              <div className="mt-8 border-t border-sand-300 pt-6">
                <BookButton className="w-full justify-center py-3" onClick={() => setMenuOpen(false)} />
                <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-stone-600">
                  <MapPin className="h-3.5 w-3.5 text-ocean-600" aria-hidden="true" />
                  {resort.location.display}
                </p>
              </div>
            </m.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
