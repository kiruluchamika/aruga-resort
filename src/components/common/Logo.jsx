import { asset } from '../../utils/links.js';
import { resort } from '../../data/resortConfig.js';

/**
 * The official ARUGA RESORT logo (never redrawn or cropped).
 * `size="sm"` uses a light 240px-tall file for the header and footer.
 * Its cream background matches the `ivory-100` colour exactly.
 */
export default function Logo({ size = 'sm', className = '', ...rest }) {
  const src = size === 'sm' ? 'images/branding/aruga-resort-logo-240.webp' : 'images/branding/aruga-resort-logo.webp';
  const dims = size === 'sm' ? { width: 237, height: 240 } : { width: 603, height: 610 };
  return (
    <img
      src={asset(src)}
      {...dims}
      alt={`${resort.name} — Arugam Bay, Sri Lanka`}
      className={`object-contain ${className}`}
      decoding="async"
      draggable="false"
      {...rest}
    />
  );
}
