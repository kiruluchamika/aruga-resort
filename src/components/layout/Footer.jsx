import { ArrowUp, Mail, MapPin, Phone } from 'lucide-react';
import Logo from '../common/Logo.jsx';
import { WhatsAppIcon, socialIcon } from '../common/BrandIcons.jsx';
import { contact, navigation, resort } from '../../data/resortConfig.js';
import { channels, directionsLink, emailLink, phoneLink, socialLinks, whatsappLink } from '../../utils/links.js';

const stayLinks = [
  { label: '8 Beachfront-View Cabanas', href: '#cabanas' },
  { label: 'Attached Bathrooms', href: '#cabanas' },
  { label: 'Beachfront Living', href: '#beachfront' },
  { label: 'Photo Gallery', href: '#gallery' },
  { label: 'Frequently Asked Questions', href: '#faq' },
  { label: 'Enquire About Your Stay', href: '#contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const mapHref = directionsLink();

  return (
    <footer className="relative border-t border-cocoa-800 bg-cocoa-950 pb-12 pt-16 text-stone-300 sm:pt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="mb-5 inline-block rounded-2xl border border-gold-400/30 bg-ivory-100 p-2.5 shadow-md">
              <Logo className="h-24 w-auto" loading="lazy" />
            </div>
            <p className="mb-4 font-serif text-lg italic text-gold-200">“{resort.tagline}”</p>
            <p className="mb-6 max-w-sm text-sm leading-relaxed text-stone-400">{resort.footerDescription}</p>
          </div>

          <div>
            <h3 className="mb-4 border-b border-cocoa-800 pb-2 font-serif text-base font-bold uppercase tracking-wider text-white">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="transition-colors hover:text-gold-300">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 border-b border-cocoa-800 pb-2 font-serif text-base font-bold uppercase tracking-wider text-white">
              Your Stay
            </h3>
            <ul className="space-y-2.5 text-sm">
              {stayLinks.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="transition-colors hover:text-gold-300">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 border-b border-cocoa-800 pb-2 font-serif text-base font-bold uppercase tracking-wider text-white">
              Contact &amp; Social
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
                {mapHref ? (
                  <a href={mapHref} target="_blank" rel="noopener noreferrer" className="transition hover:text-gold-300">
                    {contact.address || resort.location.display}
                  </a>
                ) : (
                  <span>{contact.address || resort.location.display}</span>
                )}
              </li>
              {channels.whatsapp && (
                <li className="flex items-center gap-2">
                  <WhatsAppIcon className="h-4 w-4 shrink-0 text-gold-400" />
                  <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="transition hover:text-gold-300">
                    WhatsApp us
                  </a>
                </li>
              )}
              {channels.phone && (
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
                  <a href={phoneLink()} className="transition hover:text-gold-300">
                    {contact.phone}
                  </a>
                </li>
              )}
              {channels.email && (
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
                  <a href={emailLink()} className="break-all transition hover:text-gold-300">
                    {contact.email}
                  </a>
                </li>
              )}
              {!channels.whatsapp && !channels.phone && !channels.email && (
                <li className="text-xs leading-relaxed text-stone-400">
                  Direct contact details coming soon —{' '}
                  <a href="#contact" className="text-gold-300 underline underline-offset-2 hover:text-gold-200">
                    prepare your enquiry
                  </a>
                  .
                </li>
              )}
            </ul>

            {socialLinks.length > 0 && (
              <div className="mt-6 border-t border-cocoa-800 pt-4">
                <span className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-stone-400">
                  Follow ARUGA
                </span>
                <div className="flex items-center gap-3">
                  {socialLinks.map(({ id, label, href }) => {
                    const SocialIcon = socialIcon[id];
                    return (
                      <a
                        key={id}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${resort.name} on ${label}`}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-cocoa-700 bg-cocoa-900 text-stone-300 transition hover:border-gold-400 hover:text-gold-300"
                      >
                        <SocialIcon className="h-4 w-4" />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-cocoa-900 pt-8 text-xs text-stone-400 sm:flex-row">
          <p className="text-center sm:text-left">
            © {year} {resort.name}. {resort.location.display}. All rights reserved.
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 rounded-full bg-cocoa-900 px-4 py-2 font-semibold text-gold-300 transition hover:bg-cocoa-800"
            aria-label="Back to top"
          >
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
