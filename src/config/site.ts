export const siteConfig = {
  name: 'PICCOLINO',
  shortName: 'PICCOLINO',
  description: 'PICCOLINO — ресторан современной итальянской кухни',
  locale: 'ru',
  ogLocale: 'ru_RU',
  url: 'https://piccolino.example.com',
  year: new Date().getFullYear(),

  contacts: {
    email: 'hello@piccolino.ru',
    phone: '+7 900 123-45-67',
    address: 'Москва, ул. Поварская, 12',
    hours: 'Ежедневно 12:00-00:00',
    telegram: '#',
    whatsapp: '#',
    instagram: '#',
    vk: '#',
  },

  nav: [
    { label: 'О ресторане', href: '/#about' },
    { label: 'Меню', href: '/menu' },
    { label: 'Атмосфера', href: '/#atmosphere' },
    { label: 'События', href: '/#events' },
    { label: 'Контакты', href: '/#contacts' },
  ],

  cta: {
    label: 'Забронировать',
    href: '/#reservation',
  },

  footer: {
    tagline: 'Современная итальянская кухня, камерный зал и вечерний свет для долгих разговоров.',
    ctaText: 'Забронируйте стол — мы подготовим спокойное место и бокал к первому блюду.',
    privacyHref: '/privacy',
  },

  seo: {
    ogImage: '/og-image.jpg',
  },
};
