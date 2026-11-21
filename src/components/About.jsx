import CroissantIcon from './CroissantIcon.jsx'
import { about } from '../data/content.js'

export default function About() {
  return (
    <section id="o-nas" className="section section--light">
      <div className="container about">
        <div className="about__text">
          <h2 className="section__title">{about.title}</h2>
          {about.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        {/* TODO: nahradiť skutočnou fotkou (napr. <img src="/foto.jpg" alt="..." />) */}
        <div className="about__photo" role="img" aria-label="Miesto pre fotku kaviarne">
          <CroissantIcon size={120} strokeWidth={0.9} />
          <span>fotka čoskoro</span>
        </div>
      </div>
    </section>
  )
}
