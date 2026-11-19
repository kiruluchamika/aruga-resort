import { useId } from 'react';
import { BedDouble, CalendarDays, Check, MessageSquareText, Users } from 'lucide-react';
import { useEnquiry } from '../../context/EnquiryContext.jsx';
import { resort } from '../../data/resortConfig.js';
import { localToday, scrollToSection } from '../../utils/links.js';

const fieldClass =
  'w-full rounded-xl border border-sand-300 bg-white px-3 py-2.5 text-sm text-cocoa-950 transition focus:border-ocean-500 focus:outline-none focus:ring-2 focus:ring-ocean-500/40';
const labelClass = 'mb-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-700';

/** Quick stay planner under the hero. It pre-fills the enquiry form — it does not make a reservation. */
export default function EnquiryBar() {
  const { draft, updateDraft } = useEnquiry();
  const uid = useId();
  const min = localToday();

  const onSubmit = (e) => {
    e.preventDefault();
    scrollToSection('contact');
    window.setTimeout(() => document.getElementById('enquiry-name')?.focus({ preventScroll: true }), 700);
  };

  return (
    <div className="relative z-30 mx-auto -mt-10 max-w-7xl px-4 sm:-mt-12 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-sand-300/80 bg-ivory-50 p-4 shadow-xl sm:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-sand-200 pb-3 text-xs sm:text-sm">
          <p className="flex items-center gap-2 font-semibold text-cocoa-900">
            <MessageSquareText className="h-4 w-4 text-gold-600" aria-hidden="true" />
            Plan your stay — send a direct enquiry to {resort.name}
          </p>
          <ul className="hidden items-center gap-4 text-xs text-stone-600 md:flex">
            {['8 Beachfront-View Cabanas', 'Attached Bathrooms', 'Arugam Bay'].map((t) => (
              <li key={t} className="flex items-center gap-1">
                <Check className="h-3.5 w-3.5 text-ocean-600" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={onSubmit} className="grid grid-cols-1 items-end gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-5">
          <div>
            <label htmlFor={`${uid}-arr`} className={labelClass}>
              <CalendarDays className="h-3.5 w-3.5 text-gold-700" aria-hidden="true" />
              Arrival
            </label>
            <input
              id={`${uid}-arr`}
              type="date"
              min={min}
              value={draft.arrival}
              onChange={(e) => {
                const arrival = e.target.value;
                updateDraft({
                  arrival,
                  departure: draft.departure && draft.departure <= arrival ? '' : draft.departure,
                });
              }}
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor={`${uid}-dep`} className={labelClass}>
              <CalendarDays className="h-3.5 w-3.5 text-gold-700" aria-hidden="true" />
              Departure
            </label>
            <input
              id={`${uid}-dep`}
              type="date"
              min={draft.arrival || min}
              value={draft.departure}
              onChange={(e) => updateDraft({ departure: e.target.value })}
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor={`${uid}-gst`} className={labelClass}>
              <Users className="h-3.5 w-3.5 text-gold-700" aria-hidden="true" />
              Guests
            </label>
            <select
              id={`${uid}-gst`}
              value={draft.guests}
              onChange={(e) => updateDraft({ guests: e.target.value })}
              className={fieldClass}
            >
              {Array.from({ length: 16 }, (_, i) => String(i + 1)).map((n) => (
                <option key={n} value={n}>
                  {n} {n === '1' ? 'Guest' : 'Guests'}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor={`${uid}-cab`} className={labelClass}>
              <BedDouble className="h-3.5 w-3.5 text-gold-700" aria-hidden="true" />
              Cabanas
            </label>
            <select
              id={`${uid}-cab`}
              value={draft.cabanas}
              onChange={(e) => updateDraft({ cabanas: e.target.value })}
              className={fieldClass}
            >
              {Array.from({ length: resort.cabanaCount }, (_, i) => String(i + 1)).map((n) => (
                <option key={n} value={n}>
                  {n} {n === '1' ? 'Cabana' : 'Cabanas'}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn-dark w-full py-3 sm:col-span-2 lg:col-span-1">
            Plan My Enquiry
          </button>
        </form>
      </div>
    </div>
  );
}
