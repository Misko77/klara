import { reservation } from '../data/content.js'
import { allocateTables } from './tables.js'

// ===== Dátumy =====

export const toISO = (d) => {
  const x = new Date(d)
  x.setMinutes(x.getMinutes() - x.getTimezoneOffset())
  return x.toISOString().slice(0, 10)
}

export const formatDate = (iso, opts = { weekday: 'long', day: 'numeric', month: 'long' }) =>
  new Date(iso + 'T12:00:00').toLocaleDateString('sk-SK', opts)

// Najbližšie dni, na ktoré sa dá rezervovať (podľa reservation.weekdays), vrátane dneška.
export function upcomingDates(count = reservation.datesAhead) {
  const out = []
  const d = new Date()
  d.setHours(12, 0, 0, 0)
  while (out.length < count) {
    if (reservation.weekdays.includes(d.getDay())) out.push(toISO(d))
    d.setDate(d.getDate() + 1)
  }
  return out
}

// ===== Obsadenosť =====

// Pre daný dátum a počet hostí: zostávajúce miesta a navrhnuté stoly v každom čase.
export function slotAvailability(bookings, date, guests) {
  return reservation.slots.map((slot) => {
    const inSlot = bookings.filter((b) => b.date === date && b.time === slot.time)
    const booked = inSlot.reduce((s, b) => s + b.guests, 0)
    const usedIds = new Set(inSlot.flatMap((b) => b.tableIds))
    const freeTables = reservation.tables.filter((t) => !usedIds.has(t.id))
    const remaining = slot.capacity - booked
    const tables = guests <= remaining ? allocateTables(freeTables, guests) : null
    return { ...slot, booked, remaining, usedIds, tables }
  })
}

// ===== DEMO úložisko =====
// Rezervácie z formulára sa ukladajú len do localStorage tohto prehliadača.
// TODO: nahradiť skutočným backendom.

const STORAGE_KEY = 'klara-demo-bookings'

export function loadLocalBookings() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  } catch {
    return []
  }
}

export function saveLocalBooking(booking) {
  const all = [...loadLocalBookings(), booking]
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
  } catch {
    // úložisko nedostupné (súkromné okno) – rezervácia ostane len v pamäti
  }
  return all
}

export function clearLocalBookings() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore
  }
}

// ===== DEMO dáta pre administráciu =====

const PEOPLE = {
  f: { first: ['Jana', 'Lucia', 'Zuzana', 'Katarína', 'Eva', 'Veronika', 'Simona'], last: ['Nováková', 'Kováčová', 'Tóthová', 'Šimková', 'Lukáčová', 'Vargová'] },
  m: { first: ['Peter', 'Martin', 'Tomáš', 'Michal', 'Juraj', 'Marek', 'Ondrej'], last: ['Horváth', 'Baláž', 'Molnár', 'Hudec', 'Kráľ', 'Bartoš'] },
}

// Deterministický generátor, aby boli ukážkové dáta pri každom načítaní rovnaké.
function rng(seedStr) {
  let a = [...seedStr].reduce((h, c) => Math.imul(h ^ c.charCodeAt(0), 2654435761), 1779033703)
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function generateDemoBookings(dates) {
  const out = []
  dates.forEach((date, di) => {
    const rand = rng(date)
    // bližšie soboty sú plnšie
    const fill = Math.max(0.15, 0.95 - di * 0.12)
    reservation.slots.forEach((slot) => {
      let tries = 0
      while (tries++ < 6 && rand() < fill) {
        const guests = reservation.minGuests + Math.floor(rand() * 3)
        const [av] = slotAvailability(out, date, guests).filter((s) => s.time === slot.time)
        if (!av.tables) break
        const p = PEOPLE[rand() < 0.6 ? 'f' : 'm']
        const first = p.first[Math.floor(rand() * p.first.length)]
        const last = p.last[Math.floor(rand() * p.last.length)]
        out.push({
          id: `demo-${date}-${slot.time}-${tries}`,
          date,
          time: slot.time,
          guests,
          firstName: first,
          lastName: last,
          email: `${first}.${last}`.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase() + '@example.com',
          phone: `+421 9${Math.floor(10 + rand() * 89)} ${Math.floor(100 + rand() * 899)} ${Math.floor(100 + rand() * 899)}`,
          tableIds: av.tables.map((t) => t.id),
          demo: true,
        })
      }
    })
  })
  return out
}
