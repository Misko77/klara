import { useMemo, useState } from 'react'
import CroissantIcon from '../components/CroissantIcon.jsx'
import { reservation } from '../data/content.js'
import {
  clearLocalBookings,
  formatDate,
  generateDemoBookings,
  loadLocalBookings,
  slotAvailability,
  upcomingDates,
} from '../lib/bookings.js'

const dates = upcomingDates()
const demoBookings = generateDemoBookings(dates)
const totalCapacity = reservation.slots.reduce((s, x) => s + x.capacity, 0)
const timeOrder = Object.fromEntries(reservation.slots.map((s, i) => [s.time, i]))

const plural = (n, one, few, many) => (n === 1 ? one : n >= 2 && n <= 4 ? few : many)

export default function Dashboard({ onLogout }) {
  const [localBookings, setLocalBookings] = useState(loadLocalBookings)
  const [date, setDate] = useState(dates[0])

  const all = useMemo(() => [...demoBookings, ...localBookings], [localBookings])

  const perDate = useMemo(
    () =>
      Object.fromEntries(
        dates.map((d) => [d, all.filter((b) => b.date === d).reduce((s, b) => s + b.guests, 0)]),
      ),
    [all],
  )

  const dayBookings = useMemo(
    () =>
      all
        .filter((b) => b.date === date)
        .sort((a, b) => timeOrder[a.time] - timeOrder[b.time] || a.lastName.localeCompare(b.lastName, 'sk')),
    [all, date],
  )

  const slots = useMemo(() => {
    const list = slotAvailability(all, date, 1)
    return list.map((s, i) => ({
      ...s,
      cumulative: list.slice(0, i + 1).reduce((acc, x) => acc + x.booked, 0),
    }))
  }, [all, date])

  const guests = dayBookings.reduce((s, b) => s + b.guests, 0)
  const occupancy = Math.round((guests / totalCapacity) * 100)
  const busiest = slots.reduce((m, s) => (s.booked > (m?.booked ?? 0) ? s : m), null)

  // Kto sedí pri ktorom stole v ktorom čase
  const tableMap = useMemo(() => {
    const map = {}
    for (const b of dayBookings) for (const id of b.tableIds) map[`${id}|${b.time}`] = b
    return map
  }, [dayBookings])

  return (
    <>
      <header className="adm-header">
        <div className="adm-container adm-header__inner">
          <a href="#top" className="logo">
            <CroissantIcon size={36} />
            <span>Klára</span>
          </a>
          <span className="adm-header__title">Rezervácie raňajok</span>
          <div className="adm-header__actions">
            <button className="adm-btn adm-btn--ghost" onClick={() => window.print()}>
              Vytlačiť
            </button>
            <button className="adm-btn adm-btn--ghost" onClick={onLogout}>
              Odhlásiť
            </button>
          </div>
        </div>
      </header>

      <main className="adm-container adm-main">
        <p className="adm-demo">
          Ukážka s vymyslenými dátami. Rezervácie z formulára na webe sa ukladajú len v tomto prehliadači.
          {localBookings.length > 0 && (
            <>
              {' '}
              <button
                className="adm-link"
                onClick={() => {
                  clearLocalBookings()
                  setLocalBookings([])
                }}
              >
                Vymazať moje testovacie rezervácie ({localBookings.length})
              </button>
            </>
          )}
        </p>

        <nav className="adm-dates" aria-label="Výber soboty">
          {dates.map((d) => (
            <button
              key={d}
              className={`adm-date ${d === date ? 'adm-date--active' : ''}`}
              aria-pressed={d === date}
              onClick={() => setDate(d)}
            >
              <span className="adm-date__day">{formatDate(d, { day: 'numeric', month: 'numeric' })}</span>
              <span className="adm-date__count">{perDate[d]} os.</span>
            </button>
          ))}
        </nav>

        <h1 className="adm-title">{formatDate(date, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</h1>

        <section className="adm-stats">
          <div className="adm-stat">
            <span className="adm-stat__value">{guests}</span>
            <span className="adm-stat__label">porcií raňajok</span>
          </div>
          <div className="adm-stat">
            <span className="adm-stat__value">{dayBookings.length}</span>
            <span className="adm-stat__label">{plural(dayBookings.length, 'rezervácia', 'rezervácie', 'rezervácií')}</span>
          </div>
          <div className="adm-stat">
            <span className="adm-stat__value">{occupancy} %</span>
            <span className="adm-stat__label">
              obsadenosť ({guests}/{totalCapacity} miest)
            </span>
          </div>
          <div className="adm-stat">
            <span className="adm-stat__value">{busiest ? busiest.time : '–'}</span>
            <span className="adm-stat__label">najplnší čas</span>
          </div>
        </section>

        <div className="adm-grid">
          <section className="adm-card">
            <h2>Príprava porcií</h2>
            <table className="adm-table adm-portions">
              <thead>
                <tr>
                  <th>Čas</th>
                  <th>Porcie</th>
                  <th className="adm-portions__bar-col">Obsadenosť</th>
                  <th>Spolu</th>
                </tr>
              </thead>
              <tbody>
                {slots.map((s) => {
                  const pct = (s.booked / s.capacity) * 100
                  return (
                    <tr key={s.time}>
                      <th scope="row">{s.time}</th>
                      <td>
                        <strong>{s.booked}</strong> / {s.capacity}
                      </td>
                      <td className="adm-portions__bar-col">
                        <div className="adm-bar" role="img" aria-label={`${Math.round(pct)} % obsadené`}>
                          <div className={`adm-bar__fill ${pct >= 100 ? 'adm-bar__fill--full' : ''}`} style={{ width: `${pct}%` }} />
                        </div>
                      </td>
                      <td>{s.cumulative}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </section>

          <section className="adm-card">
            <h2>Obsadenosť stolov</h2>
            <div className="adm-scroll">
              <table className="adm-table adm-tables">
                <thead>
                  <tr>
                    <th>Stôl</th>
                    {reservation.slots.map((s) => (
                      <th key={s.time}>{s.time}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {reservation.tables.map((t) => (
                    <tr key={t.id}>
                      <th scope="row">
                        {t.id} <span className="adm-muted">({t.seats})</span>
                      </th>
                      {reservation.slots.map((s) => {
                        const b = tableMap[`${t.id}|${s.time}`]
                        return (
                          <td key={s.time} className={b ? 'adm-cell--taken' : 'adm-cell--free'} title={b ? `${b.firstName} ${b.lastName}, ${b.guests} os.` : 'voľný'}>
                            {b ? b.lastName : ''}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <section className="adm-card">
          <h2>Zoznam rezervácií</h2>
          {dayBookings.length === 0 ? (
            <p className="adm-muted">Na tento deň zatiaľ nie sú žiadne rezervácie.</p>
          ) : (
            <div className="adm-scroll">
              <table className="adm-table adm-list">
                <thead>
                  <tr>
                    <th>Čas</th>
                    <th>Meno</th>
                    <th>Osoby</th>
                    <th>Stôl</th>
                    <th>Telefón</th>
                    <th>E-mail</th>
                  </tr>
                </thead>
                <tbody>
                  {dayBookings.map((b) => (
                    <tr key={b.id}>
                      <td>{b.time}</td>
                      <td>
                        {b.firstName} {b.lastName}
                        {!b.demo && <span className="adm-badge">z webu</span>}
                      </td>
                      <td>{b.guests}</td>
                      <td>{b.tableIds.join(' + ')}</td>
                      <td>
                        <a href={`tel:${b.phone.replace(/\s/g, '')}`}>{b.phone}</a>
                      </td>
                      <td>
                        <a href={`mailto:${b.email}`}>{b.email}</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </>
  )
}
