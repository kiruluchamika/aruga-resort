import { useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { BedDouble, Check, ChevronLeft, ChevronRight, Info, Maximize2, MessageSquareText, X } from 'lucide-react';
import Reveal from '../common/Reveal.jsx';
import SectionHeader from '../common/SectionHeader.jsx';
import ResortImage from '../common/ResortImage.jsx';
import Lightbox from '../common/Lightbox.jsx';
import CabanaPackages from './CabanaPackages.jsx';
import { cabanas, resort } from '../../data/resortConfig.js';
import { getImage } from '../../data/galleryData.js';
import { useDialog } from '../../hooks/useDialog.js';
import { scrollToSection } from '../../utils/links.js';

const photos = cabanas.images.map(getImage).filter(Boolean);

const enquire = () => {
  scrollToSection('contact');
  window.setTimeout(() => document.getElementById('enquiry-name')?.focus({ preventScroll: true }), 700);
};

function FeatureList({ className = '' }) {
  return (
    <ul className={`grid grid-cols-1 gap-2 text-sm text-stone-700 sm:grid-cols-2 ${className}`}>
      {cabanas.features.map((f) => (
        <li key={f} className="flex items-center gap-2">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ocean-50 text-ocean-700">
            <Check className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
          {f}
        </li>
      ))}
    </ul>
  );
}

function CabanaDetails({ open, onClose }) {
  const [active, setActive] = useState(0);
  const ref = useDialog(open, onClose);
  const photo = photos[active];

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6">
          <m.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <m.div
            ref={ref}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cabana-details-title"
            tabIndex={-1}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-3xl bg-ivory-50 shadow-2xl sm:rounded-3xl"
          >
            <button
              type="button"
              onClick={onClose}
              data-autofocus
              className="absolute right-4 top-4 z-10 rounded-full bg-cocoa-950/70 p-2 text-white backdrop-blur transition hover:bg-gold-500 hover:text-cocoa-950"
              aria-label="Close cabana details"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="bg-sand-100 p-4 sm:p-6">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-sand-200">
                  <ResortImage image={photo} sizes="(min-width: 768px) 28rem, 92vw" className="h-full w-full object-cover" />
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {photos.map((p, i) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setActive(i)}
                      aria-label={`Show ${p.title}`}
                      aria-pressed={active === i}
                      className={`aspect-[4/3] overflow-hidden rounded-xl border-2 transition ${
                        active === i ? 'border-gold-500' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <ResortImage image={p} sizes="120px" alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col p-6 sm:p-8">
                <span className="mb-1 text-xs font-bold uppercase tracking-wider text-gold-800">{cabanas.availabilityNote}</span>
                <h3 id="cabana-details-title" className="mb-1 font-serif text-3xl font-bold text-cocoa-900">
                  {cabanas.collectionName}
                </h3>
                <p className="mb-4 text-xs italic text-stone-600">{cabanas.collectionTagline}</p>
                <p className="mb-6 text-sm leading-relaxed text-stone-700">{cabanas.description}</p>

                <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-stone-700">Every cabana includes</h4>
                <FeatureList className="mb-6 sm:grid-cols-1" />

                <dl className="mb-6 grid grid-cols-3 gap-2 text-center">
                  {cabanas.stats.map((s) => (
                    <div key={s.label} className="rounded-xl border border-sand-200 bg-white p-2">
                      <dt className="text-[10px] font-semibold uppercase text-stone-600">{s.label}</dt>
                      <dd className="text-xs font-bold text-cocoa-900 sm:text-sm">{s.value}</dd>
                    </div>
                  ))}
                </dl>

                {cabanas.note && (
                  <p className="mb-6 flex items-start gap-2 rounded-xl bg-ocean-50 p-3 text-xs leading-relaxed text-ocean-900">
                    <Info className="mt-0.5 h-4 w-4 shrink-0 text-ocean-700" aria-hidden="true" />
                    {cabanas.note}
                  </p>
                )}

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    enquire();
                  }}
                  className="btn-gold mt-auto w-full"
                >
                  <MessageSquareText className="h-4 w-4" aria-hidden="true" />
                  Booking Inquiry
                </button>
              </div>
            </div>
          </m.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default function Cabanas() {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const photo = photos[active];
  const step = (n) => setActive((i) => (i + n + photos.length) % photos.length);

  return (
    <section id="cabanas" aria-labelledby="cabanas-title" className="bg-ivory-100 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          id="cabanas-title"
          icon={BedDouble}
          eyebrow={cabanas.eyebrow}
          titleStart={cabanas.titleStart}
          titleAccent={cabanas.titleAccent}
          intro={cabanas.subtitle}
        >
          <div className="mt-6 flex flex-wrap justify-center gap-2 sm:gap-3">
            {[`${resort.cabanaCount} Cabanas`, 'Beachfront Views', 'Attached Bathrooms'].map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-sand-300 bg-white px-4 py-2 text-xs font-semibold tracking-wide text-cocoa-800 sm:text-sm"
              >
                {chip}
              </span>
            ))}
          </div>
          <CabanaPackages />
        </SectionHeader>

        <Reveal
          y={40}
          className="grid grid-cols-1 overflow-hidden rounded-3xl border border-sand-300 bg-white shadow-xl transition-shadow duration-300 hover:shadow-2xl lg:grid-cols-12"
        >
          {/* Photos */}
          <div className="relative flex flex-col justify-between bg-sand-50 p-4 sm:p-6 lg:col-span-7">
            <div className="hover-sheen group/img relative aspect-[16/10] overflow-hidden rounded-2xl bg-sand-200 shadow-inner">
              <AnimatePresence initial={false} mode="popLayout">
                <m.div
                  key={photo.id}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45 }}
                >
                  <ResortImage
                    image={photo}
                    sizes="(min-width: 1024px) 52vw, 92vw"
                    className="h-full w-full object-cover transition-all duration-700 ease-out group-hover/img:scale-108 group-hover/img:brightness-105"
                  />
                </m.div>
              </AnimatePresence>
              <button
                type="button"
                onClick={() => setLightbox(active)}
                className="absolute inset-0 z-[5] cursor-zoom-in"
                aria-label={`Enlarge photo: ${photo.title}`}
              />
              <span className="pointer-events-none absolute left-4 top-4 z-[6] rounded-full border border-gold-400/40 bg-cocoa-900/90 px-3 py-1.5 text-xs font-bold text-gold-300 shadow backdrop-blur-md">
                {cabanas.collectionName}
              </span>
              <span className="pointer-events-none absolute bottom-4 right-4 z-[6] flex items-center gap-1.5 rounded-md bg-black/60 px-2.5 py-1 text-xs text-white backdrop-blur-sm">
                <Maximize2 className="h-3 w-3" aria-hidden="true" />
                Photo {active + 1} of {photos.length}
              </span>
              {photos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    className="absolute left-3 top-1/2 z-[6] -translate-y-1/2 rounded-full border border-gold-400/40 bg-cocoa-950/70 p-2 text-gold-300 shadow-lg backdrop-blur-md transition-all hover:scale-110 hover:bg-cocoa-950 sm:opacity-0 sm:group-hover/img:opacity-100 sm:focus-visible:opacity-100"
                    aria-label="Previous cabana photo"
                  >
                    <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    className="absolute right-3 top-1/2 z-[6] -translate-y-1/2 rounded-full border border-gold-400/40 bg-cocoa-950/70 p-2 text-gold-300 shadow-lg backdrop-blur-md transition-all hover:scale-110 hover:bg-cocoa-950 sm:opacity-0 sm:group-hover/img:opacity-100 sm:focus-visible:opacity-100"
                    aria-label="Next cabana photo"
                  >
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </>
              )}
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
              {photos.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  aria-label={`Show ${p.title}`}
                  aria-pressed={active === i}
                  className={`group/thumb relative aspect-[4/3] overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                    active === i
                      ? 'scale-105 border-gold-500 shadow-md ring-2 ring-gold-400/30'
                      : 'border-transparent opacity-70 hover:scale-105 hover:border-gold-300 hover:opacity-100'
                  }`}
                >
                  <ResortImage
                    image={p}
                    sizes="160px"
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover/thumb:scale-110"
                  />
                </button>
              ))}
            </div>

            <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-sand-200 pt-4 text-center">
              {cabanas.stats.map((s) => (
                <div key={s.label} className="rounded-xl border border-sand-100 bg-white p-2 shadow-sm">
                  <dt className="block text-[10px] font-semibold uppercase text-stone-600">{s.label}</dt>
                  <dd className="text-xs font-bold text-cocoa-900 sm:text-sm">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-5">
            <div>
              <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-gold-800">{cabanas.availabilityNote}</span>
              <h3 className="mb-1 font-serif text-2xl font-bold text-cocoa-900 sm:text-3xl">{cabanas.collectionName}</h3>
              <p className="mb-4 text-xs italic text-stone-600">{cabanas.collectionTagline}</p>
              <p className="mb-6 text-sm leading-relaxed text-stone-700">{cabanas.description}</p>

              <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-stone-700">Every cabana includes</h4>
              <FeatureList className="mb-6" />

              {cabanas.note && (
                <p className="mb-6 flex items-start gap-2 rounded-xl border border-ocean-100 bg-ocean-50 p-3 text-xs leading-relaxed text-ocean-900">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-ocean-700" aria-hidden="true" />
                  {cabanas.note}
                </p>
              )}
            </div>

            <div className="border-t border-sand-200 pt-6">
              {cabanas.price && <p className="mb-4 font-serif text-2xl font-bold text-cocoa-900">{cabanas.price}</p>}
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <button type="button" onClick={() => setDetailsOpen(true)} className="btn-outline flex-1 px-5">
                  <Info className="h-4 w-4" aria-hidden="true" />
                  View Details
                </button>
                <button type="button" onClick={enquire} className="btn-gold flex-1 px-5">
                  <MessageSquareText className="h-4 w-4" aria-hidden="true" />
                  Booking Inquiry
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <CabanaDetails open={detailsOpen} onClose={() => setDetailsOpen(false)} />
      <Lightbox images={photos} index={lightbox} onClose={() => setLightbox(null)} onIndexChange={setLightbox} label="Cabana photos" />
    </section>
  );
}
