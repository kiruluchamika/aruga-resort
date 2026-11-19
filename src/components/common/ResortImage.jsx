import { asset } from '../../utils/links.js';
import { srcSetFor } from '../../data/galleryData.js';

/**
 * Responsive <img> for a photo from src/data/galleryData.js.
 * Serves a 640px file to small slots and the full file to large ones.
 */
export default function ResortImage({
  image,
  sizes = '100vw',
  priority = false,
  className = '',
  alt,
  ...rest
}) {
  if (!image) return null;
  return (
    <img
      src={asset(image.src)}
      srcSet={srcSetFor(image, asset)}
      sizes={sizes}
      width={image.width}
      height={image.height}
      alt={alt ?? image.alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'auto' : 'async'}
      fetchpriority={priority ? 'high' : undefined}
      className={className}
      draggable="false"
      {...rest}
    />
  );
}
