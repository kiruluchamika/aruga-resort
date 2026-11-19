import { Sun } from 'lucide-react';
import Icon from '../common/Icon.jsx';
import Reveal from '../common/Reveal.jsx';
import SectionHeader from '../common/SectionHeader.jsx';
import ResortImage from '../common/ResortImage.jsx';
import { beachfront } from '../../data/resortConfig.js';
import { getImage } from '../../data/galleryData.js';

export default function BeachfrontLiving() {
  const main = getImage(beachfront.mainImage);
  const second = getImage(beachfront.secondaryImage);

  return (
    <section id="beachfront" aria-labelledby="beachfront-title" className="relative bg-sand-100/60 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          id="beachfront-title"
          icon={Sun}
          eyebrow={beachfront.eyebrow}
          titleStart={beachfront.titleStart}
          titleAccent={beachfront.titleAccent}
          intro={beachfront.intro}
        />

        <Reveal
          y={40}
          className="grid grid-cols-1 overflow-hidden rounded-3xl border border-sand-300 bg-white shadow-xl lg:grid-cols-12"
        >
          <div className="flex flex-col gap-3 bg-sand-50 p-4 sm:p-6 lg:col-span-6">
            <div className="hover-sheen group relative aspect-[16/11] overflow-hidden rounded-2xl bg-sand-200 shadow-md">
              <ResortImage
                image={main}
                sizes="(min-width: 1024px) 44vw, 92vw"
                className="h-full w-full object-cover object-[20%_50%] transition-all duration-700 ease-out group-hover:scale-105"
              />
              <span className="absolute left-4 top-4 rounded-full border border-gold-400/40 bg-cocoa-900/90 px-3 py-1.5 text-xs font-bold text-gold-300 shadow backdrop-blur-md">
                {beachfront.badge}
              </span>
            </div>
            {second && (
              <div className="hover-sheen group relative aspect-[16/6] overflow-hidden rounded-2xl bg-sand-200 shadow-md">
                <ResortImage
                  image={second}
                  sizes="(min-width: 1024px) 44vw, 92vw"
                  className="h-full w-full object-cover object-[50%_35%] transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center p-6 sm:p-10 lg:col-span-6">
            <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-gold-800">{beachfront.cardEyebrow}</span>
            <h3 className="mb-4 font-serif text-3xl font-bold text-cocoa-900 sm:text-4xl">{beachfront.cardTitle}</h3>
            <p className="mb-8 text-base font-light leading-relaxed text-stone-700">{beachfront.cardBody}</p>

            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {beachfront.points.map((p, i) => (
                <Reveal
                  as="li"
                  key={p.title}
                  delay={i * 0.08}
                  y={20}
                  className="group rounded-2xl border border-sand-200 bg-ivory-50 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-gold-300 hover:shadow-md"
                >
                  <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-ocean-100 bg-ocean-50 text-ocean-700 transition-colors duration-300 group-hover:bg-cocoa-900 group-hover:text-gold-300">
                    <Icon name={p.icon} className="h-5 w-5" />
                  </span>
                  <p className="mb-1 font-serif text-lg font-bold text-cocoa-900">{p.title}</p>
                  <p className="text-sm leading-relaxed text-stone-600">{p.text}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
