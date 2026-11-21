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

// Rezervácia raňajok (DEMO – zatiaľ sa nikam neodosiela).
export const reservation = {
  title: 'Rezervácia raňajok',
  // Dni, kedy sa dá rezervovať (0 = nedeľa … 6 = sobota) a koľko termínov dopredu ponúknuť.
  weekdays: [6],
  datesAhead: 1, // len najbližšia sobota
  minGuests: 2, // minimálny počet osôb na rezerváciu
  // Začiatky raňajok; každý čas má vlastnú kapacitu osôb. TODO: potvrdiť časy.
  slots: [
    { time: '7:00', capacity: 8 },
    { time: '7:30', capacity: 8 },
    { time: '8:00', capacity: 8 },
    { time: '9:00', capacity: 8 },
    { time: '9:30', capacity: 8 },
    { time: '10:00', capacity: 8 },
  ],
  // Stoly v kaviarni (počet miest pri stole).
  tables: [
    { id: 'A1', seats: 4 },
    { id: 'A2', seats: 4 },
    { id: 'A3', seats: 4 },
    { id: 'B1', seats: 3 },
    { id: 'C1', seats: 2 },
    { id: 'C2', seats: 2 },
    { id: 'C3', seats: 2 },
    { id: 'C4', seats: 2 },
  ],
}

// Spoločné sobotné raňajky (podľa IG príspevku https://www.instagram.com/p/Df7vvUFCpr8/).
export const breakfast = {
  title: 'Spoločné sobotné raňajky',
  date: '2026-11-21',
  from: '7:00',
  place: 'Kláry Jarunkovej 2, Banská Bystrica',
  collab: { name: '@_tinapecie', url: 'https://www.instagram.com/_tinapecie/' },
  intro:
    'Tentokrát sme sa nevedeli rozhodnúť, a tak je menu nie zo štyroch, ale rovno z piatich jedál. Obľúbené jedlá dostali nové príchute a pribudli aj úplne nové.',
  post: 'https://www.instagram.com/p/Df7vvUFCpr8/',
  // TODO: doplniť 5 jedál z obrázkov v príspevku – { name, description, price }
  items: [],
}
