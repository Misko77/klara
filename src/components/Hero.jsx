import CroissantIcon from './CroissantIcon.jsx'
import { site } from '../data/content.js'

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="container hero__inner">
        <CroissantIcon size={180} strokeWidth={1.2} className="hero__icon" />
        <p className="hero__eyebrow">
          {site.name} · {site.tagline}
        </p>
        <h1 className="hero__title">{site.heroTitle}</h1>
        <p className="hero__text">{site.heroText}</p>
        <div className="hero__actions">
          <a href="#menu" className="btn btn--light">
            Pozrieť menu
          </a>
          <a href="#kontakt" className="btn btn--outline">
            Kde nás nájdete
          </a>
        </div>
      </div>
    </section>
  )
}
