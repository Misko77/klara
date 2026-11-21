import { breakfast } from '../data/content.js'
import { formatDate } from '../lib/bookings.js'

export default function Breakfast() {
  const { items } = breakfast

  return (
    <section id="ranajky" className="section section--light">
      <div className="container breakfast">
        <p className="breakfast__eyebrow">
          {formatDate(breakfast.date)} · od {breakfast.from}
        </p>
        <h2 className="section__title section__title--center">{breakfast.title}</h2>
        <p className="breakfast__intro">
          {breakfast.intro} Pripravujeme v spolupráci s{' '}
          <a href={breakfast.collab.url} target="_blank" rel="noreferrer">
            {breakfast.collab.name}
          </a>
          .
        </p>

        {items.length > 0 ? (
          <ol className="breakfast__list">
            {items.map((item, i) => (
              <li key={item.name} className="breakfast__item">
                <span className="breakfast__num">{i + 1}</span>
                <div>
                  <div className="breakfast__head">
                    <h3>{item.name}</h3>
                    {item.price && <span className="breakfast__price">{item.price}</span>}
                  </div>
                  {item.description && <p>{item.description}</p>}
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <p className="breakfast__soon">
            Menu z piatich jedál nájdete v našom{' '}
            <a href={breakfast.post} target="_blank" rel="noreferrer">
              príspevku na Instagrame
            </a>
            .
          </p>
        )}

        <p className="breakfast__meta">
          📍 {breakfast.place}
          <br />
          <a href="#rezervacia" className="btn btn--brand breakfast__cta">
            Rezervovať miesto
          </a>
        </p>
      </div>
    </section>
  )
}
