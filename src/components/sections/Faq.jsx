import { useId, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { ChevronDown, MessagesSquare } from 'lucide-react';
import Icon from '../common/Icon.jsx';
import Reveal from '../common/Reveal.jsx';
import SectionHeader from '../common/SectionHeader.jsx';
import { faq } from '../../data/resortConfig.js';

export default function Faq() {
  const [open, setOpen] = useState(0);
  const uid = useId();

  return (
    <section id="faq" aria-labelledby="faq-title" className="relative border-t border-sand-300/70 bg-ivory-100 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          id="faq-title"
          icon={MessagesSquare}
          eyebrow="Good to Know"
          titleStart="Frequently Asked"
          titleAccent="Questions"
          intro="Quick answers about staying at ARUGA RESORT."
        />

        <div className="space-y-4">
          {faq.map((item, i) => {
            const isOpen = open === i;
            const panelId = `${uid}-panel-${i}`;
            const buttonId = `${uid}-button-${i}`;
            return (
              <Reveal
                key={item.question}
                delay={i * 0.05}
                y={20}
                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? 'border-gold-400/80 bg-white shadow-md ring-1 ring-gold-400/20'
                    : 'border-sand-300 bg-white/80 hover:border-gold-300 hover:bg-white'
                }`}
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
                  >
                    <span className="flex flex-1 items-center gap-3.5 sm:gap-4">
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors sm:h-10 sm:w-10 ${
                          isOpen ? 'bg-cocoa-900 text-gold-300' : 'bg-sand-100 text-cocoa-900'
                        }`}
                      >
                        <Icon name={item.icon} className="h-4 w-4 sm:h-5 sm:w-5" />
                      </span>
                      <span className="text-base font-semibold leading-snug text-stone-900 sm:text-[17px]">{item.question}</span>
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-transform duration-300 ${
                        isOpen ? 'rotate-180 border-cocoa-900 bg-cocoa-900 text-gold-300' : 'border-sand-300 bg-sand-50 text-stone-600'
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <m.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <p className="border-t border-sand-100 px-5 pb-6 pt-3 text-sm leading-relaxed text-stone-700 sm:px-6 sm:text-[15px]">
                        {item.answer}
                      </p>
                    </m.div>
                  )}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
