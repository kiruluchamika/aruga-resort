/**
 * Image pipeline for ARUGA RESORT.
 *
 * Reads the original photographs in `assets-src/` and writes web-ready files
 * into `public/images/`. Run it whenever you add or replace a photo:
 *
 *   npm run images
 *
 * Every photo listed in PHOTOS gets these WebP files:
 *   <name>.webp      full size (never upscaled, max 1920px wide)
 *   <name>-960.webp  960px-wide version for phones (only if the original is wider than 1100px)
 *   <name>-640.webp  640px-wide version for thumbnails and small screens
 */
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(root, 'assets-src');
const OUT = path.join(root, 'public', 'images');

// [source file in assets-src/photos, output folder in public/images]
const PHOTOS = [
  ['cabanas/aruga-cabana-beachfront-view.jpg', 'cabanas'],
  ['cabanas/aruga-cabana-exterior.jpg', 'cabanas'],
  ['cabanas/aruga-cabana-interior.jpg', 'cabanas'],
  ['resort/aruga-resort-entrance.jpg', 'resort'],
  ['resort/aruga-front-office.jpg', 'resort'],
  ['resort/aruga-welcome-pavilion.jpg', 'resort'],
  // Facility photos: only displayed once confirmed in src/data/resortConfig.js
  ['facilities/aruga-pool-and-cabanas.jpg', 'facilities'],
  ['facilities/aruga-water-play-area.jpg', 'facilities'],
  ['facilities/aruga-spa.jpg', 'facilities'],
  ['facilities/aruga-bar.jpg', 'facilities'],
  ['facilities/aruga-kopi-cafe.jpg', 'facilities'],
  ['facilities/aruga-bbq-area.jpg', 'facilities'],
  ['facilities/aruga-beachside-restaurant.jpg', 'facilities'],
  ['facilities/aruga-swimwear-shop.jpg', 'facilities'],
  ['facilities/aruga-changing-rooms.jpg', 'facilities'],
];

const LOGO = path.join(SRC, 'branding', 'aruga-resort-logo-original.jpg');
// Square crop around the mask / sun / palm / wave emblem (logo is 603x610).
const EMBLEM = { left: 106, top: 0, width: 392, height: 392 };
const SOCIAL_SOURCE = path.join(SRC, 'photos', 'cabanas', 'aruga-cabana-beachfront-view.jpg');

const ensure = (dir) => mkdir(dir, { recursive: true });

async function photos() {
  for (const [rel, folder] of PHOTOS) {
    const input = path.join(SRC, 'photos', rel);
    const name = path.basename(rel, path.extname(rel));
    const dir = path.join(OUT, folder);
    await ensure(dir);
    const { width, height } = await sharp(input).metadata();

    await sharp(input)
      .resize({ width: Math.min(width, 1920), withoutEnlargement: true })
      .webp({ quality: 80, effort: 6, smartSubsample: true })
      .toFile(path.join(dir, `${name}.webp`));

    await sharp(input)
      .resize({ width: 640, withoutEnlargement: true })
      .webp({ quality: 72, effort: 6 })
      .toFile(path.join(dir, `${name}-640.webp`));

    // Middle size for phones with high-density screens (only when it saves real bytes)
    if (width > 1100) {
      await sharp(input)
        .resize({ width: 960 })
        .webp({ quality: 76, effort: 6 })
        .toFile(path.join(dir, `${name}-960.webp`));
    }

    console.log(`photo   ${folder}/${name}  (${width}x${height})`);
  }
}

async function branding() {
  const dir = path.join(OUT, 'branding');
  await ensure(dir);

  // Full logo: lossless PNG master + WebP for the page.
  await sharp(LOGO).png({ compressionLevel: 9 }).toFile(path.join(dir, 'aruga-resort-logo.png'));
  await sharp(LOGO).webp({ quality: 92 }).toFile(path.join(dir, 'aruga-resort-logo.webp'));
  await sharp(LOGO)
    .resize({ height: 240 })
    .webp({ quality: 90 })
    .toFile(path.join(dir, 'aruga-resort-logo-240.webp'));

  // Favicons / app icons from the emblem.
  const emblem = () => sharp(LOGO).extract(EMBLEM);
  const icons = [
    ['favicon-32.png', 32],
    ['favicon-48.png', 48],
    ['apple-touch-icon.png', 180],
    ['icon-192.png', 192],
    ['icon-512.png', 512],
  ];
  for (const [file, size] of icons) {
    await emblem()
      .resize(size, size, { kernel: 'lanczos3' })
      .png({ compressionLevel: 9, palette: size >= 180, quality: 90 })
      .toFile(path.join(dir, file));
  }
  console.log('logo    branding/* + favicons');
}

async function social() {
  const dir = path.join(OUT, 'social');
  await ensure(dir);
  await sharp(SOCIAL_SOURCE)
    .resize(1200, 630, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(path.join(dir, 'aruga-resort-og.jpg'));
  console.log('social  social/aruga-resort-og.jpg (1200x630)');
}

await photos();
await branding();
await social();
console.log('Done.');
