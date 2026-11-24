/**
 * ============================================================================
 *  ARUGA RESORT — CENTRAL CONTENT & BUSINESS CONFIGURATION
 * ============================================================================
 *
 *  Edit this file to change the website's text, contact details, booking
 *  links, social links and which facilities are shown.
 *
 *  RULES THAT KEEP THE SITE HONEST
 *  - Leave a value as an empty string ('') or null when it is not confirmed.
 *    Empty values are hidden automatically; the site never shows fake numbers,
 *    emails, prices or reviews.
 *  - Facility photos (pool, spa, bar ...) only appear on the site after you
 *    set `confirmed: true` for that facility below.
 *
 *  This file is plain data (no React), so vite.config.js can also read it to
 *  build the SEO tags in index.html.
 * ============================================================================
 */

/* ---------------------------------------------------------------------------
 * 1. Identity
 * ------------------------------------------------------------------------- */
export const resort = {
  name: 'ARUGA RESORT',
  shortName: 'ARUGA',
  tagline: 'Where Coastal Beauty & Sri Lankan Spirit Come Together',
  cabanaCount: 8,
  location: {
    area: 'Arugam Bay',
    country: 'Sri Lanka',
    display: 'Arugam Bay, Sri Lanka',
  },
  footerDescription:
    'Discover coastal relaxation at ARUGA RESORT, offering eight beachfront-view cabanas in Arugam Bay, Sri Lanka.',
};

/* ---------------------------------------------------------------------------
 * 2. Contact details
 *    Fill these in when they are confirmed. Examples of the expected format
 *    are shown in the comments.
 * ------------------------------------------------------------------------- */
export const contact = {
  // International format, digits only, no "+" or spaces. e.g. '94771234567'
  whatsapp: '',
  // As you want it displayed. e.g. '+94 77 123 4567'
  phone: '',
  // e.g. 'stay@arugaresort.com'
  email: '',
  // Full postal address supplied by the resort.
  address: 'No. 27/5, Sinhapura Road, Arugam Bay, Eastern Province, Sri Lanka.',
  // Google Maps share link to the exact resort pin, e.g. 'https://maps.app.goo.gl/...'
  googleMapsUrl: '',
  // Exact resort coordinates once verified, e.g. { lat: 6.8402, lng: 81.8360 }
  coordinates: null,
};

/* ---------------------------------------------------------------------------
 * 3. Social media — paste full URLs. Empty = hidden.
 * ------------------------------------------------------------------------- */
export const social = {
  instagram: '',
  facebook: '',
  tiktok: '',
};

/* ---------------------------------------------------------------------------
 * 4. Booking
 *    - externalUrl: a real booking engine / Booking.com / Airbnb listing.
 *      When set, every "Book Your Stay" button opens it.
 *      When empty, "Book Your Stay" scrolls to the enquiry section.
 * ------------------------------------------------------------------------- */
export const booking = {
  externalUrl: '',
  externalLabel: 'Book Online',
  whatsappGreeting:
    'Hello ARUGA RESORT, I would like to enquire about cabana availability for my stay. Could you please share the details?',
  emailSubject: 'Cabana enquiry — ARUGA RESORT',
};

/* ---------------------------------------------------------------------------
 * 5. Navigation (ids must match the section ids)
 * ------------------------------------------------------------------------- */
export const navigation = [
  { label: 'Home', href: '#home' },
  { label: 'Our Cabanas', href: '#cabanas' },
  { label: 'Beachfront Living', href: '#beachfront' },
  { label: 'Experiences', href: '#experiences' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'About Us', href: '#about' },
  { label: 'Location', href: '#location' },
  { label: 'Contact', href: '#contact' },
];

/* ---------------------------------------------------------------------------
 * 6. Hero
 *    Slides reference image ids from src/data/galleryData.js
 * ------------------------------------------------------------------------- */
