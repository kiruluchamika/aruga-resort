import { useState } from 'react';
import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import { BedDouble, ChevronDown, Check } from 'lucide-react';
import { cabanaPricing, formatCabanaRate } from '../../data/cabanaPackages.js';
import { useEnquiry } from '../../context/EnquiryContext.jsx';
import { scrollToSection } from '../../utils/links.js';

export default function CabanaPackages() {
  const [open, setOpen] = useState(false);
  const [roomId, setRoomId] = useState('double');
  const [packageId, setPackageId] = useState('room-only');
  const { draft, updateDraft } = useEnquiry();
  const reduceMotion = useReducedMotion();
  const room = cabanaPricing.rooms.find((item) => item.id === roomId);
  const selectedPackage = cabanaPricing.packages.find((item) => item.id === packageId);
  const price = formatCabanaRate(selectedPackage.rates[roomId]);

  function enquire() {
    const selection = `I am interested in a ${room.name} with ${selectedPackage.name} (${price}${cabanaPricing.basis ? ` ${cabanaPricing.basis}` : ''}). Please confirm availability for my stay.`;
    updateDraft({ message: draft.message ? `${draft.message}\n\n${selection}` : selection });
    scrollToSection('contact');
  }

  return (
    <div className="mt-4">
      <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="cabana-packages" className="inline-flex items-center gap-2 rounded-full border border-gold-400 bg-cocoa-900 px-5 py-3 text-sm font-semibold text-gold-200 transition-colors hover:bg-cocoa-800">
        <BedDouble className="h-4 w-4" aria-hidden="true" />
        Cabana Categories & Prices
        <ChevronDown className={`h-4 w-4 transition-transform motion-reduce:transition-none ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <m.div id="cabana-packages" key="packages" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.25 }} className="overflow-hidden text-left">
            <div className="mt-6 rounded-3xl border border-sand-300 bg-white p-5 shadow-lg sm:p-7">
              <h3 className="font-serif text-3xl font-bold text-cocoa-900">Choose your coastal stay</h3>
              <p className="mt-2 text-base text-stone-600">Explore our room types and find the meal package that suits you.</p>
              <div role="group" aria-label="Cabana category" className="my-5 grid grid-cols-2 gap-3">
                {cabanaPricing.rooms.map((item) => (
                  <button key={item.id} type="button" aria-pressed={roomId === item.id} onClick={() => setRoomId(item.id)} className={`rounded-2xl border p-4 text-left transition-colors ${roomId === item.id ? 'border-cocoa-900 bg-cocoa-900 text-white' : 'border-sand-300 bg-sand-50 text-cocoa-900 hover:border-gold-500'}`}>
                    <span className="block text-base font-semibold">{item.name}</span>
                    {item.count != null && <span className="mt-1 block text-sm">{item.count} cabanas</span>}
                  </button>
                ))}
              </div>
              <m.div key={roomId} initial={{ opacity: 0, y: reduceMotion ? 0 : 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.2 }}>
                <h4 className="mb-3 font-serif text-2xl font-bold text-cocoa-900">{room.name}</h4>
                <div className="space-y-3 text-base leading-relaxed text-stone-700">
                  {room.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </m.div>
              <fieldset className="mt-6">
                <legend className="text-base font-semibold text-cocoa-900">Select your meal package</legend>
                {cabanaPricing.basis && <p className="mt-1 text-sm text-stone-600">Prices in {cabanaPricing.currency}, {cabanaPricing.basis}.</p>}
                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {cabanaPricing.packages.map((item) => (
                    <label key={item.id} className={`flex cursor-pointer flex-col rounded-2xl border p-4 transition-colors ${packageId === item.id ? 'border-gold-500 bg-gold-50 ring-1 ring-gold-500' : 'border-sand-300 bg-white hover:bg-sand-50'}`}>
                      <span className="flex items-center gap-2 text-base font-semibold text-cocoa-900">
                        <input type="radio" name="cabana-package" value={item.id} checked={packageId === item.id} onChange={() => setPackageId(item.id)} className="h-4 w-4 accent-amber-800" />
                        {item.name}
                      </span>
                      <span className="my-2 block text-sm leading-relaxed text-stone-600">{item.description}</span>
                      <span className="mt-auto block text-xl font-bold text-cocoa-900">{formatCabanaRate(item.rates[roomId])}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="mt-5 rounded-2xl bg-sand-100 p-4">
                <p className="flex items-center gap-2 text-sm font-semibold text-cocoa-900"><Check className="h-4 w-4 shrink-0" aria-hidden="true" />{room.name} · {selectedPackage.name}</p>
                <p className="mt-2 text-lg font-bold text-cocoa-900">{price} <span className="text-sm font-normal text-stone-600">{cabanaPricing.basis}</span></p>
                <button type="button" onClick={enquire} className="btn-gold mt-4 w-full">Enquire about this package</button>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
