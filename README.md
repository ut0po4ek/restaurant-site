# PICCOLINO Restaurant Site

Презентационный сайт ресторана современной итальянской кухни на базе `astro-business-starter`.

## Страницы

- `/` — главная: hero, о ресторане, фирменные блюда, темная salt-сцена, preview меню, события, бронирование.
- `/menu` — editorial menu page: закуски, паста, основные блюда, десерты, вино.

## Технологии

- Astro 6
- Astro View Transitions
- Tailwind CSS через Vite plugin
- Reusable UI components из starter
- `data-reveal` lifecycle из starter
- Light/dark/system theme switcher

## Команды

```bash
npm install
npm run check
npm run build
npm run dev
```

Важно: текущая версия Astro требует Node.js `>=22.12.0`.

## Дизайн-система

Сайт использует отдельную ресторанную palette:

- light: warm cream, ivory surface, deep petrol hero, muted tomato/wine accent;
- dark: near-black, deep charcoal, cream text, tomato accent, subtle cream borders.

Шрифты подключены в `BaseLayout.astro`:

- display/headings: `Cormorant Garamond`;
- body/UI: `Manrope`.

## Контент и данные

Данные меню находятся в `src/data/menu.ts`.

Контакты, навигация и SEO-метаданные находятся в `src/config/site.ts`.

## Анимации

- `data-reveal` для появления секций и stagger delays.
- Dish layered reveal: `.dish-shadow`, `.dish-plate`, `.dish-copy`, `.dish-decor`.
- Scroll rotation: элементы с `data-scroll-rotate`.
- Scroll text fill: `ScrollTextReveal.astro` и `data-scroll-text`.
- Salt texture reveal: `data-salt-progress` и CSS radial texture.
- Floating ingredients/decor через абсолютные элементы внутри dish cards.

## Git

Commit/push не делать без отдельного подтверждения.
