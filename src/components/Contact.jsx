import { contact, site } from '../data/content.js'

export default function Contact() {
  const mapSrc = `https://maps.google.com/maps?q=${contact.lat},${contact.lng}&z=17&output=embed`

  return (
    <section id="kontakt" className="section section--light">
      <div className="container contact">
        <div className="contact__info">
          <h2 className="section__title">{contact.title}</h2>

          <div className="contact__block">
            <h3>Adresa</h3>
            <address>
              <strong>{contact.name}</strong>
              {contact.address.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
            <p>
              <a href={contact.mapsUrl} target="_blank" rel="noreferrer">
                Navigovať v Google Maps
              </a>
            </p>
          </div>

          <div className="contact__block">
            <h3>Otváracie hodiny</h3>
            {contact.hours.length > 0 ? (
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
            ) : (
              <p>
                Aktuálne otváracie hodiny nájdete na{' '}
                <a href={contact.mapsUrl} target="_blank" rel="noreferrer">
                  Google Maps
                </a>{' '}
                a{' '}
                <a href={site.instagram} target="_blank" rel="noreferrer">
                  Instagrame
                </a>
                .
              </p>
            )}
          </div>

          <div className="contact__block">
            <h3>Kontaktujte nás</h3>
            <p>
              {contact.phone && (
                <>
                  <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a>
                  <br />
                </>
              )}
              {contact.email && (
                <>
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                  <br />
                </>
              )}
              <a href={site.instagram} target="_blank" rel="noreferrer">
                {site.instagramHandle}
              </a>
            </p>
          </div>
        </div>

        <div className="contact__map">
          <iframe
            title={`Mapa – ${contact.name}`}
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  )
}
