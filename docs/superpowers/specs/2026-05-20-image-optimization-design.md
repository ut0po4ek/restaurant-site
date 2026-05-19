# Image Optimization — restaurant-site

**Date:** 2026-05-20
**Scope:** restaurant-site only. Other projects (astro-business-starter, flovers-site, form-light-site) — separate task after this one is verified.

---

## Goal

Replace all raw `<img>` tags pointing to local raster images with Astro's `<Image />` component so that images are automatically converted to WebP and optimized at build time.

---

## What changes

### 1. Move files

| From | To |
|------|-----|
| `public/assets/photos/*.jpg` | `src/assets/photos/*.jpg` |
| `public/assets/decor/realistic/*.png` | `src/assets/decor/realistic/*.png` |

SVG files (`public/assets/decor/*.svg`, `public/assets/decor/cutlery.svg`, `public/assets/decor/rosemary.svg`) stay in `public/` — SVG does not benefit from WebP conversion.

### 2. Components to update

Every component that references a moved file gets:
- `import { Image } from 'astro:assets'` at the top
- A named import for each image: `import heroImg from '../assets/photos/home-hero-restaurant.jpg'`
- `<img src="/assets/photos/...">` → `<Image src={heroImg} alt="..." />`
- `loading="eager"` preserved on hero images; `loading="lazy"` on all others
- No explicit `format="webp"` — Astro decides

Components affected:
- `src/components/sections/HeroRestaurant.astro`
- `src/components/sections/AboutRestaurant.astro`
- `src/components/sections/SaltStorySection.astro`
- `src/components/sections/AtmosphereEvents.astro`
- `src/components/sections/InteriorSection.astro`
- `src/components/sections/MenuSection.astro` (category photos only; SVG decor stays as `<img>`)
- `src/components/sections/MenuPreview.astro` (PNG decor: basil-leaves, spice-spoons → Image; SVG rosemary stays as `<img>`)
- `src/components/sections/SignatureDishes.astro`
- `src/components/sections/KitchenSection.astro` — 14 PNG items in internal `layers` array with `src: string`; change to `src: ImageMetadata`, import all 14 PNGs at top of file, replace `<img src={layer.src}>` with `<Image src={layer.src} alt="" aria-hidden="true" loading="lazy" />`; CSS `width: var(--layer-width)` style attribute must remain
- `src/components/sections/ReservationSection.astro` (PNG decor)
- `src/pages/menu.astro` (menu hero photo)

### 3. Data files to update

`src/data/menu.ts` — wherever `image` is a local `/assets/photos/` string:
- Change type from `string` to `ImageMetadata`
- Import images at the top of the file
- Replace string paths with imported values

### 4. What does NOT change

- SVG `<img>` tags pointing to `public/assets/decor/*.svg` — stay as plain `<img>`
- External URLs (if any) — not touched
- Alt texts — preserved exactly as-is
- `aria-hidden`, `data-parallax`, `data-parallax-speed`, `data-parallax-rotate`, `data-scroll-rotate`, `data-scroll-direction` attributes — preserved exactly as-is

---

## Verification checklist

After implementation:

1. `npm run check` — no TypeScript errors
2. `npm run build` — build succeeds
3. `grep -r "/assets/photos\|/assets/decor/realistic" src/ public/` — no remaining references to moved files; only SVG paths may remain under `public/assets/decor/`
4. Old files confirmed deleted from `public/assets/photos/` and `public/assets/decor/realistic/`
5. Pages to visually verify: `/` and `/menu`
6. Sections to verify: hero, about, salt story, atmosphere/events, interior, kitchen, menu preview, signature dishes, reservation, menu page hero

---

## Completion report

After finishing, provide:
- List of files moved
- List of components updated
- List of data files changed
- SVG files left in public (confirmed)
- `npm run check` result
- `npm run build` result
- grep result confirming no stale paths

---

## Out of scope

- astro-business-starter, flovers-site, form-light-site — separate task
- Netlify adapter / Image CDN — not needed for static build
- Adding new images or changing alt texts
- Changing any visual design or layout
