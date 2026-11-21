// Všetok obsah webu na jednom mieste.
// Adresa a poloha sú z Google Maps. TODO: otváracie hodiny, skutočné menu a ceny.

export const site = {
  name: 'Klára',
  tagline: 'kaviareň & pekáreň',
  heroTitle: 'Čerstvé pečivo a poctivá káva',
  heroText: 'Maslové croissanty, koláčiky a poctivá káva v štýlovom priestore s terasou v Banskej Bystrici.',
  instagram: 'https://www.instagram.com/klara_bystrica/',
  instagramHandle: '@klara_bystrica',
}

export const about = {
  title: 'O nás',
  // TODO: skutočný príbeh
  paragraphs: [
    'KLÁRA je kaviareň s pekárňou, kde sa štýlový priestor stretáva s vôňou čerstvého pečiva a výbornou kávou.',
    'Pečieme poctivé croissanty a koláčiky z kvalitných surovín. K nim pripravujeme kávu, matchu aj čaj – a keď je pekne, posedíte si na terase. Radi u nás privítame aj rodiny s deťmi.',
  ],
}

// TODO: skutočné položky a ceny
export const menu = [
  {
    category: 'Káva & nápoje',
    items: [
      { name: 'Espresso', price: '2,20 €' },
      { name: 'Cappuccino', price: '3,20 €' },
      { name: 'Flat white', price: '3,50 €' },
      { name: 'Caffè latte', price: '3,50 €' },
      { name: 'Matcha latte', price: '3,90 €' },
      { name: 'Čaj', price: '2,80 €' },
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
  name: 'KLÁRA kaviareň s pekárňou',
  address: ['Kláry Jarunkovej 14489/2', 'Banská Bystrica'],
  // Údaje z Google Maps (zatiaľ bez e-mailu). Prázdne pole sa na webe nezobrazí.
  phone: '+421 904 047 022',
  email: '',
  // TODO: doplniť otváracie hodiny – kým je pole prázdne, web odkazuje na Google Maps.
  hours: [],
  mapsUrl: 
    'https://www.google.com/maps/place/KL%C3%81RA+kaviare%C5%88+s+pek%C3%A1r%C5%88ou/@48.7383359,19.1297784,18z/data=!4m6!3m5!1s0x47153da65874ea19:0xe4ea48b16d9add50!8m2!3d48.7383359!4d19.1297784!16s%2Fg%2F11z0ph1dt3',
  // Súradnice prevádzky z Google Maps
  lat: 48.7383359,
  lng: 19.1297784,
}
