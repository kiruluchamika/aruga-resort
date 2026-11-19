# ARUGA RESORT — Website

The official website for **ARUGA RESORT**, a resort of eight beachfront-view cabanas in **Arugam Bay, Sri Lanka**. Every cabana has its own attached bathroom.

It is a fast, static, single-page site built with React and Vite. It is hosted free on **GitHub Pages** and needs no server, database or API keys.

---

## Contents

1. [Before going live: business details still needed](#1-before-going-live-business-details-still-needed)
2. [Technology](#2-technology)
3. [Project structure](#3-project-structure)
4. [Run it on your computer](#4-run-it-on-your-computer)
5. [Edit the website content](#5-edit-the-website-content)
6. [Contact, WhatsApp and booking links](#6-contact-whatsapp-and-booking-links)
7. [Facilities (pool, spa, café …)](#7-facilities-pool-spa-café-)
8. [Add or replace photos](#8-add-or-replace-photos)
9. [Publish on GitHub Pages](#9-publish-on-github-pages)
10. [Update the live site](#10-update-the-live-site)
11. [Optional: custom domain](#11-optional-custom-domain)
12. [SEO, accessibility and performance](#12-seo-accessibility-and-performance)

---

## 1. Before going live: business details still needed

The site never shows invented information. These details are **empty on purpose** and are hidden until you add them in `src/data/resortConfig.js`:

| Detail | Where | What happens while it is empty |
|---|---|---|
| WhatsApp number | `contact.whatsapp` | No WhatsApp buttons are shown |
| Phone number | `contact.phone` | No phone link is shown |
| Email address | `contact.email` | No email link is shown |
| Exact address | `contact.address` | "Arugam Bay, Sri Lanka" is shown instead |
| Google Maps link / coordinates | `contact.googleMapsUrl`, `contact.coordinates` | The map shows the general Arugam Bay area, clearly labelled, with no resort pin and no "Get Directions" button |
| Instagram / Facebook / TikTok | `social.*` | No social icons are shown |
| Online booking page | `booking.externalUrl` | "Book Your Stay" scrolls to the enquiry section |
| Cabana price | `cabanas.price` | No price is shown |
| Check-in / check-out times, Wi-Fi, A/C, breakfast, parking … | add to `cabanas.features` or `faq` | Not mentioned |
| Facilities (pool, spa, bar, café …) | `facilities[].confirmed` | Facility photos stay hidden (see section 7) |

> **Important:** until at least a WhatsApp number or an email address is added, visitors can prepare an enquiry and copy it, but they cannot send it from the site. **Add a WhatsApp number or email before promoting the site.**

---

## 2. Technology

- **React 18** + **Vite 6**: the application and build tool
- **Tailwind CSS 3**: styling, with a colour palette sampled from the ARUGA logo
- **Framer Motion**: scroll reveals, hero slideshow, menus and the lightbox (respects "reduce motion" settings)
- **Lucide React**: icons
- **Fontsource**: self-hosted Cormorant Garamond (headings) and Plus Jakarta Sans (text), so no Google Fonts requests are made
- **sharp**: image optimisation script (development only)
- **GitHub Actions + GitHub Pages**: free automatic deployment

### Brand colours (from the logo)

| Name | Hex | Used for |
|---|---|---|
| Ivory | `#F7F1DB` | Page background (the logo's own cream) |
| Cocoa | `#341C0F` / `#221208` | Headings, dark sections, footer |
| Ocean teal | `#247D80` | Labels, icons, accents |
| Sunset gold | `#D5A33E` | Main buttons and highlights |
| Terracotta | `#B94B2B` | Small decorative accents |
| Sand | `#E9DCC2` | Cards and alternate sections |

---

## 3. Project structure

```
├── .github/workflows/deploy.yml   GitHub Pages deployment
├── assets-src/                    ORIGINAL photos and logo (full quality, not published)
│   ├── branding/
│   └── photos/{cabanas,resort,facilities}/
├── public/images/                 Optimised images that the website uses
│   ├── branding/                  logo, favicons
│   ├── cabanas/  resort/  facilities/  social/
├── scripts/optimize-images.mjs    Turns assets-src photos into public/images files
├── src/
│   ├── data/
│   │   ├── resortConfig.js        ★ ALL text, contact details, booking, facilities, SEO
│   │   └── galleryData.js         ★ Photo list: titles, alt text, categories
│   ├── components/
│   │   ├── layout/                Header, Footer, floating buttons
│   │   ├── sections/              Hero, Welcome, Cabanas, Beachfront, Experiences, …
│   │   └── common/                Reusable pieces (lightbox, images, headings …)
│   ├── context/  hooks/  utils/   Shared logic (enquiry form, dialogs, links)
│   ├── styles/index.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js                 Base path + automatic SEO tags, sitemap, robots.txt
└── tailwind.config.js             Brand colours and fonts
```

---

## 4. Run it on your computer

Requires **Node.js 20 or newer** (tested with Node 24 LTS). Download it from <https://nodejs.org>.

```bash
npm install        # first time only
npm run dev        # development server → http://localhost:5173/
```

Production build and preview (exactly as GitHub Pages will serve it):

```bash
npm run build      # creates the dist/ folder
npm run preview    # → http://localhost:4173/aruga-resort/
```

| Command | What it does |
|---|---|
| `npm run dev` | Local development with instant reload, at `/` |
| `npm run build` | Production build into `dist/`, for the `/aruga-resort/` sub-path |
| `npm run preview` | Serves the production build locally |
| `npm run images` | Re-creates the optimised images from `assets-src/` |

---

## 5. Edit the website content

Almost everything lives in **`src/data/resortConfig.js`**. It is plain text with comments, so you do not need to touch any component.

- **Headlines, paragraphs, button labels:** edit the section objects (`hero`, `welcome`, `cabanas`, `beachfront`, `experiences`, `about`, `gallery`, `location`, `contactSection`).
- **Hero slideshow:** `hero.slides` lists photo ids from `galleryData.js`.
- **Cabana features:** `cabanas.features`. Add confirmed items such as `'Air conditioning'`.
- **FAQ:** `faq`. Add, remove or edit questions.
- **Navigation:** `navigation`.
- **Page title and description (SEO):** `seo`.

Save the file. `npm run dev` updates the page instantly.

---

## 6. Contact, WhatsApp and booking links

In `src/data/resortConfig.js`:

```js
export const contact = {
  whatsapp: '94771234567',          // digits only, with country code (94 = Sri Lanka), no + or spaces
  phone: '+94 77 123 4567',         // shown exactly as written
  email: 'stay@your-domain.com',
  address: 'Your exact address, Arugam Bay',
  googleMapsUrl: 'https://maps.app.goo.gl/…',
  coordinates: { lat: 6.84, lng: 81.83 },   // exact resort location → map pin + directions
};

export const social = {
  instagram: 'https://www.instagram.com/…',
  facebook: 'https://www.facebook.com/…',
  tiktok: '',
};

export const booking = {
  externalUrl: '',   // e.g. a Booking.com / Airbnb / booking-engine link
  …
};
```

What changes automatically:

- **WhatsApp set:** the enquiry form opens WhatsApp with the guest's dates, guests and message already filled in. A WhatsApp button appears in the footer and as a floating button. The pre-filled greeting is `booking.whatsappGreeting`.
- **Email set:** the form can also open the visitor's email app with the enquiry filled in.
- **`booking.externalUrl` set:** every "Book Your Stay" button opens that page in a new tab.
- **Coordinates set:** the map shows a pin at the resort and a "Get Directions" button appears.

The form never claims a message was sent. It opens WhatsApp or email, and the guest presses send there.

---

## 7. Facilities (pool, spa, café …)

Photos were supplied for a pool, water play area, spa, bar, Aruga Kopi Café, beachside restaurant, BBQ area, swimwear shop and changing rooms. These facilities are **not confirmed**, so their photos are **hidden by default**.

To show a facility once it genuinely exists, set `confirmed: true` in `facilities` (bottom of `resortConfig.js`) and check its description:

```js
{ id: 'pool', confirmed: true, name: 'Swimming Pool', image: 'pool-and-cabanas', description: '…' },
```

A **Resort Facilities** section then appears after "Beachfront Living", and its photo joins the gallery under a **Facilities** filter.

---

## 8. Add or replace photos

1. Put the **original, full-quality** photo in `assets-src/photos/<cabanas|resort|facilities>/`, with a descriptive name such as `aruga-cabana-bathroom.jpg`.
2. Add it to the `PHOTOS` list in `scripts/optimize-images.mjs`.
3. Run `npm run images`. This creates `public/images/<folder>/<name>.webp` and a small `<name>-640.webp` version.
4. Register it in `src/data/galleryData.js` with an id, title, category, **alt text** and the original's pixel size:
   ```js
   {
     id: 'cabana-bathroom',
     ...photo('cabanas', 'aruga-cabana-bathroom', 1600, 1067),
     title: 'Attached Bathroom',
     category: 'Cabanas',
     alt: 'Attached bathroom in an ARUGA RESORT cabana with …',
   },
   ```
5. Use it by id anywhere in `resortConfig.js`, for example in `cabanas.images` or `hero.slides`. It appears in the gallery automatically.

To **replace** a photo, overwrite the original in `assets-src/` with the same name and run `npm run images`.

> **Photo quality tip:** the photos supplied so far are at most 1600 px wide (WhatsApp compresses images). For the sharpest hero on large screens, add originals at least **2400 px wide**. Real photos of a cabana bathroom, sea views from the cabanas and the beach would also strengthen the site.

---

## 9. Publish on GitHub Pages

The repository should be named **`aruga-resort`**. The site will then be at:

```
https://YOUR_GITHUB_USERNAME.github.io/aruga-resort/
```

### Step 1: Create the repository on GitHub

1. Sign in at <https://github.com> → **New repository**.
2. Name: `aruga-resort`. Visibility: **Public** (free GitHub Pages requires a public repository on free accounts).
3. Do **not** add a README, .gitignore or licence (this project already has them) → **Create repository**.

### Step 2: Push the code

Run these commands in this project folder, replacing `YOUR_GITHUB_USERNAME`:

```bash
git add .
git commit -m "ARUGA RESORT website"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/aruga-resort.git
git push -u origin main
```

`package-lock.json` must be committed; the deployment uses `npm ci`. `node_modules/` and `dist/` are ignored on purpose.

### Step 3: Turn on GitHub Pages (one time)

1. On GitHub, open the repository → **Settings** → **Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.

### Step 4: Deploy

The push in step 2 starts the **Deploy to GitHub Pages** workflow. If it ran before Pages was enabled, open the **Actions** tab → **Deploy to GitHub Pages** → **Run workflow**.

When the run shows a green tick (about 1–2 minutes), the live link appears:

- in the workflow run summary (the **deploy** job), and
- under **Settings → Pages** ("Your site is live at …").

The workflow (`.github/workflows/deploy.yml`) installs dependencies with `npm ci`, builds with `npm run build` and publishes only the built `dist/` folder. It reads the site's address and sub-path from GitHub Pages itself, so the canonical URL, social-preview image, sitemap and all asset paths are correct automatically.

---

## 10. Update the live site

After any change:

```bash
git add .
git commit -m "Describe your change"
git push
```

Every push to `main` rebuilds and redeploys the site automatically. You can also redeploy at any time from **Actions → Deploy to GitHub Pages → Run workflow**.

---

## 11. Optional: custom domain

1. Buy a domain (e.g. `arugaresort.com`).
2. GitHub → repository **Settings → Pages → Custom domain** → enter `www.arugaresort.com` → **Save**.
3. At your domain provider, add DNS records:
   - `www` → **CNAME** → `YOUR_GITHUB_USERNAME.github.io`
   - For the bare domain, four **A** records: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
4. After DNS is active, tick **Enforce HTTPS**.
5. Run the workflow again (**Actions → Run workflow**).

No code changes are needed. The workflow switches the site from `/aruga-resort/` to `/` and updates the canonical URL by itself. You do not need a `CNAME` file when deploying with GitHub Actions.

---

## 12. SEO, accessibility and performance

- **SEO:** page title, meta description, Open Graph / Twitter cards with a 1200×630 resort photo, canonical URL, `sitemap.xml`, `robots.txt`, web manifest, and favicons cropped from the real logo. All of these are generated by `vite.config.js` from `resortConfig.js`. The structured data (`schema.org/Resort`) contains only confirmed facts: name, Arugam Bay, Sri Lanka, 8 rooms. It contains no ratings or reviews.
- **robots.txt note:** search engines only read `robots.txt` at the root of a domain, so it takes effect once you use a custom domain. Submit the sitemap URL in Google Search Console in the meantime.
- **Accessibility:** semantic landmarks, a "skip to content" link, keyboard-operable menus, gallery and dialogs (Esc closes, focus is kept inside), visible focus rings, descriptive alt text, and reduced-motion support.
- **Performance:** WebP images in two sizes chosen by screen width, lazy loading below the fold, a preloaded hero image, self-hosted fonts and split JavaScript bundles.

---

### Design credit

The layout and interaction style follow the supplied reference website and were rebuilt independently. No code, photographs or logos from the reference are used. All photography and the logo belong to ARUGA RESORT.
