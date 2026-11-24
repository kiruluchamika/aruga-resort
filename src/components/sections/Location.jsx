import { ExternalLink, Info, MapPin } from 'lucide-react';
import Icon from '../common/Icon.jsx';
import Reveal from '../common/Reveal.jsx';
import SectionHeader from '../common/SectionHeader.jsx';
import { contact, location, resort } from '../../data/resortConfig.js';
import { asset, directionsLink } from '../../utils/links.js';

/** OpenStreetMap embed (free, no API key). Shows a pin only when exact coordinates are configured. */
function mapEmbedUrl() {
  if (contact.coordinates) {
    const { lat, lng } = contact.coordinates;
    const d = 0.012;
    const bbox = [lng - d, lat - d, lng + d, lat + d].join(',');
    return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;
  }
  const { minLng, minLat, maxLng, maxLat } = location.areaMap;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${minLng},${minLat},${maxLng},${maxLat}&layer=mapnik`;
}

export default function Location() {
  const directions = directionsLink();
  const exact = Boolean(contact.coordinates);

  return (
    <section id="location" aria-labelledby="location-title" className="relative bg-sand-100/60 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          id="location-title"
          icon={MapPin}
          eyebrow={location.eyebrow}
          titleStart={location.titleStart}
          titleAccent={location.titleAccent}
          intro={location.intro}
        />

        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
          <Reveal className="flex flex-col justify-between rounded-3xl border border-sand-300 bg-white p-6 shadow-xl sm:p-8 lg:col-span-5">
            <div>
              <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-gold-800">{location.cardEyebrow}</span>
              <h3 className="mb-4 font-serif text-2xl font-bold text-cocoa-900 sm:text-3xl">{location.cardTitle}</h3>
              <p className="mb-6 text-sm font-light leading-relaxed text-stone-700">{location.cardBody}</p>

              <ul className="mb-6 space-y-3">
                {location.facts.map((f) => (
                  <li
                    key={f.label}
                    className="flex items-center justify-between gap-3 rounded-xl border border-sand-200 bg-sand-50 p-3.5 transition hover:bg-sand-100"
                  >
                    <span className="flex items-center gap-2.5 text-xs font-semibold text-cocoa-900 sm:text-sm">
                      <Icon name={f.icon} className="h-4 w-4 shrink-0 text-ocean-600" />
                      {f.label}
                    </span>
                    <span className="shrink-0 rounded-md border border-gold-200 bg-gold-50 px-2.5 py-1 text-[11px] font-bold text-gold-800">
                      {f.value}
                    </span>
                  </li>
                ))}
                {contact.address && (
                  <li className="rounded-xl border border-sand-200 bg-sand-50 p-3.5 text-sm text-cocoa-900">
                    <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-stone-600">Address</span>
                    {contact.address}
                  </li>
                )}
              </ul>
            </div>

            <figure className="mb-6 flex flex-col items-center rounded-2xl border border-sand-200 bg-sand-50 p-4 text-center">
              <img
                src={asset('images/location-qr.jpeg')}
                alt="QR code for the resort location"
                width={1155}
                height={1155}
                loading="lazy"
                decoding="async"
                className="h-auto w-48 max-w-full bg-white object-contain"
              />
              <figcaption className="mt-3 text-sm font-semibold text-cocoa-900">
                Scan for location
              </figcaption>
            </figure>

            <div className="flex flex-col gap-3 border-t border-sand-200 pt-6">
              {directions ? (
                <a href={directions} target="_blank" rel="noopener noreferrer" className="btn-dark w-full rounded-xl py-3">
                  Get Directions
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              ) : (
                <p className="flex items-start gap-2 rounded-xl bg-ocean-50 p-3 text-xs leading-relaxed text-ocean-900">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-ocean-700" aria-hidden="true" />
                  The resort’s exact location and directions will be shared here soon, and are available when you
                  enquire.
                </p>
              )}
              <a href="#contact" className="text-center text-xs font-semibold text-ocean-700 hover:text-gold-800">
                Ask us about getting to {resort.location.area} →
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="relative min-h-[380px] overflow-hidden rounded-3xl border border-sand-300 bg-white shadow-xl lg:col-span-7 lg:min-h-[460px]">
            <iframe
              src={mapEmbedUrl()}
              title={exact ? `Map showing ${resort.name}` : 'Map of the Arugam Bay area, Sri Lanka'}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0"
            />
            {!exact && (
              <span className="pointer-events-none absolute left-3 top-3 rounded-full border border-sand-300 bg-ivory-50/95 px-3 py-1.5 text-[11px] font-semibold text-cocoa-900 shadow-md backdrop-blur">
                General Arugam Bay area — not the exact resort location
              </span>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
