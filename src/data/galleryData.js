/**
 * ARUGA RESORT — image registry.
 *
 * Every photo used on the site is described once here and referenced by `id`
 * from resortConfig.js. Paths are relative to /public (no leading slash) so
 * they work both locally and under the GitHub Pages sub-path.
 *
 * To add a photo:
 *   1. Put the original in assets-src/photos/<folder>/ and list it in
 *      scripts/optimize-images.mjs, then run `npm run images`.
 *   2. Add an entry below (width/height = the original's pixel size).
 *
 * `facility` links a photo to an entry in `facilities` (resortConfig.js).
 * Such photos stay hidden until that facility is marked `confirmed: true`.
 * `inGallery: false` keeps a photo out of the gallery grid.
 */
import { facilities } from './resortConfig.js';

export const galleryCategories = ['All', 'Cabanas', 'Arrival & Lobby', 'Facilities'];

// `mid` (960px) exists only for originals wider than 1100px — see scripts/optimize-images.mjs
const photo = (folder, file, width, height) => ({
  src: `images/${folder}/${file}.webp`,
  thumb: `images/${folder}/${file}-640.webp`,
  ...(width > 1100 ? { mid: `images/${folder}/${file}-960.webp` } : {}),
  width,
  height,
});

/** srcset string for an image, given a function that turns a path into a URL. */
export const srcSetFor = (img, url) =>
  [`${url(img.thumb)} 640w`, img.mid && `${url(img.mid)} 960w`, `${url(img.src)} ${img.width}w`]
    .filter(Boolean)
    .join(', ');

export const images = [
  {
    id: 'cabana-beachfront-view',
    ...photo('cabanas', 'aruga-cabana-beachfront-view', 1280, 720),
    title: 'Beachfront-View Cabana',
    category: 'Cabanas',
    alt: 'Thatched beachfront-view cabana at ARUGA RESORT with an open lounge, bed and the ocean visible beyond the palms',
  },
  {
    id: 'cabana-interior',
    ...photo('cabanas', 'aruga-cabana-interior', 1600, 903),
    title: 'Inside a Cabana',
    category: 'Cabanas',
    alt: 'Cabana interior at ARUGA RESORT with a king bed, carved timber panel, lanterns and a seating area',
  },
  {
    id: 'cabana-exterior',
    ...photo('cabanas', 'aruga-cabana-exterior', 1024, 946),
    title: 'Cabana Lounge & Deck',
    category: 'Cabanas',
    alt: 'Open-air ARUGA RESORT cabana deck with sofa, armchair and tea set, with the sea and palm trees to the side',
  },
  {
    id: 'resort-entrance',
    ...photo('resort', 'aruga-resort-entrance', 1280, 720),
    title: 'Resort Entrance',
    category: 'Arrival & Lobby',
    alt: 'Arched entrance of ARUGA RESORT at dusk with the resort logo, lantern lights and tropical planting',
  },
  {
    id: 'welcome-pavilion',
    ...photo('resort', 'aruga-welcome-pavilion', 1280, 720),
    title: 'Welcome Pavilion',
    category: 'Arrival & Lobby',
    alt: 'Bamboo welcome pavilion at ARUGA RESORT with woven pendant lights and a stone reception desk',
  },
  {
    id: 'front-office',
    ...photo('resort', 'aruga-front-office', 1048, 592),
    title: 'Front Office',
    category: 'Arrival & Lobby',
    alt: 'ARUGA RESORT front office building with a tiled roof, timber columns and the resort logo behind the desk',
  },

  /* ---- Facility photos (hidden until confirmed in resortConfig.js) ---- */
  {
    id: 'pool-and-cabanas',
    ...photo('facilities', 'aruga-pool-and-cabanas', 1280, 720),
    title: 'Pool & Garden Cabanas',
    category: 'Facilities',
    facility: 'pool',
    alt: 'Swimming pool surrounded by tropical gardens, sun loungers and thatched cabanas',
  },
  {
    id: 'water-play-area',
    ...photo('facilities', 'aruga-water-play-area', 1280, 720),
    title: 'Water Play Area',
    category: 'Facilities',
    facility: 'water-play',
    alt: 'Water play area with slides, fountain arches and loungers at dusk',
  },
  {
    id: 'spa',
    ...photo('facilities', 'aruga-spa', 1280, 720),
    title: 'Spa',
    category: 'Facilities',
    facility: 'spa',
    alt: 'Spa treatment room with two massage beds, a stone feature wall and garden views',
  },
  {
    id: 'bar',
    ...photo('facilities', 'aruga-bar', 1048, 592),
    title: 'Bar Pavilion',
    category: 'Facilities',
    facility: 'bar',
    alt: 'Timber bar with woven pendant lights, rattan bar stools and hanging greenery',
  },
  {
    id: 'kopi-cafe',
    ...photo('facilities', 'aruga-kopi-cafe', 1024, 576),
    title: 'Aruga Kopi Café',
    category: 'Facilities',
    facility: 'cafe',
    alt: 'Aruga Kopi Café with a coffee counter, pastry display and rattan seating',
  },
  {
    id: 'beachside-restaurant',
    ...photo('facilities', 'aruga-beachside-restaurant', 1280, 720),
    title: 'Beachside Restaurant',
    category: 'Facilities',
    facility: 'restaurant',
    alt: 'Open-air restaurant with set tables looking out to the beach at sunset',
  },
  {
    id: 'bbq-area',
    ...photo('facilities', 'aruga-bbq-area', 1280, 720),
    title: 'BBQ Area',
    category: 'Facilities',
    facility: 'bbq',
    alt: 'Outdoor BBQ station with a chef at the grill and a dining terrace beyond',
  },
  {
    id: 'swimwear-shop',
    ...photo('facilities', 'aruga-swimwear-shop', 1048, 592),
    title: 'Swimwear Shop',
    category: 'Facilities',
    facility: 'swim-shop',
    alt: 'Shop displaying swimwear, goggles and beach essentials',
  },
  {
    id: 'changing-rooms',
    ...photo('facilities', 'aruga-changing-rooms', 1048, 592),
    title: 'Changing Rooms',
    category: 'Facilities',
    facility: 'changing-rooms',
    alt: 'Changing area with timber lockers, benches and round mirrors',
  },
];

const confirmedFacilities = new Set(facilities.filter((f) => f.confirmed).map((f) => f.id));

/** True if the image may be shown publicly. */
export const isPublishable = (img) => !img.facility || confirmedFacilities.has(img.facility);

/** Look up an image by id. Returns undefined for unknown or unconfirmed images. */
export const getImage = (id) => {
  const img = images.find((i) => i.id === id);
  return img && isPublishable(img) ? img : undefined;
};

/**
 * Gallery display order (ids). Mixing categories keeps similar photos apart.
 * Images not listed here are appended in registry order.
 */
const galleryOrder = [
  'cabana-beachfront-view',
  'welcome-pavilion',
  'cabana-interior',
  'resort-entrance',
  'cabana-exterior',
  'front-office',
];

const rank = (img) => {
  const i = galleryOrder.indexOf(img.id);
  return i === -1 ? galleryOrder.length + images.indexOf(img) : i;
};

/** Images for the gallery grid, in display order. */
export const galleryImages = images
  .filter((img) => isPublishable(img) && img.inGallery !== false)
  .sort((a, b) => rank(a) - rank(b));

/** Confirmed facilities, each with its resolved image. */
export const confirmedFacilityList = facilities
  .filter((f) => f.confirmed)
  .map((f) => ({ ...f, img: getImage(f.image) }));
