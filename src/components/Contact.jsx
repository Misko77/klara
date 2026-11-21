import { contact, site } from '../data/content.js'

export default function Contact() {
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(contact.mapQuery)}&z=16&output=embed`

  return (
    <section id="kontakt" className="section section--light">
      <div className="container contact">
        <div className="contact__info">
          <h2 className="section__title">{contact.title}</h2>

          <div className="contact__block">
            <h3>Adresa</h3>
            <address>
              {contact.address.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
          </div>

          <div className="contact__block">
            <h3>Otváracie hodiny</h3>
            <table className="hours">
              <tbody>
                {contact.hours.map((h) => (
                  <tr key={h.days}>
                    <th scope="row">{h.days}</th>
                    <td>{h.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="contact__block">
            <h3>Napíšte nám</h3>
            <p>
              <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a>
              <br />
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <br />
              <a href={site.instagram} target="_blank" rel="noreferrer">
                {site.instagramHandle}
              </a>
            </p>
          </div>
        </div>

        <div className="contact__map">
          <iframe
            title="Mapa – Klára, Banská Bystrica"
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  )
}
