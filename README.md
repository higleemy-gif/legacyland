# Legacy Land Developers — Website

Modern, mobile-first, property-first redesign of legacylanddevelopers.in built as a lightweight static site.

## Preview locally

Everything is static HTML/CSS/JS, so you can open `index.html` directly in a browser. For accurate `file://` behaviour (fonts, relative links) a quick local server is best:

```powershell
# From this folder
python -m http.server 5173
# or
npx http-server -p 5173
```

Then visit http://localhost:5173/

## Project structure

```
/
├─ index.html                       # Homepage — property-first
├─ properties.html                  # All properties + search & filter
├─ about.html                       # About the company
├─ contact.html                     # Contact + WhatsApp enquiry form
├─ properties/
│   ├─ kashyapi-township.html
│   ├─ srin-vedha-ventures.html
│   ├─ omkareswar-venture.html
│   └─ sri-kamal-vedha-township.html
├─ assets/
│   ├─ css/styles.css               # Design system + all components
│   ├─ js/data.js                   # Single source of truth for property data + WhatsApp helpers
│   ├─ js/main.js                   # Header, mobile nav, reveal, cards, search, form
│   └─ images/                      # Logo, favicon, property placeholders, OG image
├─ robots.txt
├─ sitemap.xml
└─ README.md
```

## Property data

All four projects live in `assets/js/data.js`. To update any property (name, location, plot sizes, tags, description), edit that file — the homepage and properties listing render from it automatically. Individual detail pages are hand-written so you can style each one uniquely; keep their copy in sync with `data.js` when you change details.

Nothing is invented: only fields exposed on the existing site are used. Where information was ambiguous (e.g. Kashyapi Township's "18' × 15'" reference, or Omkareswar's starting price), the site keeps a small transparent note in the detail panel rather than silently correcting.

## WhatsApp

- Number: **+91 78944 71666** → `https://wa.me/917894471666`
- Every property card, detail page, header, footer and floating button links to WhatsApp with a pre-filled, property-specific message.
- The contact form on `contact.html` builds a message from the user's inputs and opens WhatsApp with it pre-filled — no backend required.

To change the number, edit `assets/js/data.js` (`window.LLD.contact.whatsappNumber`) **and** update the hard-coded `wa.me/...` links in the HTML files if you want to keep them consistent for JS-disabled environments.

## Property images

The real project photos from the existing site are bundled at:

```
assets/images/photos/kashyapi-township.png         (1536 × 1024)
assets/images/photos/srin-vedha-ventures.png       (1536 × 1024)
assets/images/photos/omkareswar-venture.png        (1600 × 879)
assets/images/photos/sri-kamal-vedha-township.jpeg (960  × 1280, portrait)
```

They're referenced from `assets/js/data.js` (property listings + homepage) and hard-coded on each `properties/*.html` detail page.

Every `<img>` also has an `onerror` fallback to the matching stylised SVG at `assets/images/<slug>.svg`, so the site never shows a broken image if a photo is missing.

### Replacing a photo

1. Drop the new JPG/PNG at `assets/images/photos/<slug>.<ext>`.
2. If the extension or dimensions change, update the `image`, `imageWidth`, `imageHeight` fields for that property in `assets/js/data.js`.
3. On the matching `properties/<slug>.html`, update the `src`, `width`, `height` on the `.detail-hero__media` `<img>` (and its `onerror` fallback if needed).

Recommended photo dimensions: **1600 × 1067 px** (3:2 landscape), JPG at ~80% quality. Under 500 KB is ideal for fast mobile load.

### Portrait vs landscape

Sri Kamal Vedha Township's original photo is portrait (960 × 1280). The detail page renders it inside a `detail-hero__media--portrait` container that switches to `object-fit: contain` on a brand-colour backdrop — so the full image is visible rather than centre-cropped. If you replace it with a landscape photo, remove the `--portrait` modifier class from that page's `.detail-hero__media`.

## Design system

- **Colors** (matched to the Legacy Land Developers logo):
  - Primary navy `#101f3d`
  - Gold accent `#c9a340`
  - Warm off-white background `#fbf9f5`
  - WhatsApp green `#25d366` for enquiry CTAs
- **Type:** Sora (headings, 600/700) + Inter (body, 400/500/600) — both Google Fonts.
- **Motion:** subtle `IntersectionObserver`-based fade-in, hover elevation on cards, image zoom on hover. Respects `prefers-reduced-motion`.
- **Responsive breakpoints:** property grid goes 4 → 2 → 1 column; detail hero stacks at ≤1024px; nav becomes a hamburger at ≤900px. Tested at 360/390/430/768/1024/1280+.

## Logo files

- `assets/images/logo.svg` — dark (navy) building mark. Used in the footer's white badge.
- `assets/images/logo-light.svg` — light (cream) building mark. Used in the header's navy badge.
- `assets/images/logo-full.svg` — full logo with the "LEGACY / LAND DEVELOPERS" wordmark. Ready to be used in the footer, OG image, or a larger brand strip.
- `assets/images/favicon.svg` — favicon.

Both mark SVGs are a clean recreation of your logo's stacked-tier building silhouette with gold accent stripes and swoosh. **To use your exact original PNG instead:** drop it at `assets/images/logo.png` (dark version) and `assets/images/logo-light.png` (a version tuned for dark backgrounds — invert or brighten as needed), then in each HTML file swap the two `<img src="…logo-light.svg">` and `<img src="…logo.svg">` references in the header/footer to point to the PNG files. The header badge is a fixed 44 × 44 px square, so a square-cropped icon-only version of your logo works best there.

## SEO

- Per-page `<title>`, description, canonical, Open Graph and Twitter card metadata.
- `Product` JSON-LD on each property detail page; `RealEstateAgent` JSON-LD on the homepage.
- `robots.txt` + `sitemap.xml` at the root.

## Deployment

This is a pure static site — deploy the contents of this folder to any host: cPanel, Netlify, Vercel, Cloudflare Pages, GitHub Pages, S3, etc. No build step is required.

If deploying to a WordPress-hosted domain (as the existing site is), place these files at the docroot and disable the WP theme, or move WP to a subpath.
