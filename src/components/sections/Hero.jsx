import { useEffect, useState } from 'react';
import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Icon from '../common/Icon.jsx';
import Logo from '../common/Logo.jsx';
import ResortImage from '../common/ResortImage.jsx';
import { hero } from '../../data/resortConfig.js';
import { getImage, srcSetFor } from '../../data/galleryData.js';
import { asset, openBooking } from '../../utils/links.js';

const slides = hero.slides.map(getImage).filter(Boolean);
const SLIDE_MS = 6500;

export default function Hero() {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  // Auto-advance (paused for reduced-motion users; dots still work).
  useEffect(() => {
    if (reduceMotion || slides.length < 2) return undefined;
    const timer = setInterval(() => setIndex((i) => (i + 1) % slides.length), SLIDE_MS);
    return () => clearInterval(timer);
  }, [reduceMotion]);

  // Warm the cache for the next slide so the crossfade never flashes.
  useEffect(() => {
    const next = slides[(index + 1) % slides.length];
    if (!next) return;
    const img = new Image();
    img.srcset = srcSetFor(next, asset);
    img.sizes = '100vw';
    img.src = asset(next.src);
  }, [index]);

  const current = slides[index];

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative flex min-h-[calc(100svh-77px)] items-center justify-center overflow-hidden bg-cocoa-950 sm:min-h-[92vh]"
    >
      <AnimatePresence initial={false}>
        {current && (
          <m.div
            key={current.id}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.4, ease: 'easeOut' }, scale: { duration: 7, ease: 'easeOut' } }}
          >
            <ResortImage
              image={current}
              priority={index === 0}
              sizes="100vw"
              alt=""
              className="h-full w-full object-cover object-center"
            />
          </m.div>
        )}
      </AnimatePresence>

      {/* Contrast overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-cocoa-950/95 via-cocoa-950/60 to-black/45" />
      <div className="dot-pattern pointer-events-none absolute inset-0 opacity-10" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-14 text-center text-stone-100 sm:px-6 sm:py-20 lg:px-8">
        <m.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-5 flex justify-center"
        >
          <div className="rounded-2xl border border-gold-400/50 bg-ivory-100/95 px-3 py-2 shadow-2xl backdrop-blur-md transition-transform duration-300 hover:scale-105">
            <Logo className="h-20 w-auto sm:h-28" fetchpriority="high" />
          </div>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold-400/50 bg-cocoa-900/80 px-4 py-1.5 shadow-lg backdrop-blur-md"
        >
          <Sparkles className="h-3.5 w-3.5 shrink-0 text-gold-400" aria-hidden="true" />
          <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-gold-200 sm:text-sm sm:tracking-[0.18em]">
            {hero.announcement}
          </span>
        </m.div>

        <m.h1
          id="hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mb-6 font-serif text-[2.1rem] font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {hero.headlineLine1}
          <br />
          <span className="font-normal italic text-gold-300">{hero.headlineLine2}</span>
        </m.h1>

        <m.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mx-auto mb-8 max-w-3xl text-base font-light leading-relaxed text-stone-200 sm:text-lg md:text-xl"
        >
          {hero.description}
        </m.p>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <button type="button" onClick={openBooking} className="btn-gold w-full sm:w-auto">
            {hero.primaryCta}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
          <a
            href="#cabanas"
            className="btn w-full border border-stone-300/40 bg-cocoa-900/80 text-stone-100 backdrop-blur-sm hover:border-gold-300 hover:bg-cocoa-800 hover:text-gold-200 sm:w-auto"
          >
            {hero.secondaryCta}
          </a>
        </m.div>

        <m.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mx-auto grid max-w-4xl grid-cols-2 gap-3 border-t border-cocoa-700/70 pt-6 sm:grid-cols-4"
        >
          {hero.features.map((f) => (
            <li
              key={f.title}
              className="flex flex-col items-center rounded-xl border border-cocoa-700/50 bg-cocoa-900/40 p-3 backdrop-blur-sm"
            >
              <Icon name={f.icon} className="mb-1.5 h-5 w-5 text-gold-400" />
              <span className="text-xs font-bold text-stone-100 sm:text-[13px]">{f.title}</span>
              <span className="text-[11px] text-stone-300">{f.text}</span>
            </li>
          ))}
        </m.ul>
      </div>

      {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1" role="group" aria-label="Hero photos">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show photo ${i + 1}: ${s.title}`}
              aria-pressed={index === i}
              className="flex h-6 items-center px-1"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-300 ${
                  index === i ? 'w-8 bg-gold-400' : 'w-2 bg-stone-400/70 hover:bg-stone-200'
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
