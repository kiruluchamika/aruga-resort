import { booking, contact, social, resort } from '../data/resortConfig.js';

/** Prefix a /public path with the Vite base URL ('/' locally, '/aruga-resort/' on GitHub Pages). */
export const asset = (path) => `${import.meta.env.BASE_URL}${String(path).replace(/^\/+/, '')}`;

const isHttpUrl = (value) => {
  if (!value) return false;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
};

const whatsappDigits = String(contact.whatsapp || '').replace(/\D/g, '');
const phoneDigits = String(contact.phone || '').replace(/[^\d+]/g, '');
const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email || '');

/** Which contact channels are genuinely configured. */
export const channels = {
  whatsapp: whatsappDigits.length >= 8 && whatsappDigits.length <= 15,
  phone: phoneDigits.replace('+', '').length >= 7,
  email: emailValid,
  externalBooking: isHttpUrl(booking.externalUrl),
  maps: isHttpUrl(contact.googleMapsUrl) || Boolean(contact.coordinates),
};

export const hasDirectChannel = channels.whatsapp || channels.email || channels.phone;

export const whatsappLink = (message = booking.whatsappGreeting) =>
  channels.whatsapp ? `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(message)}` : null;

export const phoneLink = () => (channels.phone ? `tel:${phoneDigits}` : null);

export const emailLink = (body = '', subject = booking.emailSubject) =>
  channels.email
    ? `mailto:${contact.email}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ''}`
    : null;

export const directionsLink = () => {
  if (isHttpUrl(contact.googleMapsUrl)) return contact.googleMapsUrl;
  if (contact.coordinates) {
    const { lat, lng } = contact.coordinates;
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  }
  return null;
};

/** Social links that are actually configured. */
export const socialLinks = [
  { id: 'instagram', label: 'Instagram', href: social.instagram },
  { id: 'facebook', label: 'Facebook', href: social.facebook },
  { id: 'tiktok', label: 'TikTok', href: social.tiktok },
].filter((s) => isHttpUrl(s.href));

/** Smoothly scroll to a section id (without the #), moving focus for keyboard users. */
export const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  if (window.history?.replaceState) window.history.replaceState(null, '', `#${id}`);
};

/**
 * "Book Your Stay" behaviour used by every booking button:
 * a configured external booking page, otherwise the enquiry section.
 */
export const openBooking = () => {
  if (channels.externalBooking) {
    window.open(booking.externalUrl, '_blank', 'noopener,noreferrer');
  } else {
    scrollToSection('contact');
  }
};

/** Today's date in the visitor's own time zone, as YYYY-MM-DD (for date inputs). */
export const localToday = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};

/** Build a readable enquiry message from the enquiry form values. */
export const composeEnquiry = ({ name, arrival, departure, guests, cabanas, message }) => {
  const fmt = (d) =>
    d
      ? new Date(`${d}T00:00:00`).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
      : 'Flexible';
  const lines = [
    `Hello ${resort.name},`,
    '',
    'I would like to enquire about cabana availability for my stay. Could you please share the details?',
    '',
    `Name: ${name?.trim() || '—'}`,
    `Arrival: ${fmt(arrival)}`,
    `Departure: ${fmt(departure)}`,
    `Guests: ${guests || '—'}`,
    `Cabanas: ${cabanas || '—'}`,
  ];
  if (message?.trim()) lines.push('', message.trim());
  lines.push('', 'Thank you.');
  return lines.join('\n');
};