export const hero = {
  announcement: '8 Beachfront-View Cabanas · Arugam Bay',
  headlineLine1: 'Where Coastal Beauty &',
  headlineLine2: 'Sri Lankan Spirit Come Together',
  description:
    'Welcome to ARUGA RESORT, a peaceful coastal escape in Arugam Bay, Sri Lanka. Discover eight beachfront-view cabanas, each with its own attached bathroom, and enjoy a relaxing stay surrounded by the beauty of the coast.',
  primaryCta: 'Book Your Stay',
  secondaryCta: 'Explore Our Cabanas',
  slides: ['cabana-beachfront-view', 'resort-entrance', 'cabana-interior'],
  features: [
    { icon: 'BedDouble', title: '8 Comfortable Cabanas', text: 'An intimate coastal resort' },
    { icon: 'Waves', title: 'Beautiful Beachfront Views', text: 'From every cabana' },
    { icon: 'Bath', title: 'Attached Bathrooms', text: 'In each cabana' },
    { icon: 'MapPin', title: 'Arugam Bay, Sri Lanka', text: 'On the island’s east coast' },
  ],
};

/* ---------------------------------------------------------------------------
 * 7. Welcome section
 * ------------------------------------------------------------------------- */
export const welcome = {
  eyebrow: 'Welcome to ARUGA RESORT',
  titleStart: 'Discover the',
  titleAccent: 'Spirit of ARUGA',
  body:
    'Set in the coastal surroundings of Arugam Bay, ARUGA RESORT invites you to experience the natural beauty and relaxed atmosphere of Sri Lanka’s eastern shoreline. With just eight beachfront-view cabanas, the resort offers an intimate setting for a memorable coastal escape.',
  points: [
    {
      title: 'Intimate by design',
      text: 'Just eight beachfront-view cabanas, so the resort always feels calm and personal.',
    },
    {
      title: 'Your own attached bathroom',
      text: 'Every cabana has its own attached bathroom for comfort and privacy.',
    },
    {
      title: 'Sri Lanka’s eastern shoreline',
      text: 'Set in Arugam Bay, one of the island’s best-loved coastal destinations.',
    },
  ],
  quote:
    'ARUGA — where the spirit of Sri Lankan heritage meets the calm rhythm of the eastern coast.',
  mainImage: 'welcome-pavilion',
  secondaryImage: 'front-office',
  imageCaptionEyebrow: 'Arugam Bay, Sri Lanka',
  imageCaption: 'A Warm Coastal Welcome',
};

/* ---------------------------------------------------------------------------
 * 8. Cabanas
 *    Only confirmed facts. Add more `features` once you confirm them
 *    (e.g. air conditioning, Wi-Fi). Do not add prices until confirmed.
 * ------------------------------------------------------------------------- */
export const cabanas = {
  eyebrow: 'Beachfront-View Accommodation',
  titleStart: 'Your Coastal',
  titleAccent: 'Retreat Awaits',
  subtitle:
    'Eight beachfront-view cabanas, thoughtfully presented for a comfortable seaside stay.',
  collectionName: 'Beachfront-View Cabana',
  collectionTagline: 'One collection of eight coastal cabanas',
  availabilityNote: '8 Cabanas at ARUGA RESORT',
  description:
    'Each of ARUGA RESORT’s eight cabanas enjoys a beachfront view and comes with its own attached bathroom — a comfortable, private base for an unhurried coastal stay in Arugam Bay.',
  stats: [
    { label: 'Cabanas', value: '8 in total' },
    { label: 'Bathroom', value: 'Attached' },
    { label: 'Outlook', value: 'Beachfront view' },
  ],
  features: [
    'Beachfront view',
    'Private attached bathroom',
    'One of only eight cabanas',
    'Arugam Bay coastal setting',
  ],
  // Shown under the features. Remove once rates/amenities are published.
  note: 'Rates, availability and in-cabana amenities are shared when you enquire.',
  images: ['cabana-interior', 'cabana-beachfront-view', 'cabana-exterior'],
  // Set to a price string ONLY when confirmed, e.g. 'From LKR 25,000 / night'
  price: '',
};

