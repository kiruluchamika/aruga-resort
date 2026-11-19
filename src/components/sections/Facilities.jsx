import { useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import Reveal from '../common/Reveal.jsx';
import SectionHeader from '../common/SectionHeader.jsx';
import ResortImage from '../common/ResortImage.jsx';
import { confirmedFacilityList } from '../../data/galleryData.js';

/**
 * Resort facilities. Renders NOTHING until at least one facility is marked
 * `confirmed: true` in src/data/resortConfig.js.
 */
export default function Facilities() {
  const [activeId, setActiveId] = useState(confirmedFacilityList[0]?.id);
  if (!confirmedFacilityList.length) return null;
  const active = confirmedFacilityList.find((f) => f.id === activeId) || confirmedFacilityList[0];

  return (
    <section id="facilities" aria-labelledby="facilities-title" className="bg-ivory-100 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          id="facilities-title"
          icon={Sparkles}
          eyebrow="Around the Resort"
          titleStart="Resort"
          titleAccent="Facilities"
          intro="A closer look at the spaces available to guests at ARUGA RESORT."
          className="mb-10"
        />

        {confirmedFacilityList.length > 1 && (
          <div className="mb-10 flex flex-wrap justify-center gap-2 sm:gap-3" role="group" aria-label="Choose a facility">
            {confirmedFacilityList.map((f) => (
              <button
                key={f.id}
                type="button"
                aria-pressed={active.id === f.id}
                onClick={() => setActiveId(f.id)}
                className={`rounded-full px-5 py-2.5 text-xs font-semibold tracking-wide transition-all duration-300 sm:text-sm ${
                  active.id === f.id
                    ? 'scale-105 border border-gold-400/50 bg-cocoa-900 text-gold-200 shadow-md'
                    : 'border border-sand-300 bg-white text-stone-700 hover:border-gold-300 hover:bg-sand-50'
                }`}
              >
                {f.name}
              </button>
            ))}
          </div>
        )}

        <Reveal className="grid grid-cols-1 overflow-hidden rounded-3xl border border-sand-300 bg-white shadow-xl lg:grid-cols-12">
          <div className="bg-sand-50 p-4 sm:p-6 lg:col-span-7">
            <div className="hover-sheen relative aspect-[16/10] overflow-hidden rounded-2xl bg-sand-200">
              <AnimatePresence initial={false} mode="popLayout">
                <m.div
                  key={active.id}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <ResortImage image={active.img} sizes="(min-width: 1024px) 52vw, 92vw" className="h-full w-full object-cover" />
                </m.div>
              </AnimatePresence>
            </div>
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-8 lg:col-span-5">
            <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-gold-800">ARUGA RESORT</span>
            <h3 className="mb-4 font-serif text-3xl font-bold text-cocoa-900">{active.name}</h3>
            <p className="text-sm leading-relaxed text-stone-700">{active.description}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
