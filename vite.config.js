import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resort, seo, contact, hero } from './src/data/resortConfig.js';
import { images, srcSetFor } from './src/data/galleryData.js';

/**
 * Base path
 * - `npm run dev`            → '/'
 * - `npm run build/preview`  → '/aruga-resort/'  (GitHub Pages project site)
 * - BASE_PATH env variable overrides both. The GitHub Actions workflow sets it
 *   from GitHub Pages itself, so a custom domain ('/') also works untouched.
 */
const normalizeBase = (value) => {
  const trimmed = String(value).trim().replace(/^\/+|\/+$/g, '');
  return trimmed ? `/${trimmed}/` : '/';
};

const withTrailingSlash = (url) => (url ? url.replace(/\/+$/, '') + '/' : '');

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

/** Writes SEO tags, structured data, robots.txt, sitemap.xml and the web manifest. */
function arugaSeoPlugin() {
  let base = '/';
  const siteUrl = withTrailingSlash(process.env.SITE_URL || seo.siteUrl || '');
  const abs = (path) => (siteUrl ? siteUrl + path : null);

  return {
    name: 'aruga-seo',
    configResolved(config) {
      base = config.base;
    },
    transformIndexHtml(html) {
      const heroImg = images.find((i) => i.id === hero.slides[0]);
      const ogImage = abs(seo.ogImage) || base + seo.ogImage;

      const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Resort',
        name: resort.name,
        description: seo.description,
        numberOfRooms: resort.cabanaCount,
        image: ogImage,
        address: {
          '@type': 'PostalAddress',
          addressLocality: resort.location.area,
          addressCountry: 'LK',
          ...(contact.address ? { streetAddress: contact.address } : {}),
        },
        ...(siteUrl ? { url: siteUrl } : {}),
        ...(contact.phone ? { telephone: contact.phone } : {}),
        ...(contact.email ? { email: contact.email } : {}),
        ...(contact.coordinates
          ? {
              geo: {
                '@type': 'GeoCoordinates',
                latitude: contact.coordinates.lat,
                longitude: contact.coordinates.lng,
              },
            }
          : {}),
      };

      const meta = [
        `<title>${escapeHtml(seo.title)}</title>`,
        `<meta name="description" content="${escapeHtml(seo.description)}" />`,
        `<meta name="theme-color" content="${seo.themeColor}" />`,
        `<meta name="robots" content="index, follow, max-image-preview:large" />`,
        siteUrl && `<link rel="canonical" href="${siteUrl}" />`,
        `<link rel="icon" type="image/png" sizes="32x32" href="${base}images/branding/favicon-32.png" />`,
        `<link rel="icon" type="image/png" sizes="48x48" href="${base}images/branding/favicon-48.png" />`,
        `<link rel="apple-touch-icon" href="${base}images/branding/apple-touch-icon.png" />`,
        `<link rel="manifest" href="${base}site.webmanifest" />`,
        heroImg &&
          `<link rel="preload" as="image" type="image/webp" href="${base}${heroImg.src}" imagesrcset="${srcSetFor(heroImg, (p) => base + p)}" imagesizes="100vw" fetchpriority="high" />`,
        `<meta property="og:type" content="website" />`,
        `<meta property="og:locale" content="${seo.locale}" />`,
        `<meta property="og:site_name" content="${escapeHtml(resort.name)}" />`,
        `<meta property="og:title" content="${escapeHtml(seo.title)}" />`,
        `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
        siteUrl && `<meta property="og:url" content="${siteUrl}" />`,
        `<meta property="og:image" content="${ogImage}" />`,
        `<meta property="og:image:width" content="1200" />`,
        `<meta property="og:image:height" content="630" />`,
        `<meta property="og:image:alt" content="${escapeHtml(seo.ogImageAlt)}" />`,
        `<meta name="twitter:card" content="summary_large_image" />`,
        `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`,
        `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`,
        `<meta name="twitter:image" content="${ogImage}" />`,
        `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`,
      ]
        .filter(Boolean)
        .join('\n    ');

      return html.replace('<!-- aruga:seo -->', meta);
    },
    generateBundle() {
      const robots = ['User-agent: *', 'Allow: /', siteUrl && `Sitemap: ${siteUrl}sitemap.xml`]
        .filter(Boolean)
        .join('\n');
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots + '\n' });

      if (siteUrl) {
        const today = new Date().toISOString().slice(0, 10);
        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;
        this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap });
      }

      const manifest = {
        name: resort.name,
        short_name: resort.shortName,
        description: seo.description,
        start_url: base,
        scope: base,
        display: 'standalone',
        background_color: '#F7F1DB',
        theme_color: seo.themeColor,
        icons: [
          { src: `${base}images/branding/icon-192.png`, sizes: '192x192', type: 'image/png' },
          { src: `${base}images/branding/icon-512.png`, sizes: '512x512', type: 'image/png' },
        ],
      };
      this.emitFile({
        type: 'asset',
        fileName: 'site.webmanifest',
        source: JSON.stringify(manifest, null, 2),
      });
    },
  };
}

export default defineConfig(({ command, isPreview }) => ({
  base:
    process.env.BASE_PATH !== undefined
      ? normalizeBase(process.env.BASE_PATH)
      : command === 'build' || isPreview
        ? '/aruga-resort/'
        : '/',
  plugins: [react(), arugaSeoPlugin()],
  build: {
    target: 'es2019',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          motion: ['framer-motion'],
        },
      },
    },
  },
}));