/* ---------------------------------------------------------------------------
 * 9. Beachfront living
 * ------------------------------------------------------------------------- */
export const beachfront = {
  eyebrow: 'Coastal Atmosphere',
  titleStart: 'Wake Up to the',
  titleAccent: 'Beauty of the Coast',
  intro:
    'Enjoy the atmosphere of Arugam Bay, where tropical scenery and coastal surroundings create a memorable setting for a relaxing getaway.',
  cardEyebrow: 'Life on the East Coast',
  cardTitle: 'Slow Mornings, Ocean Air',
  cardBody:
    'On Sri Lanka’s east coast the day begins over the sea. From your cabana, settle into the easy rhythm of Arugam Bay — the shimmer of the water, the rustle of the palms and warm, golden evenings.',
  points: [
    { icon: 'Sunrise', title: 'East-coast sunrises', text: 'Arugam Bay faces the Indian Ocean, where the sun rises over the water.' },
    { icon: 'Waves', title: 'Beachfront views', text: 'Every one of the eight cabanas enjoys a beachfront view.' },
    { icon: 'Palmtree', title: 'Tropical surroundings', text: 'Palm-lined shores and coastal greenery define Arugam Bay.' },
    { icon: 'Moon', title: 'Peaceful evenings', text: 'With only eight cabanas, evenings stay quiet and unhurried.' },
  ],
  mainImage: 'cabana-exterior',
  secondaryImage: 'resort-entrance',
  badge: 'Beachfront-View Cabanas',
};

/* ---------------------------------------------------------------------------
 * 10. Experiences — DESTINATION activities in and around Arugam Bay.
 *     These are not services operated by the resort.
 *     `image` is optional: add a gallery image id to show a photo.
 * ------------------------------------------------------------------------- */
export const experiences = {
  eyebrow: 'Discover the Destination',
  titleStart: 'Explore the Beauty of',
  titleAccent: 'Arugam Bay',
  intro:
    'Arugam Bay is one of Sri Lanka’s most celebrated coastal destinations. Here are a few of the ways visitors enjoy the area during their stay.',
  disclaimer:
    'These are destination experiences in the wider Arugam Bay area. They are not operated or arranged by ARUGA RESORT.',
  items: [
    {
      icon: 'Sunrise',
      category: 'Coastal Scenery',
      title: 'Discover the Coastline',
      description:
        'Arugam Bay’s crescent of sand, palm-lined shore and Indian Ocean horizon make every walk along the coast a pleasure, especially in the soft light of early morning.',
      highlights: ['Sunrise over the Indian Ocean', 'Palm-fringed shoreline', 'Coastal walks', 'Golden evening light'],
      image: '',
    },
    {
      icon: 'Waves',
      category: 'Surf Culture',
      title: 'Feel the Surf Town Spirit',
      description:
        'Arugam Bay is known around the world for its point breaks. Even if you never pick up a board, watching surfers ride the waves is part of the area’s relaxed charm.',
      highlights: ['World-renowned surf breaks', 'Laid-back beach atmosphere', 'Main surf season around April–October', 'Independent local surf schools'],
      image: '',
    },
    {
      icon: 'Landmark',
      category: 'Local Culture',
      title: 'Explore Local Culture',
      description:
        'Experience everyday life on Sri Lanka’s east coast — fishing boats on the shore, local food and the island’s rich traditions, including the mask artistry that inspired the ARUGA logo.',
      highlights: ['Coastal village life', 'Sri Lankan cuisine', 'Traditional craftsmanship', 'Warm local hospitality'],
      image: '',
    },
    {
      icon: 'Trees',
      category: 'Nature & Heritage',
      title: 'Nearby Attractions',
      description:
        'The surrounding region is rich in nature and history, from lagoons and national parks to ancient temple sites — all within reach of Arugam Bay.',
      highlights: ['Pottuvil Lagoon', 'Kumana National Park', 'Muhudu Maha Viharaya', 'Kudumbigala Monastery'],
      image: '',
    },
  ],
};

