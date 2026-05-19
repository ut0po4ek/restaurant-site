# Image Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace all local raster `<img>` tags in restaurant-site with Astro's `<Image />` component, moving files from `public/` to `src/assets/` for build-time WebP optimization.

**Architecture:** Move JPG photos and PNG decor from `public/assets/` to `src/assets/` so Astro can import and optimize them. Update data types from `string` to `ImageMetadata`. Update all affected components to use `<Image />`. Only delete old `public/` files after all imports and usages are verified — rollback-safe order.

**Tech Stack:** Astro 6, `astro:assets` Image component, TypeScript, `ImageMetadata` type from `astro`

---

## File Map

**Modified data files:**
- `src/data/menu.ts` — `MenuCategory.image: string` → `ImageMetadata`; `signatureDishes[].image: string` → `ImageMetadata`; imports for all 8 photos

**Modified components:**
- `src/components/sections/HeroRestaurant.astro` — 2 photos + 1 PNG decor
- `src/components/sections/AboutRestaurant.astro` — 3 photos
- `src/components/sections/SaltStorySection.astro` — 3 photos
- `src/components/sections/AtmosphereEvents.astro` — 1 photo + 2 PNG decor
- `src/components/sections/InteriorSection.astro` — 3 photos + 1 PNG decor
- `src/components/sections/MenuSection.astro` — `image: ImageMetadata` (from data); SVG decor stays as `<img>`
- `src/components/sections/MenuPreview.astro` — 2 PNG decor; SVG stays
- `src/components/sections/SignatureDishes.astro` — `image: ImageMetadata` (from data) + 1 PNG decor
- `src/components/sections/KitchenSection.astro` — 14 PNG decor (internal array)
- `src/components/sections/ReservationSection.astro` — 1 PNG decor
- `src/pages/menu.astro` — 1 photo + 1 PNG decor

**Files moved (not modified in-place):**
- `public/assets/photos/*.jpg` (16 files) → `src/assets/photos/`
- `public/assets/decor/realistic/*.png` (14 files) → `src/assets/decor/realistic/`

**Files NOT touched:**
- `public/assets/decor/rosemary.svg`
- `public/assets/decor/cutlery.svg`

---

## Task 1: Copy photos to src/assets (do not delete yet)

**Files:**
- Create: `src/assets/photos/` (directory + 16 JPG files copied)

- [ ] **Step 1: Create directory and copy all photos**

```bash
mkdir -p "src/assets/photos"
cp public/assets/photos/*.jpg src/assets/photos/
```

Expected: `ls src/assets/photos/` shows all 16 JPG files.

- [ ] **Step 2: Verify copy**

```bash
ls src/assets/photos/
```

Expected output (16 files):
```
about-chef-pasta.jpg    menu-desserts.jpg       menu-wine.jpg           signature-tagliatelle.jpg
about-dining-room.jpg   menu-hero-ingredients.jpg  salt-dessert.jpg     wine-evening.jpg
about-table.jpg         menu-hero-pasta.jpg     salt-salad.jpg
home-hero-restaurant.jpg  menu-mains.jpg         salt-steak.jpg
menu-hero-ingredients.jpg menu-pasta.jpg         signature-fish.jpg
signature-panna-cotta.jpg menu-starters.jpg
```

- [ ] **Step 3: Commit**

```bash
git add src/assets/photos/
git commit -m "chore: copy photos to src/assets for Astro Image optimization"
```

---

## Task 2: Copy PNG decor to src/assets (do not delete yet)

**Files:**
- Create: `src/assets/decor/realistic/` (directory + 14 PNG files copied)

- [ ] **Step 1: Create directory and copy all PNG decor**

```bash
mkdir -p "src/assets/decor/realistic"
cp public/assets/decor/realistic/*.png src/assets/decor/realistic/
```

- [ ] **Step 2: Verify copy**

```bash
ls src/assets/decor/realistic/
```

Expected output (14 files):
```
avocado-half.png        eggplant.png            lettuce-leaves.png      red-pepper-slices.png   spice-spoons.png
basil-leaves.png        fork.png                pizza-board.png         rosemary.png            tomatoes-vine.png
champignon-mushrooms.png  gorgonzola-cheese.png  potato-peeled.png      spice-mounds.png
chicken-breast.png      green-peas.png          spice-mounds.png
```

