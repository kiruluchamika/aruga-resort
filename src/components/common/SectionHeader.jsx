import Reveal from './Reveal.jsx';

/** Centered section heading: pill label, two-tone serif title, gold rule and intro. */
export default function SectionHeader({
  id,
  icon: IconComponent,
  eyebrow,
  titleStart,
  titleAccent,
  intro,
  dark = false,
  className = 'mb-14 sm:mb-16',
  children,
}) {
  return (
    <Reveal className={`mx-auto max-w-3xl text-center ${className}`}>
      <div
        className={
          dark
            ? 'mb-3 inline-flex items-center gap-2 rounded-full border border-gold-400/50 bg-cocoa-900 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-gold-300'
            : 'eyebrow-pill mb-3'
        }
      >
        {IconComponent && (
          <IconComponent className={`h-3.5 w-3.5 ${dark ? 'text-gold-400' : 'text-gold-600'}`} aria-hidden="true" />
        )}
        <span>{eyebrow}</span>
      </div>
      <h2
        id={id}
        className={
          dark
            ? 'font-serif text-3xl font-bold leading-tight text-white sm:text-5xl'
            : 'section-title'
        }
      >
        {titleStart}{' '}
        <span className={dark ? 'font-normal italic text-gold-300' : 'section-title-accent'}>{titleAccent}</span>
      </h2>
      <div className="section-divider" />
      {intro && (
        <p
          className={
            dark
              ? 'text-base font-light leading-relaxed text-stone-300 sm:text-lg'
              : 'section-intro'
          }
        >
          {intro}
        </p>
      )}
      {children}
    </Reveal>
  );
}