/* ---------------------------------------------------------------------------
 * 11. About — the story told by the logo
 * ------------------------------------------------------------------------- */
export const about = {
  eyebrow: 'Our Story',
  titleStart: 'Rooted in',
  titleAccent: 'Coastal Beauty',
  body:
    'ARUGA RESORT brings together Sri Lankan-inspired visual identity and the relaxed charm of Arugam Bay. Our eight beachfront-view cabanas provide a welcoming setting for guests seeking time by the coast.',
  logoStoryIntro: 'Every element of the ARUGA emblem tells part of our story.',
  elements: [
    {
      icon: 'Drama',
      title: 'The Sri Lankan Mask',
      text: 'Inspired by the island’s traditional mask artistry — a tribute to Sri Lanka’s living heritage and craftsmanship.',
    },
    {
      icon: 'Sun',
      title: 'The Rising Sun',
      text: 'Arugam Bay sits on Sri Lanka’s east coast, where each new day rises over the ocean.',
    },
    {
      icon: 'Palmtree',
      title: 'Palm & Island',
      text: 'The tropical shoreline and gentle headlands that give the bay its timeless coastal character.',
    },
    {
      icon: 'Waves',
      title: 'The Ocean Wave',
      text: 'The sea that shapes life in Arugam Bay — and the view our cabanas look out towards.',
    },
  ],
  stats: [
    { icon: 'BedDouble', value: '8', label: 'Beachfront-view cabanas' },
    { icon: 'Bath', value: '100%', label: 'Cabanas with an attached bathroom' },
    { icon: 'Compass', value: 'East Coast', label: 'Arugam Bay, Sri Lanka' },
  ],
};

/* ---------------------------------------------------------------------------
 * 12. Gallery
 * ------------------------------------------------------------------------- */
export const gallery = {
  eyebrow: 'Visual Stories from Arugam Bay',
  titleStart: 'A Glimpse of',
  titleAccent: 'ARUGA RESORT',
  subtitle:
    'Explore the spaces, views, and coastal atmosphere that make ARUGA RESORT special.',
};

/* ---------------------------------------------------------------------------
 * 13. Location
 *     Arugam Bay area bounds for the map (general area, NOT the resort pin).
 * ------------------------------------------------------------------------- */
export const location = {
  eyebrow: 'Sri Lanka’s East Coast',
  titleStart: 'Find Us in',
  titleAccent: 'Arugam Bay',
  intro:
    'ARUGA RESORT is located in Arugam Bay, a relaxed coastal town on the south-eastern shore of Sri Lanka, known for its beaches, surf and natural surroundings.',
  cardEyebrow: 'The Destination',
  cardTitle: 'Arugam Bay, Sri Lanka',
  cardBody:
    'Arugam Bay lies just south of Pottuvil in Sri Lanka’s Eastern Province, facing the Indian Ocean. It is a popular base for exploring the island’s east coast.',
  facts: [
    { icon: 'MapPin', label: 'Destination', value: 'Arugam Bay' },
    { icon: 'Compass', label: 'Region', value: 'East coast, Sri Lanka' },
    { icon: 'Navigation', label: 'Nearest town', value: 'Pottuvil' },
  ],
  // Map view of the general Arugam Bay area (used until coordinates are set)
  areaMap: { minLng: 81.805, minLat: 6.815, maxLng: 81.868, maxLat: 6.868 },
};

/* ---------------------------------------------------------------------------
 * 14. FAQ — answers use confirmed facts only
 * ------------------------------------------------------------------------- */
