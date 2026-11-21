import { useState } from 'react'
import CroissantIcon from './CroissantIcon.jsx'
import { site } from '../data/content.js'

const links = [
  { href: '#o-nas', label: 'O nás' },
  { href: '#menu', label: 'Menu' },
  { href: '#ranajky', label: 'Raňajky' },
  { href: '#rezervacia', label: 'Rezervácia' },
  { href: '#kontakt', label: 'Kontakt' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="header">
      <div className="container header__inner">
        <a href="#top" className="logo" onClick={() => setOpen(false)}>
          <CroissantIcon size={40} />
          <span>{site.name}</span>
        </a>

        <button
          className="header__toggle"
          aria-expanded={open}
          aria-controls="hlavna-navigacia"
          aria-label={open ? 'Zavrieť menu' : 'Otvoriť menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav id="hlavna-navigacia" className={`nav ${open ? 'nav--open' : ''}`}>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
