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
  image: string;
  imageAlt: string;
  items: MenuItem[];
};

export const menuCategories: MenuCategory[] = [
  {
    id: 'starters',
    title: 'Закуски',
    subtitle: 'Свежие травы, оливковое масло и начало вечера без спешки.',
    image: '/assets/photos/menu-starters.jpg',
    imageAlt: 'Итальянская закуска на темной тарелке',
    items: [
      { name: 'Брускетта с томатами и базиликом', description: 'Сладкие томаты, чеснок, хрустящий хлеб и масло первого отжима.', price: '590 ₽', details: { weight: '180 г', calories: '360 ккал', protein: '9 г', fat: '16 г', carbs: '42 г', allergens: 'глютен', composition: 'чиабатта, томаты, базилик, чеснок, оливковое масло', winePairing: 'Pinot Grigio Alto Adige', cookTime: '10 минут', tags: ['vegetarian'] } },
      { name: 'Вителло тоннато', description: 'Тонкая телятина, соус из тунца, каперсы и лимонная цедра.', price: '790 ₽', details: { weight: '170 г', calories: '410 ккал', protein: '31 г', fat: '27 г', carbs: '8 г', allergens: 'рыба, яйца', composition: 'телятина, тунец, каперсы, лимон, домашний майонез', winePairing: 'Gavi di Gavi', cookTime: '12 минут', tags: ['cold starter'] } },
      { name: 'Карпаччо из говядины', description: 'Пармезан, руккола, оливковое масло и крупная морская соль.', price: '890 ₽', details: { weight: '150 г', calories: '330 ккал', protein: '25 г', fat: '23 г', carbs: '5 г', allergens: 'молочные продукты', composition: 'говядина, пармезан, руккола, оливковое масло, морская соль', winePairing: 'Chianti Classico', cookTime: '9 минут', tags: ['raw'] } },
      { name: 'Буррата с печеными перцами', description: 'Теплый перец, базилик, бальзамик и сливочная буррата.', price: '940 ₽', details: { weight: '230 г', calories: '520 ккал', protein: '19 г', fat: '39 г', carbs: '21 г', allergens: 'молочные продукты', composition: 'буррата, печеный перец, базилик, бальзамик, оливковое масло', winePairing: 'Vermentino', cookTime: '14 минут', tags: ['vegetarian'] } },
    ],
  },
  {
    id: 'pasta',
    title: 'Паста',
    subtitle: 'Домашнее тесто, плотные соусы и классические римские сочетания.',
    image: '/assets/photos/menu-pasta.jpg',
    imageAlt: 'Паста с томатным соусом и пармезаном',
    items: [
      { name: 'Паста качо-э-пепе', description: 'Пекорино, черный перец и шелковистая эмульсия на горячей пасте.', price: '850 ₽', details: { weight: '270 г', calories: '620 ккал', protein: '23 г', fat: '25 г', carbs: '74 г', allergens: 'глютен, молочные продукты', composition: 'домашняя паста, пекорино, черный перец, сливочное масло', winePairing: 'Frascati Superiore', cookTime: '16 минут', tags: ['vegetarian'] } },
      { name: 'Тальятелле с рагу', description: 'Медленно томленая говядина, томаты, красное вино и пармезан.', price: '990 ₽', details: { weight: '300 г', calories: '710 ккал', protein: '34 г', fat: '28 г', carbs: '78 г', allergens: 'глютен, молочные продукты, сельдерей', composition: 'тальятелле, говяжье рагу, томаты, красное вино, пармезан', winePairing: 'Chianti Classico', cookTime: '18 минут', tags: ['chef choice'] } },
      { name: 'Ризотто с грибами', description: 'Арборио, белые грибы, шалфей, сливочное масло и выдержанный сыр.', price: '920 ₽', details: { weight: '290 г', calories: '640 ккал', protein: '18 г', fat: '31 г', carbs: '70 г', allergens: 'молочные продукты', composition: 'рис арборио, белые грибы, шалфей, пармезан, сливочное масло', winePairing: 'Soave Classico', cookTime: '20 минут', tags: ['vegetarian'] } },
      { name: 'Спагетти с морепродуктами', description: 'Креветки, кальмар, белое вино, томаты и петрушка.', price: '1190 ₽', details: { weight: '310 г', calories: '690 ккал', protein: '36 г', fat: '20 г', carbs: '86 г', allergens: 'глютен, ракообразные, моллюски', composition: 'спагетти, креветки, кальмар, томаты, белое вино, петрушка', winePairing: 'Vermentino di Sardegna', cookTime: '17 минут', tags: ['seafood'] } },
    ],
  },
  {
    id: 'mains',
    title: 'Основные блюда',
    subtitle: 'Открытый огонь, травы и спокойная уверенность простых продуктов.',
    image: '/assets/photos/menu-mains.jpg',
    imageAlt: 'Стейк с овощами на темной поверхности',
    items: [
      { name: 'Стейк с розмарином', description: 'Говядина на гриле, печеный чеснок, томаты и соус из красного вина.', price: '1690 ₽', details: { weight: '340 г', calories: '780 ккал', protein: '52 г', fat: '51 г', carbs: '22 г', allergens: 'молочные продукты', composition: 'говядина, розмарин, печеный чеснок, томаты, винный соус', winePairing: 'Barolo', cookTime: '24 минуты', tags: ['grill'] } },
      { name: 'Сибас с травами', description: 'Целая рыба, лимон, тимьян и теплое оливковое масло.', price: '1490 ₽', details: { weight: '360 г', calories: '520 ккал', protein: '48 г', fat: '31 г', carbs: '9 г', allergens: 'рыба', composition: 'сибас, лимон, тимьян, петрушка, оливковое масло', winePairing: 'Pinot Grigio Alto Adige', cookTime: '22 минуты', tags: ['seafood'] } },
      { name: 'Цыпленок al limone', description: 'Хрустящая кожа, лимонный сок, шалфей и картофель с розмарином.', price: '1280 ₽', details: { weight: '380 г', calories: '690 ккал', protein: '44 г', fat: '38 г', carbs: '40 г', allergens: 'молочные продукты', composition: 'цыпленок, лимон, шалфей, картофель, розмарин', winePairing: 'Etna Bianco', cookTime: '26 минут', tags: ['grill'] } },
      { name: 'Оссобуко с полентой', description: 'Томленая телятина, шафрановая полента и гремолата.', price: '1580 ₽', details: { weight: '390 г', calories: '760 ккал', protein: '46 г', fat: '42 г', carbs: '48 г', allergens: 'молочные продукты, сельдерей', composition: 'телятина, полента, шафран, овощной софритто, гремолата', winePairing: 'Brunello di Montalcino', cookTime: '28 минут', tags: ['slow cooked'] } },
    ],
  },
  {
    id: 'desserts',
    title: 'Десерты',
    subtitle: 'Финал, который остается мягким, сливочным и немного праздничным.',
    image: '/assets/photos/menu-desserts.jpg',
    imageAlt: 'Итальянский десерт на светлой тарелке',
    items: [
      { name: 'Тирамису', description: 'Маскарпоне, савоярди, эспрессо и горькое какао.', price: '590 ₽', details: { weight: '160 г', calories: '480 ккал', protein: '9 г', fat: '31 г', carbs: '42 г', allergens: 'глютен, яйца, молочные продукты', composition: 'маскарпоне, савоярди, эспрессо, какао, марсала', winePairing: 'Vin Santo', cookTime: '5 минут', tags: ['classic'] } },
      { name: 'Панна-котта', description: 'Ванильные сливки, сезонные ягоды и тонкий ягодный соус.', price: '540 ₽', details: { weight: '150 г', calories: '390 ккал', protein: '6 г', fat: '29 г', carbs: '28 г', allergens: 'молочные продукты', composition: 'сливки, ваниль, ягоды, ягодный соус', winePairing: 'Moscato d’Asti', cookTime: '6 минут', tags: ['vegetarian'] } },
      { name: 'Канноли с фисташкой', description: 'Хрустящая трубочка, рикотта, цитрус и фисташковая крошка.', price: '620 ₽', details: { weight: '140 г', calories: '450 ккал', protein: '12 г', fat: '24 г', carbs: '48 г', allergens: 'глютен, молочные продукты, орехи', composition: 'канноли, рикотта, фисташка, апельсиновая цедра', winePairing: 'Passito di Pantelleria', cookTime: '7 минут', tags: ['nuts'] } },
      { name: 'Сорбет лимон-базилик', description: 'Чистый холодный вкус для легкого завершения ужина.', price: '430 ₽', details: { weight: '120 г', calories: '180 ккал', protein: '1 г', fat: '0 г', carbs: '43 г', allergens: 'нет', composition: 'лимон, базилик, сахарный сироп, цедра', winePairing: 'Prosecco Valdobbiadene', cookTime: '4 минуты', tags: ['vegan'] } },
    ],
  },
  {
    id: 'wine',
    title: 'Вино',
    subtitle: 'Италия по бокалам: от минеральных белых до плотных тосканских красных.',
    image: '/assets/photos/menu-wine.jpg',
    imageAlt: 'Бутылки вина в темном винном зале',
    items: [
      { name: 'Prosecco Valdobbiadene', description: 'Сухое, свежее, с яблоком и белыми цветами.', price: '690 ₽ / бокал', details: { weight: '150 мл', calories: '120 ккал', protein: '0 г', fat: '0 г', carbs: '4 г', allergens: 'сульфиты', composition: 'глера, регион Венето, сухой стиль', winePairing: 'брускетта, буррата, сорбет', cookTime: 'подача 3 минуты', tags: ['sparkling'] } },
      { name: 'Pinot Grigio Alto Adige', description: 'Минеральное белое к рыбе, пасте и легким закускам.', price: '720 ₽ / бокал', details: { weight: '150 мл', calories: '125 ккал', protein: '0 г', fat: '0 г', carbs: '3 г', allergens: 'сульфиты', composition: 'пино гриджо, Альто-Адидже, сухое белое', winePairing: 'сибас, морепродукты, вителло тоннато', cookTime: 'подача 3 минуты', tags: ['white'] } },
      { name: 'Chianti Classico', description: 'Вишня, кожа, травы и идеальная пара к мясу.', price: '860 ₽ / бокал', details: { weight: '150 мл', calories: '130 ккал', protein: '0 г', fat: '0 г', carbs: '4 г', allergens: 'сульфиты', composition: 'санджовезе, Тоскана, сухое красное', winePairing: 'тальятелле с рагу, карпаччо, стейк', cookTime: 'подача 4 минуты', tags: ['red'] } },
      { name: 'Barolo', description: 'Глубокое красное для долгого ужина и насыщенных блюд.', price: '1490 ₽ / бокал', details: { weight: '150 мл', calories: '135 ккал', protein: '0 г', fat: '0 г', carbs: '4 г', allergens: 'сульфиты', composition: 'неббиоло, Пьемонт, выдержанное красное', winePairing: 'стейк, оссобуко, зрелые сыры', cookTime: 'подача 5 минут', tags: ['red'] } },
    ],
  },
];

