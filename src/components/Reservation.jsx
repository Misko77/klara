import { useMemo, useState } from 'react'
import { reservation } from '../data/content.js'
import { allocateTables } from '../lib/tables.js'

// DEMO formulár: rezervácie sa držia len v pamäti prehliadača (po obnovení stránky zmiznú)
// a nikam sa neodosielajú.

const toISO = (d) => {
  const x = new Date(d)
  x.setMinutes(x.getMinutes() - x.getTimezoneOffset())
  return x.toISOString().slice(0, 10)
}

const formatDate = (iso) =>
  new Date(iso + 'T12:00:00').toLocaleDateString('sk-SK', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

// Najbližšie dni, na ktoré sa dá rezervovať (podľa reservation.weekdays), vrátane dneška.
function upcomingDates() {
  const out = []
  const d = new Date()
  d.setHours(12, 0, 0, 0)
  while (out.length < reservation.datesAhead) {
    if (reservation.weekdays.includes(d.getDay())) out.push(toISO(d))
    d.setDate(d.getDate() + 1)
  }
  return out
}

const emptyForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  date: '',
  time: '',
  guests: '2',
}

const { minGuests } = reservation
const maxGuests = Math.max(...reservation.slots.map((s) => s.capacity))

const dates = upcomingDates()

function validate(form) {
  const e = {}
  if (!form.firstName.trim()) e.firstName = 'Vyplňte meno.'
  if (!form.lastName.trim()) e.lastName = 'Vyplňte priezvisko.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = 'Zadajte platný e-mail.'
  if (!/^\+?[0-9 ]{9,15}$/.test(form.phone.trim())) e.phone = 'Zadajte platné telefónne číslo.'
  if (!form.date) e.date = 'Vyberte dátum.'
  if (!form.time) e.time = 'Vyberte čas raňajok.'
  return e
}

export default function Reservation() {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [bookings, setBookings] = useState([]) // { date, time, guests, tableIds }
  const [confirmed, setConfirmed] = useState(null)

  const guests = Number(form.guests)

  // Pre zvolený dátum: koľko miest a ktoré stoly zostávajú v každom čase.
  const availability = useMemo(() => {
    return reservation.slots.map((slot) => {
      const inSlot = bookings.filter((b) => b.date === form.date && b.time === slot.time)
      const booked = inSlot.reduce((s, b) => s + b.guests, 0)
      const usedIds = new Set(inSlot.flatMap((b) => b.tableIds))
      const freeTables = reservation.tables.filter((t) => !usedIds.has(t.id))
      const remaining = slot.capacity - booked
      const tables = guests <= remaining ? allocateTables(freeTables, guests) : null
      return { ...slot, remaining, tables }
    })
  }, [bookings, form.date, guests])

  const update = (field) => (e) => {
    const value = e.target.value
    setForm((f) => ({ ...f, [field]: value }))
    setErrors((er) => ({ ...er, [field]: undefined }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const errs = validate(form)
    const slot = availability.find((s) => s.time === form.time)
    if (form.time && slot && !slot.tables) errs.time = 'V tomto čase už nie je miesto pre zvolený počet osôb.'
    setErrors(errs)
    if (Object.keys(errs).length) return

    const booking = {
      ...form,
      guests,
      tableIds: slot.tables.map((t) => t.id),
      tables: slot.tables,
    }
    setBookings((b) => [...b, booking])
    setConfirmed(booking)
    setForm({ ...emptyForm, date: form.date })
  }

  const fieldProps = (name) => ({
    id: `res-${name}`,
    name,
    value: form[name],
    onChange: update(name),
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `res-${name}-err` : undefined,
  })

  const err = (name) =>
    errors[name] ? (
      <span id={`res-${name}-err`} className="field__error">
        {errors[name]}
      </span>
    ) : null

  return (
    <section id="rezervacia" className="section section--cream">
      <div className="container reservation">
        <div className="reservation__intro">
          <h2 className="section__title">{reservation.title}</h2>
          <p>
            Raňajky rezervujeme každú sobotu. Vyberte dátum, čas a počet osôb (od {minGuests} osôb) – stôl vám pripravíme.
          </p>
          <p className="reservation__demo">
            Ukážka formulára – rezervácia sa zatiaľ nikam neodosiela.
          </p>

          {confirmed && (
            <div className="reservation__done" role="status">
              <h3>Ďakujeme, {confirmed.firstName}!</h3>
              <p>
                Rezervácia na <strong>{formatDate(confirmed.date)}</strong> o{' '}
                <strong>{confirmed.time}</strong> pre <strong>{confirmed.guests}</strong>{' '}
                {confirmed.guests === 1 ? 'osobu' : confirmed.guests < 5 ? 'osoby' : 'osôb'}.
                <br />
                Stôl: {confirmed.tables.map((t) => `${t.id} (${t.seats} miesta)`).join(' + ')}
              </p>
              <p className="reservation__demo">Potvrdenie by sme poslali na {confirmed.email}.</p>
            </div>
          )}
        </div>

        <form className="reservation__form" onSubmit={onSubmit} noValidate>
          <div className="field">
            <label htmlFor="res-firstName">Meno</label>
            <input type="text" autoComplete="given-name" {...fieldProps('firstName')} />
            {err('firstName')}
          </div>
          <div className="field">
            <label htmlFor="res-lastName">Priezvisko</label>
            <input type="text" autoComplete="family-name" {...fieldProps('lastName')} />
            {err('lastName')}
          </div>
          <div className="field">
            <label htmlFor="res-email">E-mail</label>
            <input type="email" autoComplete="email" {...fieldProps('email')} />
            {err('email')}
          </div>
          <div className="field">
            <label htmlFor="res-phone">Telefón</label>
            <input type="tel" autoComplete="tel" placeholder="+421 9xx xxx xxx" {...fieldProps('phone')} />
            {err('phone')}
          </div>
          <div className="field">
            <label htmlFor="res-date">Dátum</label>
            <select {...fieldProps('date')}>
              <option value="">Vyberte sobotu</option>
              {dates.map((d) => (
                <option key={d} value={d}>
                  {formatDate(d)}
                </option>
              ))}
            </select>
            {err('date')}
          </div>
          <div className="field">
            <label htmlFor="res-guests">Počet osôb</label>
            <select {...fieldProps('guests')}>
              {Array.from({ length: maxGuests - minGuests + 1 }, (_, i) => i + minGuests).map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          <fieldset className="field field--full slots" aria-describedby={errors.time ? 'res-time-err' : undefined}>
            <legend>Čas raňajok</legend>
            <div className="slots__grid">
              {availability.map((s) => {
                const disabled = !s.tables
                return (
                  <label key={s.time} className={`slot ${disabled ? 'slot--disabled' : ''}`}>
                    <input
                      type="radio"
                      name="time"
                      value={s.time}
                      checked={form.time === s.time}
                      onChange={update('time')}
                      disabled={disabled}
                    />
                    <span className="slot__time">{s.time}</span>
                    <span className="slot__info">
                      {disabled ? 'obsadené' : `voľné ${s.remaining} ${s.remaining >= 2 && s.remaining <= 4 ? 'miesta' : s.remaining === 1 ? 'miesto' : 'miest'}`}
                    </span>
                  </label>
                )
              })}
            </div>
            {err('time')}
          </fieldset>

          <button type="submit" className="btn btn--brand field--full">
            Rezervovať
          </button>
        </form>
      </div>
    </section>
  )
}
