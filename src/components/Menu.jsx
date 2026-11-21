import { menu } from '../data/content.js'

export default function Menu() {
  return (
    <section id="menu" className="section section--brand">
      <div className="container">
        <h2 className="section__title section__title--center">Ponuka</h2>
        <p className="section__lead">Ponuka pečiva sa mení podľa dňa – aktuálne kúsky nájdete na Instagrame.</p>
        <div className="menu">
          {menu.map((group) => (
            <div key={group.category} className="menu__card">
              <h3 className="menu__category">{group.category}</h3>
              <ul className="menu__list">
                {group.items.map((item) => (
                  <li key={item.name} className="menu__item">
                    <span className="menu__name">{item.name}</span>
                    <span className="menu__dots" aria-hidden="true" />
                    <span className="menu__price">{item.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
