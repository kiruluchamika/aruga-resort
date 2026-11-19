import { ArrowRight, Check, Compass, Info } from 'lucide-react';
import Icon from '../common/Icon.jsx';
import Reveal from '../common/Reveal.jsx';
import SectionHeader from '../common/SectionHeader.jsx';
import ResortImage from '../common/ResortImage.jsx';
import { experiences } from '../../data/resortConfig.js';
import { getImage } from '../../data/galleryData.js';

// Each card's illustrated header uses one of the logo colours.
const tones = [
  'from-ocean-500 via-ocean-700 to-ocean-900',
  'from-ocean-600 via-ocean-800 to-cocoa-900',
  'from-terracotta-600 via-terracotta-700 to-cocoa-950',
  'from-gold-700 via-cocoa-700 to-cocoa-950',
];

export default function Experiences() {
  return (
    <section id="experiences" aria-labelledby="experiences-title" className="bg-ivory-100 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          id="experiences-title"
          icon={Compass}
          eyebrow={experiences.eyebrow}
          titleStart={experiences.titleStart}
          titleAccent={experiences.titleAccent}
          intro={experiences.intro}
        >
          <p className="mx-auto mt-5 flex max-w-2xl items-start justify-center gap-2 rounded-xl border border-sand-300 bg-white/70 px-4 py-3 text-left text-xs leading-relaxed text-stone-600 sm:text-sm">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-ocean-600" aria-hidden="true" />
            {experiences.disclaimer}
          </p>
        </SectionHeader>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {experiences.items.map((item, i) => {
            const img = item.image ? getImage(item.image) : null;
            return (
              <Reveal
                as="article"
                key={item.title}
                delay={(i % 2) * 0.1}
                className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-sand-300 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div>
                  <div className="hover-sheen relative aspect-[16/7] overflow-hidden">
                    {img ? (
                      <ResortImage
                        image={img}
                        sizes="(min-width: 768px) 45vw, 92vw"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className={`relative flex h-full w-full items-center justify-center bg-gradient-to-br ${tones[i % tones.length]}`}>
                        <div className="dot-pattern absolute inset-0 opacity-20" />
                        <svg
                          className="absolute bottom-0 left-0 w-full text-white/10"
                          viewBox="0 0 400 60"
                          preserveAspectRatio="none"
                          aria-hidden="true"
                        >
                          <path d="M0 30 C 60 10, 110 50, 170 30 S 280 10, 340 30 S 400 40, 400 40 V60 H0 Z" fill="currentColor" />
                          <path d="M0 42 C 70 25, 120 58, 190 42 S 300 28, 400 46 V60 H0 Z" fill="currentColor" />
                        </svg>
                        <span className="relative flex h-20 w-20 items-center justify-center rounded-full border border-gold-300/40 bg-white/10 text-gold-200 backdrop-blur-sm transition-transform duration-500 group-hover:scale-110">
                          <Icon name={item.icon} className="h-9 w-9" strokeWidth={1.5} />
                        </span>
                      </div>
                    )}
                    <span className="absolute left-4 top-4 rounded-full border border-gold-400/40 bg-cocoa-950/80 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gold-200 backdrop-blur-md">
                      {item.category}
                    </span>
                  </div>

                  <div className="p-6 sm:p-8">
                    <h3 className="mb-3 font-serif text-2xl font-bold text-cocoa-900 transition-colors group-hover:text-gold-800">
                      {item.title}
                    </h3>
                    <p className="mb-6 text-sm font-light leading-relaxed text-stone-700">{item.description}</p>
                    <div className="rounded-2xl border border-sand-200 bg-sand-50 p-4">
                      <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-cocoa-900">Highlights</span>
                      <ul className="grid grid-cols-1 gap-2 text-xs text-stone-700 sm:grid-cols-2">
                        {item.highlights.map((h) => (
                          <li key={h} className="flex items-center gap-1.5">
                            <Check className="h-3.5 w-3.5 shrink-0 text-ocean-600" aria-hidden="true" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 border-t border-sand-100 px-6 pb-6 pt-4 sm:px-8">
                  <span className="text-xs font-medium text-stone-600">Arugam Bay area</span>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-ocean-700 transition hover:text-gold-800"
                  >
                    Plan your stay
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
