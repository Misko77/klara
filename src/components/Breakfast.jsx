import { breakfast } from '../data/content.js'
import { formatDate } from '../lib/bookings.js'

export default function Breakfast() {
  const groups = breakfast.groups.filter((g) => g.items.length > 0)

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

        {groups.length > 0 ? (
          <div className="breakfast__groups">
            {groups.map((group) => (
              <div key={group.title} className="breakfast__group">
                <h3 className="breakfast__group-title">{group.title}</h3>
                <ul className="breakfast__list">
                  {group.items.map((item) => (
                    <li key={item.name} className="breakfast__item">
                      <div className="breakfast__head">
                        <span className="breakfast__name">{item.name}</span>
                        {item.price && <span className="breakfast__price">{item.price}</span>}
                      </div>
                      {item.description && <p>{item.description}</p>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p className="breakfast__soon">
            Menu nájdete v našom{' '}
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
