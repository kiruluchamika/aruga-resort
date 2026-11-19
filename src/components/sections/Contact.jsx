import { useState } from 'react';
import { CalendarDays, Check, Copy, Mail, MapPin, MessageSquareText, Phone, Send, Users } from 'lucide-react';
import Reveal from '../common/Reveal.jsx';
import SectionHeader from '../common/SectionHeader.jsx';
import { WhatsAppIcon, socialIcon } from '../common/BrandIcons.jsx';
import { useEnquiry } from '../../context/EnquiryContext.jsx';
import { contact, contactSection, resort } from '../../data/resortConfig.js';
import {
  channels,
  composeEnquiry,
  emailLink,
  hasDirectChannel,
  localToday,
  phoneLink,
  socialLinks,
  whatsappLink,
} from '../../utils/links.js';

const fieldClass =
  'w-full rounded-xl border border-sand-300 bg-white px-3.5 py-3 text-sm text-cocoa-950 placeholder:text-stone-500 transition focus:border-ocean-500 focus:outline-none focus:ring-2 focus:ring-ocean-500/40';
const labelClass = 'mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-700';

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand('copy');
    area.remove();
    return ok;
  }
}

function ChannelList() {
  const items = [
    channels.whatsapp && { icon: WhatsAppIcon, label: 'WhatsApp', value: 'Chat with us', href: whatsappLink(), external: true },
    channels.phone && { icon: Phone, label: 'Telephone', value: contact.phone, href: phoneLink() },
    channels.email && { icon: Mail, label: 'Email', value: contact.email, href: emailLink() },
    ...socialLinks.map((s) => ({ icon: socialIcon[s.id], label: s.label, value: 'Follow ARUGA', href: s.href, external: true })),
  ].filter(Boolean);

  return (
    <ul className="space-y-3">
      <li className="flex items-start gap-3 rounded-2xl border border-cocoa-800 bg-cocoa-900/60 p-4">
        <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold-400" aria-hidden="true" />
        <span>
          <span className="block text-[11px] font-bold uppercase tracking-wider text-stone-400">Location</span>
          <span className="text-sm text-stone-100">{contact.address || resort.location.display}</span>
        </span>
      </li>
      {items.map(({ icon: ChannelIcon, label, value, href, external }) => (
        <li key={label}>
          <a
            href={href}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="group flex items-center gap-3 rounded-2xl border border-cocoa-800 bg-cocoa-900/60 p-4 transition hover:border-gold-400/60 hover:bg-cocoa-900"
          >
            <ChannelIcon className="h-5 w-5 shrink-0 text-gold-400" aria-hidden="true" />
            <span className="min-w-0">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-stone-400">{label}</span>
              <span className="block truncate text-sm text-stone-100 group-hover:text-gold-200">{value}</span>
            </span>
          </a>
        </li>
      ))}
      {!hasDirectChannel && (
        <li className="rounded-2xl border border-dashed border-gold-400/40 p-4 text-sm leading-relaxed text-stone-300">
          {contactSection.pendingNotice}
        </li>
      )}
    </ul>
  );
}

