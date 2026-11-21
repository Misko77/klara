// Všetok obsah webu na jednom mieste.
// TODO: nahradiť placeholder údaje skutočnými (adresa, hodiny, ceny, texty).

export const site = {
  name: 'Klára',
  tagline: 'kaviareň & pekáreň',
  heroTitle: 'Čerstvé pečivo a poctivá káva',
  heroText: 'Každé ráno pečieme kasantíky, koláčiky a pečivo priamo v Banskej Bystrici.', // TODO
  instagram: 'https://www.instagram.com/klara_bystrica/',
  instagramHandle: '@klara_bystrica',
}

export const about = {
  title: 'O nás',
  // TODO: skutočný príbeh
  paragraphs: [
    'Klára je malá kaviareň a pekáreň, kde sa voňavé maslové pečivo stretáva s dobrou kávou.',
    'Pečieme v malých dávkach, z kvalitných surovín a bez skratiek. Každý deň trochu inak – čo práve vytiahneme z rúry, nájdete u nás na pulte aj na Instagrame.',
  ],
}

// TODO: skutočné položky a ceny
export const menu = [
  {
    category: 'Káva',
    items: [
      { name: 'Espresso', price: '2,20 €' },
      { name: 'Cappuccino', price: '3,20 €' },
      { name: 'Flat white', price: '3,50 €' },
      { name: 'Caffè latte', price: '3,50 €' },
      { name: 'Filtrovaná káva', price: '3,00 €' },
    ],
  },
  {
    category: 'Pečivo',
    items: [
      { name: 'Maslový croissant', price: '2,40 €' },
      { name: 'Pain au chocolat', price: '2,80 €' },
      { name: 'Škoricový slimák', price: '2,90 €' },
      { name: 'Kváskový chlieb', price: '5,50 €' },
    ],
  },
  {
    category: 'Kasantíky & koláčiky',
    items: [
      { name: 'Ovocný koláčik', price: '3,20 €' },
      { name: 'Orechový kasantík', price: '3,50 €' },
      { name: 'Cheesecake', price: '3,90 €' },
      { name: 'Koláčik dňa', price: 'podľa ponuky' },
    ],
  },
]

export const contact = {
  title: 'Kontakt',
  address: ['Ulica 1', '974 01 Banská Bystrica'], // TODO
  phone: '+421 900 000 000', // TODO
  email: 'ahoj@klara.sk', // TODO
  // TODO: otváracie hodiny
  hours: [
    { days: 'Pondelok – Piatok', time: '7:00 – 18:00' },
    { days: 'Sobota', time: '8:00 – 14:00' },
    { days: 'Nedeľa', time: 'zatvorené' },
  ],
  // Text pre Google Maps embed (adresa alebo názov podniku). TODO
  mapQuery: 'Banská Bystrica',
}
