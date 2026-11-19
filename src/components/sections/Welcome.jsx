import { CircleCheck, Sparkles } from 'lucide-react';
import Reveal from '../common/Reveal.jsx';
import ResortImage from '../common/ResortImage.jsx';
import { resort, welcome } from '../../data/resortConfig.js';
import { getImage } from '../../data/galleryData.js';

export default function Welcome() {
  const main = getImage(welcome.mainImage);
  const secondary = getImage(welcome.secondaryImage);

  return (
    <section id="welcome" aria-labelledby="welcome-title" className="relative overflow-hidden bg-sand-100/60 py-20 sm:py-28">
      <div className="pointer-events-none absolute right-0 top-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-cocoa-900 opacity-[0.04]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Photo collage */}
          <Reveal className="relative lg:col-span-6" y={40}>
            <div className="relative mx-auto max-w-md pb-6 lg:max-w-none">
              <div className="hover-sheen group relative aspect-[4/5] max-h-[540px] overflow-hidden rounded-3xl border-4 border-white shadow-2xl">
                <ResortImage
                  image={main}
                  sizes="(min-width: 1024px) 40vw, (min-width: 640px) 28rem, 92vw"
                  className="h-full w-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cocoa-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white transition-transform duration-300 group-hover:-translate-y-1 sm:right-auto sm:max-w-[44%]">
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-widest text-gold-300">
                    {welcome.imageCaptionEyebrow}
                  </span>
                  <p className="font-serif text-2xl font-bold">{welcome.imageCaption}</p>
                </div>
              </div>

              {secondary && (
                <div className="hover-sheen group absolute -bottom-4 -right-4 hidden aspect-[4/3] w-1/2 overflow-hidden rounded-2xl border-4 border-white shadow-2xl transition-all duration-500 hover:-translate-y-2 sm:block lg:-right-6">
                  <ResortImage
                    image={secondary}
                    sizes="(min-width: 1024px) 24vw, 18rem"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                </div>
              )}

              <div className="absolute -left-3 -top-6 flex items-center gap-3 rounded-2xl border border-gold-400/40 bg-cocoa-900 p-4 text-gold-300 shadow-xl sm:-left-6">
                <span className="font-serif text-4xl font-bold leading-none text-gold-300">{resort.cabanaCount}</span>
                <span className="text-xs font-semibold uppercase leading-tight tracking-wider text-stone-200">
                  Beachfront-View
                  <br />
                  Cabanas
                </span>
              </div>
            </div>
          </Reveal>

          {/* Story */}
          <Reveal className="flex flex-col justify-center lg:col-span-6" delay={0.1}>
            <div className="eyebrow-pill mb-4 w-fit">
              <Sparkles className="h-3.5 w-3.5 text-gold-600" aria-hidden="true" />
              <span>{welcome.eyebrow}</span>
            </div>
            <h2 id="welcome-title" className="mb-6 font-serif text-3xl font-bold leading-tight text-cocoa-900 sm:text-4xl lg:text-5xl">
              {welcome.titleStart} <span className="section-title-accent">{welcome.titleAccent}</span>
            </h2>
            <p className="mb-6 text-base font-light leading-relaxed text-stone-700 sm:text-lg">{welcome.body}</p>

            <ul className="mb-8 space-y-4 text-sm text-stone-700 sm:text-base">
              {welcome.points.map((p) => (
                <li key={p.title} className="flex items-start gap-3">
                  <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-ocean-600" aria-hidden="true" />
                  <p>
                    <strong className="font-semibold text-cocoa-900">{p.title}:</strong> {p.text}
                  </p>
                </li>
              ))}
            </ul>

            <figure className="rounded-2xl border-l-4 border-gold-500 bg-white p-5 shadow-sm sm:p-6">
              <blockquote className="mb-3 font-serif text-lg italic leading-relaxed text-cocoa-900">
                “{welcome.quote}”
              </blockquote>
              <figcaption className="flex items-center justify-between border-t border-sand-200 pt-2 text-xs">
                <span className="text-stone-600">{resort.location.display}</span>
                <span className="font-serif font-bold uppercase tracking-widest text-gold-700">{resort.shortName}</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
