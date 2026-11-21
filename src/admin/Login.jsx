import { useState } from 'react'
import CroissantIcon from '../components/CroissantIcon.jsx'

// DEMO prihlasovacie údaje (sú viditeľné v kóde – len na ukážku).
const DEMO_USER = 'klara'
const DEMO_PASS = 'ranajky'

export default function Login({ onLogin }) {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (user.trim().toLowerCase() === DEMO_USER && pass === DEMO_PASS) onLogin()
    else setError('Nesprávne meno alebo heslo.')
  }

  return (
    <div className="login">
      <form className="login__card" onSubmit={submit}>
        <div className="login__logo">
          <CroissantIcon size={72} strokeWidth={1.4} />
          <span>Klára</span>
        </div>
        <h1>Prihlásenie pre majiteľku</h1>

        <div className="field">
          <label htmlFor="login-user">Používateľ</label>
          <input
            id="login-user"
            autoComplete="username"
            value={user}
            onChange={(e) => {
              setUser(e.target.value)
              setError('')
            }}
          />
        </div>
        <div className="field">
          <label htmlFor="login-pass">Heslo</label>
          <input
            id="login-pass"
            type="password"
            autoComplete="current-password"
            value={pass}
            onChange={(e) => {
              setPass(e.target.value)
              setError('')
            }}
          />
        </div>
        {error && (
          <p className="field__error" role="alert">
            {error}
          </p>
        )}
        <button type="submit" className="btn btn--brand">
          Prihlásiť sa
        </button>

        <p className="login__demo">
          Ukážka – prihlásenie: <code>{DEMO_USER}</code> / <code>{DEMO_PASS}</code>
        </p>
        <a className="login__back" href="#top">
          ← späť na web
        </a>
      </form>
    </div>
  )
}
