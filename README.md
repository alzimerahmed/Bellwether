# Bellwether Creamery

Small-batch ice cream brand website built with Vite, Tailwind CSS v4, and vanilla JavaScript. Five pages, responsive across mobile, tablet, and desktop.

## Pages

| Page | File | Description |
|---|---|---|
| Home | `index.html` | Hero slider, product carousels, editorial sections, FAQ |
| Flavors | `flavors.html` | Full flavor catalog with category index nav |
| Locations | `locations.html` | Three scoop shops, hours, local delivery info |
| Our Story | `story.html` | Founder story, timeline, process, sourcing |
| Cart | `cart.html` | Shopping cart with checkout |

## Tech Stack

- **Vite 6** — dev server and build tool
- **Tailwind CSS v4** — utility-first styling via `@tailwindcss/vite`
- **Vanilla JS (ES modules)** — no framework, all logic in `src/`
- **Playwright** — E2E tests and visual regression QA

## Project Structure

```
├── index.html              # Homepage
├── flavors.html            # Flavors catalog
├── locations.html          # Scoop shop locations
├── story.html              # About / story page
├── cart.html               # Cart & checkout
├── vite.config.ts          # Vite config (multi-page build)
├── package.json
├── src/
│   ├── styles.css          # All styles (Tailwind + custom CSS)
│   ├── site-layout.js      # Shared header/footer chrome
│   ├── pages.js            # Page-level component init
│   ├── catalog.js          # Product data & card generators
│   ├── carousel.js         # Carousel with scroll-snap + drag
│   ├── hero-slider.js      # 3D hero slider with autoplay
│   ├── cart.js             # Cart state (localStorage)
│   ├── index-nav.js        # Scroll-spy category nav
│   ├── scroll-reveal.js    # IntersectionObserver reveal animations
│   └── image-manifest.js   # Generated image path mappings
├── public/                 # Static assets (favicon, manifest, etc.)
├── assets/                 # Product photography & imagery
├── scripts/                # QA and asset processing scripts
└── .devin/                 # AI agent configs (agents, workflows, skills)
```

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build all pages to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run test:e2e` | Run Playwright E2E tests |
| `npm run qa:once` | Run visual regression QA once |
| `npm run watch:qa` | Watch mode for QA |
| `npm run process-assets` | Process/optimise raw image assets |

## Responsive Design

The site uses a breakpoint system at `1024px` (desktop) and `768px` (tablet):

- **Desktop (≥1024px):** Full layout with carousels, 3D hero, all sections
- **Tablet (768–1023px):** Compact layout, carousels become grids, secondary sections hidden
- **Mobile (<768px):** Minimal layout, reduced grid items, compact cards

Secondary sections on mobile/tablet are hidden via the `mobile-hide` CSS class — desktop is never affected.

## Browser Support

Modern evergreen browsers (Chrome, Firefox, Safari, Edge). Uses CSS `aspect-ratio`, `scroll-snap`, `clamp()`, and CSS custom properties.
