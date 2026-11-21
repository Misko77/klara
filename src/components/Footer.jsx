import CroissantIcon from './CroissantIcon.jsx'
import { site } from '../data/content.js'

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="logo logo--small">
          <CroissantIcon size={32} />
          <span>{site.name}</span>
        </div>
        <p>
          © {year} {site.name} · {site.tagline} ·{' '}
          <a href={site.instagram} target="_blank" rel="noreferrer">
            Instagram
          </a>
          {' · '}
          <a href="#/admin">Pre personál</a>
        </p>
      </div>
    </footer>
  )
}