export const signatureDishes = [
  {
    name: 'Тальятелле с рагу',
    note: 'Медленно томим мясо в красном вине и подаем с домашней пастой.',
    price: '990 ₽',
    image: '/assets/photos/signature-tagliatelle.jpg',
    alt: 'Тарелка тальятелле с томатным соусом',
  },
  {
    name: 'Сибас с травами',
    note: 'Запекаем целиком, добавляем лимон, тимьян и мягкое оливковое масло.',
    price: '1490 ₽',
    image: '/assets/photos/signature-fish.jpg',
    alt: 'Рыбное блюдо с зеленью на темной тарелке',
  },
  {
    name: 'Панна-котта',
    note: 'Сливочная ваниль, сезонные ягоды и чистый, спокойный финал.',
    price: '540 ₽',
    image: '/assets/photos/signature-panna-cotta.jpg',
    alt: 'Панна-котта с ягодами',
  },
];

export const reservationTimeOptions = Array.from({ length: 24 }, (_, index) => {
  const totalMinutes = 12 * 60 + index * 30;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const value = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  return { label: value, value };
});

export const guestOptions = [
  { label: '1 гость', value: '1' },
  { label: '2 гостя', value: '2' },
  { label: '3 гостя', value: '3' },
  { label: '4 гостя', value: '4' },
  { label: '5-6 гостей', value: '5-6' },
  { label: '7+ гостей', value: '7+' },
];