- [ ] **Step 3: Commit**

```bash
git add src/assets/decor/
git commit -m "chore: copy PNG decor to src/assets for Astro Image optimization"
```

---

## Task 3: Update menu.ts — change image types to ImageMetadata

**Files:**
- Modify: `src/data/menu.ts`

- [ ] **Step 1: Replace the top of menu.ts with imports and updated types**

Replace the beginning of `src/data/menu.ts` (everything up to and including the `MenuCategory` type) with:

```typescript
import type { ImageMetadata } from 'astro';

import menuStartersImg from '../assets/photos/menu-starters.jpg';
import menuPastaImg from '../assets/photos/menu-pasta.jpg';
import menuMainsImg from '../assets/photos/menu-mains.jpg';
import menuDessertsImg from '../assets/photos/menu-desserts.jpg';
import menuWineImg from '../assets/photos/menu-wine.jpg';
import signatureTagliatelle from '../assets/photos/signature-tagliatelle.jpg';
import signatureFish from '../assets/photos/signature-fish.jpg';
import signaturePannaCotta from '../assets/photos/signature-panna-cotta.jpg';

export type MenuItem = {
  name: string;
  description: string;
  price: string;
  details?: {
    weight: string;
    calories: string;
    protein: string;
    fat: string;
    carbs: string;
    allergens: string;
    composition: string;
    winePairing: string;
    cookTime: string;
    tags?: string[];
  };
};

export type MenuCategory = {
  id: string;
  title: string;
  subtitle: string;
  image: ImageMetadata;
  imageAlt: string;
  items: MenuItem[];
};
```

- [ ] **Step 2: Replace string paths in menuCategories with imported values**

In `menuCategories`, replace:
- `image: '/assets/photos/menu-starters.jpg'` → `image: menuStartersImg`
- `image: '/assets/photos/menu-pasta.jpg'` → `image: menuPastaImg`
- `image: '/assets/photos/menu-mains.jpg'` → `image: menuMainsImg`
- `image: '/assets/photos/menu-desserts.jpg'` → `image: menuDessertsImg`
- `image: '/assets/photos/menu-wine.jpg'` → `image: menuWineImg`

- [ ] **Step 3: Update signatureDishes — add explicit type and replace string paths**

Replace the `signatureDishes` export:

```typescript
export const signatureDishes: { name: string; note: string; price: string; image: ImageMetadata; alt: string }[] = [
  {
    name: 'Тальятелле с рагу',
    note: 'Медленно томим мясо в красном вине и подаем с домашней пастой.',
    price: '990 ₽',
    image: signatureTagliatelle,
    alt: 'Тарелка тальятелле с томатным соусом',
  },
  {
    name: 'Сибас с травами',
    note: 'Запекаем целиком, добавляем лимон, тимьян и мягкое оливковое масло.',
    price: '1490 ₽',
    image: signatureFish,
    alt: 'Рыбное блюдо с зеленью на темной тарелке',
  },
  {
    name: 'Панна-котта',
    note: 'Сливочная ваниль, сезонные ягоды и чистый, спокойный финал.',
    price: '540 ₽',
    image: signaturePannaCotta,
    alt: 'Панна-котта с ягодами',
  },
];
```

- [ ] **Step 4: Run type check**

```bash
npm run check
```