export const faq = [
  {
    icon: 'BedDouble',
    question: 'How many cabanas does ARUGA RESORT have?',
    answer:
      'ARUGA RESORT has eight beachfront-view cabanas, which keeps the resort intimate and peaceful.',
  },
  {
    icon: 'Bath',
    question: 'Does every cabana have its own bathroom?',
    answer: 'Yes. Every cabana at ARUGA RESORT has its own attached bathroom.',
  },
  {
    icon: 'MapPin',
    question: 'Where is ARUGA RESORT located?',
    answer:
      'ARUGA RESORT is in Arugam Bay, on the east coast of Sri Lanka. Exact directions are shared when you enquire.',
  },
  {
    icon: 'CalendarCheck',
    question: 'How can I check availability and rates?',
    answer:
      'Send us an enquiry from the “Your ARUGA Escape Begins Here” section with your dates and number of guests, and we will reply with availability and rates.',
  },
  {
    icon: 'HelpCircle',
    question: 'Which facilities and services are available?',
    answer:
      'We are finalising the full list of facilities and services. Please ask about anything you need when you enquire and we will be happy to confirm.',
  },
];

/* ---------------------------------------------------------------------------
 * 15. Booking & contact section
 * ------------------------------------------------------------------------- */
export const contactSection = {
  eyebrow: 'Plan Your Stay',
  titleStart: 'Your ARUGA',
  titleAccent: 'Escape Begins Here',
  intro:
    'Planning your next coastal getaway? Get in touch to enquire about our beachfront-view cabanas and availability.',
  primaryCta: 'Enquire About Your Stay',
  pendingNotice:
    'Our direct contact details will be published here very soon. You can prepare your enquiry now and copy it, ready to send.',
};

/* ---------------------------------------------------------------------------
 * 16. Facilities — photos exist for these, but NONE are confirmed yet.
 *     Set `confirmed: true` for a facility that genuinely exists (or is open)
 *     and its photo + description will appear in the Facilities section and
 *     the gallery. Edit the descriptions before confirming.
 * ------------------------------------------------------------------------- */
export const facilities = [
  { id: 'pool', confirmed: false, name: 'Swimming Pool', image: 'pool-and-cabanas', description: 'A landscaped pool surrounded by tropical gardens and sun loungers.' },
  { id: 'water-play', confirmed: false, name: 'Water Play Area', image: 'water-play-area', description: 'A water play area with slides and fountains.' },
  { id: 'spa', confirmed: false, name: 'Spa', image: 'spa', description: 'A tranquil spa with treatment rooms surrounded by greenery.' },
  { id: 'bar', confirmed: false, name: 'Bar', image: 'bar', description: 'An open-air bar pavilion for evening refreshments.' },
  { id: 'cafe', confirmed: false, name: 'Aruga Kopi Café', image: 'kopi-cafe', description: 'A relaxed café serving coffee, herbal drinks and light bites.' },
  { id: 'restaurant', confirmed: false, name: 'Beachside Restaurant', image: 'beachside-restaurant', description: 'An open-air restaurant looking out towards the sea.' },
  { id: 'bbq', confirmed: false, name: 'BBQ Area', image: 'bbq-area', description: 'An outdoor grill and dining terrace.' },
  { id: 'swim-shop', confirmed: false, name: 'Swimwear Shop', image: 'swimwear-shop', description: 'A shop for swimwear and beach essentials.' },
  { id: 'changing-rooms', confirmed: false, name: 'Changing Rooms', image: 'changing-rooms', description: 'Changing rooms with lockers and washbasins.' },
];

/* ---------------------------------------------------------------------------
 * 17. SEO — used by vite.config.js to build index.html
 *     siteUrl is filled automatically by the GitHub Pages workflow. Set it
 *     here only if you deploy somewhere else (e.g. a custom domain).
 * ------------------------------------------------------------------------- */
export const seo = {
  title: 'ARUGA RESORT | Beachfront-View Cabanas in Arugam Bay, Sri Lanka',
  description:
    'Discover ARUGA RESORT in Arugam Bay, Sri Lanka, featuring eight beachfront-view cabanas with attached bathrooms for a relaxing coastal stay.',
  siteUrl: '',
  ogImage: 'images/social/aruga-resort-og.jpg',
  ogImageAlt: 'Beachfront-view cabana at ARUGA RESORT, Arugam Bay, Sri Lanka',
  themeColor: '#341C0F',
  locale: 'en_US',
};