export default function Contact() {
  const { draft, updateDraft } = useEnquiry();
  const [status, setStatus] = useState('');
  const today = localToday();
  const message = composeEnquiry(draft);

  const setField = (key) => (e) => updateDraft({ [key]: e.target.value });

  const copy = async () => {
    const ok = await copyText(message);
    setStatus(ok ? 'Your enquiry has been copied — paste it into a message to us.' : 'Copying failed. Please select the preview text and copy it manually.');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (draft.arrival && draft.departure && draft.departure <= draft.arrival) {
      setStatus('Please choose a departure date after your arrival date.');
      return;
    }
    if (channels.whatsapp) {
      window.open(whatsappLink(message), '_blank', 'noopener,noreferrer');
      setStatus('WhatsApp has opened in a new tab with your enquiry. Press send there to reach us.');
    } else if (channels.email) {
      window.location.href = emailLink(message);
      setStatus('Your email app should open with the enquiry ready. Press send there to reach us.');
    } else {
      copy();
    }
  };

  const primaryLabel = channels.whatsapp
    ? contactSection.primaryCta
    : channels.email
      ? contactSection.primaryCta
      : 'Copy My Enquiry';

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative bg-sand-100/60 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          id="contact-title"
          icon={MessageSquareText}
          eyebrow={contactSection.eyebrow}
          titleStart={contactSection.titleStart}
          titleAccent={contactSection.titleAccent}
          intro={contactSection.intro}
        />

        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
          {/* Contact channels */}
          <Reveal className="relative overflow-hidden rounded-3xl border border-cocoa-800 bg-cocoa-950 p-6 text-stone-100 shadow-xl sm:p-8 lg:col-span-5">
            <div className="dot-pattern pointer-events-none absolute inset-0 opacity-[0.07]" />
            <div className="relative">
              <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-gold-300">Direct Contact</span>
              <h3 className="mb-3 font-serif text-3xl font-bold text-white">Speak with {resort.name}</h3>
              <p className="mb-6 text-sm font-light leading-relaxed text-stone-300">
                Ask about availability, rates and anything you would like to know about our {resort.cabanaCount}{' '}
                beachfront-view cabanas.
              </p>
              <ChannelList />
              <div className="mt-6 rounded-2xl border border-cocoa-800 p-4">
                <span className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-stone-400">
                  Helpful to include
                </span>
                <ul className="grid grid-cols-2 gap-2 text-xs text-stone-300">
                  {['Arrival & departure dates', 'Number of guests', 'Number of cabanas', 'Any questions'].map((t) => (
                    <li key={t} className="flex items-center gap-1.5">
                      <Check className="h-3.5 w-3.5 shrink-0 text-gold-400" aria-hidden="true" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          {/* Enquiry composer */}
          <Reveal delay={0.1} className="rounded-3xl border border-sand-300 bg-white p-6 shadow-xl sm:p-8 lg:col-span-7">
            <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-gold-800">Stay Enquiry</span>
            <h3 className="mb-2 font-serif text-2xl font-bold text-cocoa-900 sm:text-3xl">Prepare your enquiry</h3>
            <p className="mb-6 text-sm text-stone-600">
              {channels.whatsapp
                ? 'Fill in your details and we will open WhatsApp with your message ready to send.'
                : channels.email
                  ? 'Fill in your details and we will open your email app with your message ready to send.'
                  : 'Fill in your details to prepare a ready-to-send enquiry message.'}{' '}
              This is an enquiry, not a confirmed reservation.
            </p>

            <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2" noValidate={false}>
              <div className="sm:col-span-2">
                <label htmlFor="enquiry-name" className={labelClass}>
                  Your name
                </label>
                <input
                  id="enquiry-name"
                  type="text"
                  autoComplete="name"
                  required
                  value={draft.name}
                  onChange={setField('name')}
                  placeholder="e.g. Nimal Perera"
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="enquiry-arrival" className={labelClass}>
                  <CalendarDays className="h-3.5 w-3.5 text-gold-700" aria-hidden="true" />
                  Arrival
                </label>
                <input
                  id="enquiry-arrival"
                  type="date"
                  min={today}
                  value={draft.arrival}
                  onChange={(e) =>
                    updateDraft({
                      arrival: e.target.value,
                      departure: draft.departure && draft.departure <= e.target.value ? '' : draft.departure,
                    })
                  }
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="enquiry-departure" className={labelClass}>
                  <CalendarDays className="h-3.5 w-3.5 text-gold-700" aria-hidden="true" />
                  Departure
                </label>
                <input
                  id="enquiry-departure"
                  type="date"
                  min={draft.arrival || today}
                  value={draft.departure}
                  onChange={setField('departure')}
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="enquiry-guests" className={labelClass}>
                  <Users className="h-3.5 w-3.5 text-gold-700" aria-hidden="true" />
                  Guests
                </label>
                <select id="enquiry-guests" value={draft.guests} onChange={setField('guests')} className={fieldClass}>
                  {Array.from({ length: 16 }, (_, i) => String(i + 1)).map((n) => (
                    <option key={n} value={n}>
                      {n} {n === '1' ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="enquiry-cabanas" className={labelClass}>
                  Cabanas
                </label>
                <select id="enquiry-cabanas" value={draft.cabanas} onChange={setField('cabanas')} className={fieldClass}>
                  {Array.from({ length: resort.cabanaCount }, (_, i) => String(i + 1)).map((n) => (
                    <option key={n} value={n}>
                      {n} {n === '1' ? 'Cabana' : 'Cabanas'}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="enquiry-message" className={labelClass}>
                  Message <span className="font-normal normal-case tracking-normal text-stone-500">(optional)</span>
                </label>
                <textarea
                  id="enquiry-message"
                  rows={3}
                  value={draft.message}
                  onChange={setField('message')}
                  placeholder="Any questions or special requests?"
                  className={`${fieldClass} resize-y`}
                />
              </div>

              <details className="group rounded-xl border border-sand-200 bg-sand-50 sm:col-span-2">
                <summary className="cursor-pointer select-none px-4 py-3 text-xs font-bold uppercase tracking-wider text-stone-700 marker:text-gold-600">
                  Preview your message
                </summary>
                <pre className="max-h-56 overflow-auto whitespace-pre-wrap break-words border-t border-sand-200 px-4 py-3 font-sans text-xs leading-relaxed text-stone-700">
                  {message}
                </pre>
              </details>

              {!hasDirectChannel && (
                <p className="rounded-xl border border-gold-200 bg-gold-50 p-3 text-xs leading-relaxed text-gold-900 sm:col-span-2">
                  {contactSection.pendingNotice}
                </p>
              )}

              <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row">
                <button type="submit" className="btn-gold flex-1">
                  {channels.whatsapp ? (
                    <WhatsAppIcon className="h-4 w-4" />
                  ) : channels.email ? (
                    <Send className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Copy className="h-4 w-4" aria-hidden="true" />
                  )}
                  {primaryLabel}
                </button>
                {channels.whatsapp && channels.email && (
                  <a href={emailLink(message)} className="btn-outline flex-1">
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    Send by Email
                  </a>
                )}
                {hasDirectChannel && (
                  <button type="button" onClick={copy} className="btn-outline sm:w-auto">
                    <Copy className="h-4 w-4" aria-hidden="true" />
                    Copy
                  </button>
                )}
              </div>

              <p role="status" aria-live="polite" className="min-h-[1.25rem] text-sm font-medium text-ocean-800 sm:col-span-2">
                {status}
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