Expected: no errors related to `menu.ts`. (Components that still use the old `src` string on `image` will error — that's expected and fixed in later tasks.)

- [ ] **Step 5: Commit**

```bash
git add src/data/menu.ts
git commit -m "feat: migrate menu.ts image fields from string to ImageMetadata"
```

---

## Task 4: Update HeroRestaurant.astro

**Files:**
- Modify: `src/components/sections/HeroRestaurant.astro`

- [ ] **Step 1: Add imports at top of frontmatter**

Replace the frontmatter block:

```astro
---
import { Image } from 'astro:assets';
import Button from '../ui/Button.astro';
import heroImg from '../../assets/photos/home-hero-restaurant.jpg';
import wineImg from '../../assets/photos/menu-wine.jpg';
import tomatoDecor from '../../assets/decor/realistic/tomatoes-vine.png';
---
```

- [ ] **Step 2: Replace hero background img**

Replace:
```html
<img
  src="/assets/photos/home-hero-restaurant.jpg"
  alt="Теплый зал итальянского ресторана с сервированными столами"
  loading="eager"
  fetchpriority="high"
/>
```

With:
```astro
<Image
  src={heroImg}
  alt="Теплый зал итальянского ресторана с сервированными столами"
  loading="eager"
  fetchpriority="high"
/>
```

- [ ] **Step 3: Replace tomato decor img**

Replace:
```html
<img
  class="hero-tomato-decor"
  src="/assets/decor/realistic/tomatoes-vine.png"
  alt=""
  aria-hidden="true"
  loading="eager"
  data-parallax
  data-parallax-speed="0.04"
  data-parallax-rotate="-2.5"
/>
```

With:
```astro
<Image
  class="hero-tomato-decor"
  src={tomatoDecor}
  alt=""
  aria-hidden="true"
  loading="eager"
  data-parallax
  data-parallax-speed="0.04"
  data-parallax-rotate="-2.5"
/>
```

- [ ] **Step 4: Replace editorial card img**

Replace:
```html
<img
  src="/assets/photos/menu-wine.jpg"
  alt="Бокалы красного вина за ресторанным столом"
  loading="eager"
/>
```

With:
```astro
<Image
  src={wineImg}
  alt="Бокалы красного вина за ресторанным столом"
  loading="eager"
/>
```

- [ ] **Step 5: Run check**

```bash
npm run check
```

Expected: no errors in HeroRestaurant.astro.

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/HeroRestaurant.astro
git commit -m "feat: migrate HeroRestaurant to Astro Image component"
```

---

## Task 5: Update AboutRestaurant.astro

**Files:**
- Modify: `src/components/sections/AboutRestaurant.astro`

- [ ] **Step 1: Add imports**

Add to frontmatter:
```astro
---
import { Image } from 'astro:assets';
import diningRoomImg from '../../assets/photos/about-dining-room.jpg';
import tableImg from '../../assets/photos/about-table.jpg';
import chefPastaImg from '../../assets/photos/about-chef-pasta.jpg';
---
```

- [ ] **Step 2: Replace all three img tags**

Replace:
```html
<img src="/assets/photos/about-dining-room.jpg" alt="Камерный зал ресторана с мягким вечерним светом" />
```
With:
```astro
<Image src={diningRoomImg} alt="Камерный зал ресторана с мягким вечерним светом" />
```

Replace:
```html
<img src="/assets/photos/about-table.jpg" alt="Сервированный стол в итальянском ресторане" />
```
With:
```astro
<Image src={tableImg} alt="Сервированный стол в итальянском ресторане" />
```

Replace:
```html
<img src="/assets/photos/about-chef-pasta.jpg" alt="Шеф готовит пасту на кухне" />
```
With:
```astro
<Image src={chefPastaImg} alt="Шеф готовит пасту на кухне" />
```

- [ ] **Step 3: Run check and commit**

```bash
npm run check
git add src/components/sections/AboutRestaurant.astro
git commit -m "feat: migrate AboutRestaurant to Astro Image component"
```

---

## Task 6: Update SaltStorySection.astro

**Files:**
- Modify: `src/components/sections/SaltStorySection.astro`

- [ ] **Step 1: Add imports**

Add to frontmatter:
```astro
---
import { Image } from 'astro:assets';
import saladImg from '../../assets/photos/salt-salad.jpg';
import steakImg from '../../assets/photos/salt-steak.jpg';
import dessertImg from '../../assets/photos/salt-dessert.jpg';
---
```

- [ ] **Step 2: Replace three plate img tags**

Replace:
```html
<img class="plate plate-one" data-scroll-rotate="14" src="/assets/photos/salt-salad.jpg" alt="Салат на круглой тарелке" loading="lazy" />
```
With:
```astro
<Image class="plate plate-one" data-scroll-rotate="14" src={saladImg} alt="Салат на круглой тарелке" loading="lazy" />
```

Replace:
```html
<img class="plate plate-two" data-scroll-rotate="16" data-scroll-direction="reverse" src="/assets/photos/salt-steak.jpg" alt="Стейк с овощами на тарелке" loading="lazy" />
```
With:
```astro
<Image class="plate plate-two" data-scroll-rotate="16" data-scroll-direction="reverse" src={steakImg} alt="Стейк с овощами на тарелке" loading="lazy" />
```

Replace:
```html
<img class="plate plate-three" data-scroll-rotate="12" src="/assets/photos/salt-dessert.jpg" alt="Десерт с ягодами на тарелке" loading="lazy" />
```
With:
```astro
<Image class="plate plate-three" data-scroll-rotate="12" src={dessertImg} alt="Десерт с ягодами на тарелке" loading="lazy" />
```

- [ ] **Step 3: Run check and commit**

```bash
npm run check
git add src/components/sections/SaltStorySection.astro
git commit -m "feat: migrate SaltStorySection to Astro Image component"
```

---

## Task 7: Update AtmosphereEvents.astro

**Files:**
- Modify: `src/components/sections/AtmosphereEvents.astro`

- [ ] **Step 1: Add imports**

Add to frontmatter:
```astro
---
import { Image } from 'astro:assets';
import wineEveningImg from '../../assets/photos/wine-evening.jpg';
import basilDecor from '../../assets/decor/realistic/basil-leaves.png';
import mushroomDecor from '../../assets/decor/realistic/champignon-mushrooms.png';
---
```

- [ ] **Step 2: Replace wine evening photo**

Replace:
```html
<img src="/assets/photos/wine-evening.jpg" alt="Бутылки вина и камерная атмосфера винного вечера" loading="lazy" />
```
With:
```astro
<Image src={wineEveningImg} alt="Бутылки вина и камерная атмосфера винного вечера" loading="lazy" />
```

- [ ] **Step 3: Replace basil decor**

Replace:
```html
<img class="event-photo-decor event-decor-basil" src="/assets/decor/realistic/basil-leaves.png" alt="" aria-hidden="true" loading="lazy" data-parallax data-parallax-speed="0.04" data-parallax-rotate="2" />
```
With:
```astro
<Image class="event-photo-decor event-decor-basil" src={basilDecor} alt="" aria-hidden="true" loading="lazy" data-parallax data-parallax-speed="0.04" data-parallax-rotate="2" />
```

- [ ] **Step 4: Replace mushroom decor**

Replace:
```html
<img class="event-photo-decor event-decor-mushroom" src="/assets/decor/realistic/champignon-mushrooms.png" alt="" aria-hidden="true" loading="lazy" data-parallax data-parallax-speed="0.025" data-parallax-rotate="-1.5" />
```
With:
```astro
<Image class="event-photo-decor event-decor-mushroom" src={mushroomDecor} alt="" aria-hidden="true" loading="lazy" data-parallax data-parallax-speed="0.025" data-parallax-rotate="-1.5" />
```

- [ ] **Step 5: Run check and commit**

```bash
npm run check
git add src/components/sections/AtmosphereEvents.astro
git commit -m "feat: migrate AtmosphereEvents to Astro Image component"
```

---

## Task 8: Update InteriorSection.astro

**Files:**
- Modify: `src/components/sections/InteriorSection.astro`

- [ ] **Step 1: Read the current file**

```bash
cat src/components/sections/InteriorSection.astro | head -50
```

Note the exact class names and attributes on each `<img>` tag before editing.

- [ ] **Step 2: Add imports**

Add to frontmatter:
```astro
---
import { Image } from 'astro:assets';
import pizzaBoardDecor from '../../assets/decor/realistic/pizza-board.png';
import diningRoomImg from '../../assets/photos/about-dining-room.jpg';
import tableImg from '../../assets/photos/about-table.jpg';
import wineEveningImg from '../../assets/photos/wine-evening.jpg';
---
```

- [ ] **Step 3: Replace pizza-board PNG decor**

Replace:
```html
src="/assets/decor/realistic/pizza-board.png"
```
With:
```astro
src={pizzaBoardDecor}
```
(keep all other attributes: class, alt, aria-hidden, loading, data-parallax-* exactly as they are)

- [ ] **Step 4: Replace three photo img tags**

Replace each `src="/assets/photos/about-dining-room.jpg"` → `src={diningRoomImg}`
Replace each `src="/assets/photos/about-table.jpg"` → `src={tableImg}`
Replace each `src="/assets/photos/wine-evening.jpg"` → `src={wineEveningImg}`

Change the tag name from `<img` to `<Image` for each.

- [ ] **Step 5: Run check and commit**

```bash
npm run check
git add src/components/sections/InteriorSection.astro
git commit -m "feat: migrate InteriorSection to Astro Image component"
```

---

## Task 9: Update MenuSection.astro — use ImageMetadata from data

**Files:**
- Modify: `src/components/sections/MenuSection.astro`

- [ ] **Step 1: Add Image import to frontmatter**

The component already imports from `menu.ts`. Add `Image` import:

```astro
---
import { Image } from 'astro:assets';
import { menuCategories } from '../../data/menu';
---
```

(Keep any other existing imports.)

- [ ] **Step 2: Replace img that uses category.image**

Find:
```html
<img src={category.image} alt={category.imageAlt} loading="lazy" />
```
Replace with:
```astro
<Image src={category.image} alt={category.imageAlt} loading="lazy" />
```

- [ ] **Step 3: Leave SVG decor tags unchanged**

These two lines use SVG from `public/` — do NOT change them:
```html
<img class="category-decor category-decor-herb" src="/assets/decor/rosemary.svg" ... />
<img class="category-decor category-decor-photo" src={categoryDecorSrc} ... />
```

Note: `categoryDecorSrc` is a string from a different data field — confirm it does not point to a moved PNG. If it does, it must be updated similarly to above.

- [ ] **Step 4: Run check and commit**

```bash
npm run check
git add src/components/sections/MenuSection.astro
git commit -m "feat: migrate MenuSection to Astro Image component"
```

---

## Task 10: Update MenuPreview.astro

**Files:**
- Modify: `src/components/sections/MenuPreview.astro`

- [ ] **Step 1: Add imports**

Add to frontmatter:
```astro
---
import { Image } from 'astro:assets';
import basilDecor from '../../assets/decor/realistic/basil-leaves.png';
import spiceDecor from '../../assets/decor/realistic/spice-spoons.png';
---
```

- [ ] **Step 2: Replace two PNG decor tags**

Replace:
```html
<img class="menu-preview-decor decor-real-herb" src="/assets/decor/realistic/basil-leaves.png" alt="" aria-hidden="true" loading="lazy" />
```
With:
```astro
<Image class="menu-preview-decor decor-real-herb" src={basilDecor} alt="" aria-hidden="true" loading="lazy" />
```

Replace:
```html
<img class="menu-preview-decor decor-real-spice" src="/assets/decor/realistic/spice-spoons.png" alt="" aria-hidden="true" loading="lazy" />
```
With:
```astro
<Image class="menu-preview-decor decor-real-spice" src={spiceDecor} alt="" aria-hidden="true" loading="lazy" />
```

- [ ] **Step 3: Leave SVG rosemary unchanged**

```html
<img class="menu-head-herb" src="/assets/decor/rosemary.svg" ... />
```
This stays as-is.

- [ ] **Step 4: Run check and commit**

```bash
npm run check
git add src/components/sections/MenuPreview.astro
git commit -m "feat: migrate MenuPreview PNG decor to Astro Image component"
```

---

## Task 11: Update SignatureDishes.astro — use ImageMetadata from data

**Files:**
- Modify: `src/components/sections/SignatureDishes.astro`

- [ ] **Step 1: Add imports**

Replace frontmatter:
```astro
---
import { Image } from 'astro:assets';
import { signatureDishes } from '../../data/menu';
import tomatoDecor from '../../assets/decor/realistic/tomatoes-vine.png';
---
```

- [ ] **Step 2: Replace tomato decor img**

Replace:
```html
<img
  class="signature-tomato-decor"
  src="/assets/decor/realistic/tomatoes-vine.png"
  alt=""
  aria-hidden="true"
  loading="lazy"
  data-parallax
  data-parallax-speed="0.028"
  data-parallax-rotate="-1.8"
/>
```
With:
```astro
<Image
  class="signature-tomato-decor"
  src={tomatoDecor}
  alt=""
  aria-hidden="true"
  loading="lazy"
  data-parallax
  data-parallax-speed="0.028"
  data-parallax-rotate="-1.8"
/>
```

- [ ] **Step 3: Replace dish plate img in map**

Replace:
```html
<img class="dish-plate" src={dish.image} alt={dish.alt} loading="lazy" />
```
With:
```astro
<Image class="dish-plate" src={dish.image} alt={dish.alt} loading="lazy" />
```

- [ ] **Step 4: Leave rosemary SVG unchanged**

```html
<img class="dish-decor decor-rosemary" src="/assets/decor/rosemary.svg" ... />
```
This stays as-is.

- [ ] **Step 5: Run check and commit**

```bash
npm run check
git add src/components/sections/SignatureDishes.astro
git commit -m "feat: migrate SignatureDishes to Astro Image component"
```

---

## Task 12: Update KitchenSection.astro — 14 PNG decor items

**Files:**
- Modify: `src/components/sections/KitchenSection.astro`

- [ ] **Step 1: Add imports at top of frontmatter**

```astro
---
import { Image } from 'astro:assets';
import type { ImageMetadata } from 'astro';
import rosemaryPng from '../../assets/decor/realistic/rosemary.png';
import tomatoesVine from '../../assets/decor/realistic/tomatoes-vine.png';
import avocadoHalf from '../../assets/decor/realistic/avocado-half.png';
import lettuceLeaves from '../../assets/decor/realistic/lettuce-leaves.png';
import basilLeaves from '../../assets/decor/realistic/basil-leaves.png';
import gorgonzolaCheese from '../../assets/decor/realistic/gorgonzola-cheese.png';
import champignonMushrooms from '../../assets/decor/realistic/champignon-mushrooms.png';
import eggplant from '../../assets/decor/realistic/eggplant.png';
import chickenBreast from '../../assets/decor/realistic/chicken-breast.png';
import potatoPeeled from '../../assets/decor/realistic/potato-peeled.png';
import spiceMounds from '../../assets/decor/realistic/spice-mounds.png';
import greenPeas from '../../assets/decor/realistic/green-peas.png';
import redPepperSlices from '../../assets/decor/realistic/red-pepper-slices.png';
import spiceSpoons from '../../assets/decor/realistic/spice-spoons.png';
---
```

- [ ] **Step 2: Replace the layers array**

Replace the entire `layers` array (lines 4–121 in the current file) with:

```typescript
const layers: {
  id: string;
  label: string;
  src: ImageMetadata;
  fromRotate: string;
  fromScale: string;
  toRotate: string;
  exitRotate: string;
  exitScale: string;
  width: string;
}[] = [
  /* ── Group 0 ── */
  {
    id: 'rosemary',
    label: 'Розмарин и тимьян',
    src: rosemaryPng,
    fromRotate: '52deg',  fromScale: '0.38', toRotate: '-10deg',
    exitRotate: '-38deg', exitScale:  '0.30',
    width: 'clamp(7rem, 10.5vw, 15.5rem)',
  },
  {
    id: 'tomatoes',
    label: 'Сладкие томаты',
    src: tomatoesVine,
    fromRotate: '-44deg', fromScale: '0.34', toRotate: '9deg',
    exitRotate: '32deg',  exitScale:  '0.28',
    width: 'clamp(9rem, 13.5vw, 20rem)',
  },
  {
    id: 'avocado',
    label: 'Спелый авокадо',
    src: avocadoHalf,
    fromRotate: '-48deg', fromScale: '0.36', toRotate: '14deg',
    exitRotate: '40deg',  exitScale:  '0.32',
    width: 'clamp(7rem, 10.5vw, 15.5rem)',
  },
  {
    id: 'lettuce',
    label: 'Листья салата',
    src: lettuceLeaves,
    fromRotate: '42deg',  fromScale: '0.34', toRotate: '-12deg',
    exitRotate: '-30deg', exitScale:  '0.30',
    width: 'clamp(9rem, 13.5vw, 20rem)',
  },
  /* ── Group 1 ── */
  {
    id: 'basil',
    label: 'Свежий базилик',
    src: basilLeaves,
    fromRotate: '-50deg', fromScale: '0.36', toRotate: '18deg',
    exitRotate: '36deg',  exitScale:  '0.32',
    width: 'clamp(8rem, 12vw, 18rem)',
  },
  {
    id: 'cheese',
    label: 'Выдержанный сыр',
    src: gorgonzolaCheese,
    fromRotate: '46deg',  fromScale: '0.34', toRotate: '-16deg',
    exitRotate: '-34deg', exitScale:  '0.28',
    width: 'clamp(8.5rem, 12.5vw, 19rem)',
  },
  {
    id: 'mushrooms',
    label: 'Шампиньоны',
    src: champignonMushrooms,
    fromRotate: '-54deg', fromScale: '0.32', toRotate: '12deg',
    exitRotate: '44deg',  exitScale:  '0.30',
    width: 'clamp(9rem, 13.5vw, 20rem)',
  },
  {
    id: 'eggplant',
    label: 'Молодой баклажан',
    src: eggplant,
    fromRotate: '50deg',  fromScale: '0.36', toRotate: '-8deg',
    exitRotate: '-38deg', exitScale:  '0.32',
    width: 'clamp(7.5rem, 11vw, 16.5rem)',
  },
  /* ── Group 2 ── */
  {
    id: 'chicken',
    label: 'Куриное филе',
    src: chickenBreast,
    fromRotate: '-46deg', fromScale: '0.34', toRotate: '10deg',
    exitRotate: '34deg',  exitScale:  '0.28',
    width: 'clamp(9.5rem, 14.5vw, 21rem)',
  },
  {
    id: 'potato',
    label: 'Молодой картофель',
    src: potatoPeeled,
    fromRotate: '56deg',  fromScale: '0.32', toRotate: '-18deg',
    exitRotate: '-42deg', exitScale:  '0.30',
    width: 'clamp(7rem, 10.5vw, 15.5rem)',
  },
  {
    id: 'spice-mounds',
    label: 'Пряные специи',
    src: spiceMounds,
    fromRotate: '-42deg', fromScale: '0.36', toRotate: '8deg',
    exitRotate: '36deg',  exitScale:  '0.32',
    width: 'clamp(9rem, 13.5vw, 20rem)',
  },
  {
    id: 'peas',
    label: 'Зелёный горошек',
    src: greenPeas,
    fromRotate: '48deg',  fromScale: '0.34', toRotate: '-14deg',
    exitRotate: '-36deg', exitScale:  '0.28',
    width: 'clamp(8.5rem, 12.5vw, 19rem)',
  },
  /* ── Group 3 ── */
  {
    id: 'pepper',
    label: 'Острый перец',
    src: redPepperSlices,
    fromRotate: '58deg',  fromScale: '0.30', toRotate: '-22deg',
    exitRotate: '-44deg', exitScale:  '0.30',
    width: 'clamp(5.5rem, 8.5vw, 12rem)',
  },
  {
    id: 'spice',
    label: 'Соль и специи',
    src: spiceSpoons,
    fromRotate: '-52deg', fromScale: '0.32', toRotate: '22deg',
    exitRotate: '40deg',  exitScale:  '0.32',
    width: 'clamp(7rem, 10.5vw, 15rem)',
  },
];
```

- [ ] **Step 3: Replace img in the map render**

Find:
```html
<img src={layer.src} alt="" aria-hidden="true" loading="lazy" />
```
Replace with:
```astro
<Image src={layer.src} alt="" aria-hidden="true" loading="lazy" style={`width: var(--layer-width)`} />
```

Note: The CSS rule `.kitchen-layer img { width: var(--layer-width); }` targets the `<img>` tag. After switching to `<Image />`, Astro wraps it — verify in Task 15 that the width still works visually. If it does not, add `style="width: var(--layer-width)"` as shown above.

- [ ] **Step 4: Run check and commit**

```bash
npm run check
git add src/components/sections/KitchenSection.astro
git commit -m "feat: migrate KitchenSection 14 PNG decor to Astro Image component"
```

---

## Task 13: Update ReservationSection.astro

**Files:**
- Modify: `src/components/sections/ReservationSection.astro`

- [ ] **Step 1: Add imports**

Add to frontmatter:
```astro
---
import { Image } from 'astro:assets';
import forkDecor from '../../assets/decor/realistic/fork.png';
---
```

(Keep any existing imports.)

- [ ] **Step 2: Replace fork PNG decor**

Replace:
```html
<img class="reservation-photo-decor" src="/assets/decor/realistic/fork.png" alt="" aria-hidden="true" loading="lazy" />
```
With:
```astro
<Image class="reservation-photo-decor" src={forkDecor} alt="" aria-hidden="true" loading="lazy" />
```

- [ ] **Step 3: Run check and commit**

```bash
npm run check
git add src/components/sections/ReservationSection.astro
git commit -m "feat: migrate ReservationSection PNG decor to Astro Image component"
```

---

## Task 14: Update menu.astro page

**Files:**
- Modify: `src/pages/menu.astro`

- [ ] **Step 1: Add imports**

Add to frontmatter:
```astro
---
import { Image } from 'astro:assets';
import menuHeroImg from '../assets/photos/menu-hero-ingredients.jpg';
import spiceDecor from '../assets/decor/realistic/spice-spoons.png';
---
```

(Keep existing imports.)

- [ ] **Step 2: Replace menu hero photo**

Replace:
```html
<img src="/assets/photos/menu-hero-ingredients.jpg" alt="Итальянские ингредиенты для меню ресторана PICCOLINO" />
```
With:
```astro
<Image src={menuHeroImg} alt="Итальянские ингредиенты для меню ресторана PICCOLINO" />
```

- [ ] **Step 3: Replace spice PNG decor**

Replace:
```html
<img class="menu-object menu-object-real menu-object-spice" src="/assets/decor/realistic/spice-spoons.png" alt="" aria-hidden="true" loading="eager" data-parallax data-parallax-speed="0.035" data-parallax-rotate="-2" />
```
With:
```astro
<Image class="menu-object menu-object-real menu-object-spice" src={spiceDecor} alt="" aria-hidden="true" loading="eager" data-parallax data-parallax-speed="0.035" data-parallax-rotate="-2" />
```

- [ ] **Step 4: Leave SVG cutlery and rosemary unchanged**

```html
<img class="menu-object menu-object-cutlery" src="/assets/decor/cutlery.svg" ... />
<img class="menu-copy-herb" src="/assets/decor/rosemary.svg" ... />
```
These stay as-is.

- [ ] **Step 5: Run check and commit**

```bash
npm run check
git add src/pages/menu.astro
git commit -m "feat: migrate menu page to Astro Image component"
```

---

## Task 15: Verify — run full check and build

- [ ] **Step 1: Run type check**

```bash
npm run check
```

Expected: 0 errors.

- [ ] **Step 2: Run build**

```bash
npm run build
```

Expected: build completes with no errors. Note the output — Astro should report optimized images in `dist/_astro/`.

- [ ] **Step 3: Verify no stale paths remain**

```bash
grep -r "/assets/photos\|/assets/decor/realistic" src/ public/
```

Expected: no output (zero matches). Only SVG paths under `public/assets/decor/` may remain — those are correct.

If any matches remain, fix the component before proceeding.

---

## Task 16: Delete old files from public/ (rollback-safe last step)

Only run this task after Task 15 passes completely — build succeeds and grep shows no stale paths.

**Files:**
- Delete: `public/assets/photos/` (entire directory)
- Delete: `public/assets/decor/realistic/` (entire directory)

- [ ] **Step 1: Delete moved photo directory**

```bash
rm -rf public/assets/photos/
```

- [ ] **Step 2: Delete moved PNG decor directory**

```bash
rm -rf public/assets/decor/realistic/
```

- [ ] **Step 3: Verify SVG decor is still present**

```bash
ls public/assets/decor/
```

Expected:
```
cutlery.svg   rosemary.svg
```

- [ ] **Step 4: Run build again to confirm nothing broke**

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 5: Run grep again**

```bash
grep -r "/assets/photos\|/assets/decor/realistic" src/ public/
```

Expected: no output.

- [ ] **Step 6: Commit deletion**

```bash
git add -u public/assets/photos/ public/assets/decor/realistic/
git commit -m "chore: remove photos and PNG decor from public/ after migration to src/assets"
```

---

## Task 17: Push to git and write completion report

- [ ] **Step 1: Push**

```bash
git push
```

- [ ] **Step 2: Write completion report**

Provide a report with:
1. List of files moved (photos + PNG decor)
2. List of components updated to `<Image />`
3. List of data files changed
4. SVG files confirmed left in `public/assets/decor/`
5. `npm run check` result
6. `npm run build` result
7. grep result confirming no stale paths
