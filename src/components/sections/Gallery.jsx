import { useMemo, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { Camera, Maximize2 } from 'lucide-react';
import SectionHeader from '../common/SectionHeader.jsx';
import ResortImage from '../common/ResortImage.jsx';
import Lightbox from '../common/Lightbox.jsx';
import { gallery } from '../../data/resortConfig.js';
import { galleryCategories, galleryImages } from '../../data/galleryData.js';

// Only offer filters that actually have photos.
const categories = galleryCategories.filter(
  (c) => c === 'All' || galleryImages.some((img) => img.category === c),
);

export default function Gallery() {
  const [filter, setFilter] = useState('All');
  const [openIndex, setOpenIndex] = useState(null);

  const items = useMemo(
    () => galleryImages.filter((img) => filter === 'All' || img.category === filter),
    [filter],
  );

  const cols = items.length % 4 === 0 && items.length >= 8 ? 'lg:grid-cols-4' : 'lg:grid-cols-3';

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="bg-ivory-100 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          id="gallery-title"
          icon={Camera}
          eyebrow={gallery.eyebrow}
          titleStart={gallery.titleStart}
          titleAccent={gallery.titleAccent}
          intro={gallery.subtitle}
        >
          {categories.length > 2 && (
            <div className="mt-8 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter photos">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setFilter(c)}
                  aria-pressed={filter === c}
                  className={`rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-all sm:text-sm ${
                    filter === c
                      ? 'scale-105 border border-gold-400/50 bg-cocoa-900 text-gold-200 shadow-md'
                      : 'border border-sand-300 bg-white text-stone-700 hover:border-gold-300'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          )}
        </SectionHeader>

        <m.ul layout className={`grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 ${cols}`}>
          <AnimatePresence mode="popLayout" initial={false}>
            {items.map((img, i) => (
              <m.li
                layout
                key={img.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(i)}
                  aria-haspopup="dialog"
                  className="hover-sheen group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl bg-sand-200 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
                >
                  <ResortImage
                    image={img}
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 32vw, 48vw"
                    className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-105"
                  />
                  <span className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-cocoa-950/90 via-cocoa-950/30 to-black/10 p-3 text-left text-white opacity-100 transition-opacity duration-300 sm:p-4 md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
                    <span className="translate-y-0 text-[10px] font-bold uppercase tracking-widest text-gold-300 transition-transform duration-300 md:translate-y-2 md:group-hover:translate-y-0">
                      {img.category}
                    </span>
                    <span className="font-serif text-sm font-bold leading-tight transition-transform delay-75 duration-300 sm:text-base md:translate-y-2 md:group-hover:translate-y-0">
                      {img.title}
                    </span>
                  </span>
                  <span className="pointer-events-none absolute inset-0 hidden items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100 md:flex">
                    <span className="flex scale-75 items-center gap-1.5 rounded-full border border-gold-400/60 bg-cocoa-950/90 px-3.5 py-1.5 text-xs font-semibold text-gold-300 shadow-xl backdrop-blur-md transition-transform duration-300 group-hover:scale-100">
                      <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
                      Enlarge
                    </span>
                  </span>
                </button>
              </m.li>
            ))}
          </AnimatePresence>
        </m.ul>
      </div>

      <Lightbox images={items} index={openIndex} onClose={() => setOpenIndex(null)} onIndexChange={setOpenIndex} label="Resort photo gallery" />
    </section>
  );
}
