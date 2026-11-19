import { Sparkles } from 'lucide-react';
import Icon from '../common/Icon.jsx';
import Logo from '../common/Logo.jsx';
import Reveal from '../common/Reveal.jsx';
import SectionHeader from '../common/SectionHeader.jsx';
import { about } from '../../data/resortConfig.js';

/** Dark storytelling band: the meaning behind the ARUGA emblem. */
export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative overflow-hidden bg-cocoa-950 py-20 text-stone-100 sm:py-28"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cocoa-800/40 blur-3xl" />
      <div className="dot-pattern pointer-events-none absolute inset-0 opacity-[0.06]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          dark
          id="about-title"
          icon={Sparkles}
          eyebrow={about.eyebrow}
          titleStart={about.titleStart}
          titleAccent={about.titleAccent}
          intro={about.body}
        />

        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="flex flex-col items-center text-center lg:col-span-4" y={40}>
            <div className="rounded-[2rem] border border-gold-400/40 bg-ivory-100 p-4 shadow-2xl transition-transform duration-500 hover:-translate-y-1">
              <Logo size="lg" loading="lazy" className="h-auto w-56 sm:w-64" />
            </div>
            <p className="mt-6 max-w-xs font-serif text-lg italic text-gold-200">{about.logoStoryIntro}</p>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-8">
            {about.elements.map((el, i) => (
              <Reveal
                key={el.title}
                delay={i * 0.08}
                className="group rounded-3xl border border-cocoa-800/80 bg-cocoa-900/60 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/60 sm:p-7"
              >
                <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-cocoa-700 bg-cocoa-950 text-gold-300 transition-all group-hover:scale-110 group-hover:border-gold-400">
                  <Icon name={el.icon} className="h-6 w-6" />
                </span>
                <h3 className="mb-2 font-serif text-xl font-bold text-white transition-colors group-hover:text-gold-200">
                  {el.title}
                </h3>
                <p className="text-sm font-light leading-relaxed text-stone-300">{el.text}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="mt-14 grid grid-cols-1 gap-6 rounded-3xl border border-cocoa-800 bg-cocoa-900/40 p-8 text-center sm:grid-cols-3">
          {about.stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center">
              <Icon name={s.icon} className="mb-2 h-6 w-6 text-gold-400" />
              <span className="font-serif text-3xl font-bold text-gold-200">{s.value}</span>
              <span className="text-xs text-stone-300">{s.label}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
